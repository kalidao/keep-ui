import { useRouter } from 'next/router'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Button } from '@kalidao/reality'
import { JSONContent } from '@tiptap/core'
import { ethers } from 'ethers'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useNonce } from '~/hooks/useNonce'
import { toOpString } from '~/utils/toOp'

import toast from '@design/Toast'

import { createPayload } from './createPayload'
import { getTxHash } from './getTxHash'
import { createSignal } from './signal/createSignal'
import { createSendNFT, multirelay } from './tx/handleTx'
import { sendTx } from './tx/sendTx'
import { useSendStore } from './tx/useSendStore'
import { createManageSignersPayload, createSendTokenPayload } from './tx/utils'
import { baseSchema, schemas } from './types'

export const SendProposal = () => {
  const tx = useSendStore((state) => state)
  const keep = useKeepStore((state) => state)
  const router = useRouter()
  const { data: nonce } = useNonce(keep.chainId ?? 1, keep.address ? keep.address : '0x')
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext()
  const { user } = useDynamicContext()

  let schema: any = baseSchema
  if (tx.action) {
    if (tx.action != 'none') {
      if (tx.action in schemas) {
        schema = baseSchema.merge(schemas[tx.action])
      }
    }
  }
  type Schema = z.infer<typeof schema>

  const handleTx = async (
    chainId: number,
    address: string,
    title: string,
    content: JSONContent,
    op: number,
    to: string,
    value: string,
    data: string,
  ) => {
    const digest = await getTxHash(chainId, address, op, to, value, data, nonce.toString())

    if (digest === 'error') {
      toast('error', 'Error creating transaction')
      return
    }

    const send = await sendTx(
      chainId,
      address,
      {
        op: toOpString(op),
        to: to,
        value: value,
        data: data,
        txHash: digest,
        title: title,
        content: content,
      },
      router,
    ).then(() => {
      tx.reset()
    })
  }

  const notSigner =
    keep?.signers?.find((s: string) => s === user?.blockchainAccounts?.[0]?.address?.toLowerCase()) == undefined
      ? true
      : false

  const submit = async (data: Schema) => {
    console.log('Submit function called with data:', data) // <-- added log
    if (!keep.address || !keep.chainId) {
      toast('error', 'No keep selected')
      return
    }

    if (!keep.threshold) {
      toast('error', 'No threshold set')
      return
    }

    const { action } = data

    if (action != 'none') {
      let payload = ethers.constants.HashZero
      let value = '0'
      let to = data.to
      switch (action) {
        case 'send_token':
          const calls = await createSendTokenPayload(keep.chainId, data.transfers)
          if (calls.length > 0) {
            if (calls.length === 1) {
              payload = calls[0].data
              value = calls[0].value
              to = calls[0].to
            } else {
              payload = multirelay(calls)
              to = keep.address
            }
          } else {
            toast('error', 'No transfers found')
            return
          }

          console.log('handleTx called for send_token action with:', {
            // <-- added log
            chainId: keep.chainId,
            address: keep.address,
            title: data.title,
            content: data.content,
            op: 0,
            to,
            value,
            data: payload,
          })
          await handleTx(keep.chainId, keep.address, data.title, data.content, 0, to, value, payload)
          break
        case 'manage_signers':
          const signers = data.signers.map((signer: { address: string; resolves?: string }) => {
            if (signer?.resolves) {
              return signer.resolves
            } else {
              return signer.address
            }
          })

          console.log('Creating payload for manage_signers action with signers:', signers) // <-- added log
          payload = createManageSignersPayload(
            keep.address,
            {
              signers: signers,
              threshold: data.threshold,
            },
            keep.signers,
            keep.threshold,
          )

          console.log('handleTx called for manage_signers action with:', {
            // <-- added log
            chainId: keep.chainId,
            address: keep.address,
            title: data.title,
            content: data.content,
            op: 0,
            to: keep.address,
            value: '0',
            data: payload,
          })
          await handleTx(keep.chainId, keep.address, data.title, data.content, 0, keep.address, '0', payload)
          break
        case 'send_nft': {
          payload = createSendNFT(keep.address, data.send_nfts)
          await handleTx(keep.chainId, keep.address, data.title, data.content, 0, keep.address, '0', payload)
        }
        case 'builder': {
          console.log({
            chainId: keep.chainId,
            address: keep.address,
            title: data.title,
            content: data.content,
            op: 0,
            to: data.to,
            value: tx.value,
            data: tx.data,
          })
          await handleTx(keep.chainId, keep.address, data.title, data.content, 0, data.to, tx.value, tx.data)
        }
        case 'mint_token': {
          console.log({
            chainId: keep.chainId,
            address: keep.address,
            title: data.title,
            content: data.content,
            op: 0,
            to: data.to,
            value: tx.value,
            data: tx.data,
            tokenId: tx.mint_token.id,
            amount: tx.mint_token.amount,
            addressForMinting: tx.mint_token.address,
          })
          const payload = createPayload('mint_token', tx.mint_token)
          console.info('[MINT TOKEN] PAYLOAD ->', payload)
          await handleTx(keep.chainId, keep.address, data.title, data.content, 0, keep.address, '0', payload)
        }
      }
    } else {
      await createSignal(keep.address, keep.chainId, data.title, data.content).then(() => {
        tx.setOpen(false)
      })
    }
  }

  return (
    <Button
      type="submit"
      loading={isSubmitting}
      variant="primary"
      tone="green"
      disabled={notSigner}
      onClick={handleSubmit(submit)}
    >
      Submit
    </Button>
  )
}
