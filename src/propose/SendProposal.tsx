import { useRouter } from 'next/router'

import { Button } from '@kalidao/reality'
import { JSONContent } from '@tiptap/core'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useNonce } from '~/hooks/useNonce'
import { toOpString } from '~/utils/toOp'

import toast from '@design/Toast'

import { getTxHash } from './getTxHash'
import { createSignal } from './signal/createSignal'
import { createSendNFT } from './tx/handleTx'
import { sendTx } from './tx/sendTx'
import { useSendStore } from './tx/useSendStore'
import { createManageSignersPayload } from './tx/utils'
import { baseSchema, schemas } from './types'

export const SendProposal = () => {
  const tx = useSendStore((state) => state)
  const keep = useKeepStore((state) => state)
  const router = useRouter()
  const { data: nonce } = useNonce(keep.chainId ?? 1, keep.address ? keep.address : '0x')
  const { handleSubmit } = useFormContext()

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
      tx.setOpen(false)
    })
  }

  const submit = async (data: Schema) => {
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
      let payload
      switch (action) {
        case 'manage_signers':
          const signers = data.signers.map((signer: { address: string; resolves?: string }) => {
            if (signer?.resolves) {
              return signer.resolves
            } else {
              return signer.address
            }
          })

          payload = createManageSignersPayload(
            keep.address,
            {
              signers: signers,
              threshold: data.threshold,
            },
            keep.signers,
            keep.threshold,
          )

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
          await handleTx(keep.chainId, keep.address, data.title, data.content, 0, tx.to, tx.value, tx.data)
        }
      }
    } else {
      await createSignal(keep.address, keep.chainId, data.title, data.content).then(() => {
        tx.setOpen(false)
      })
    }
  }

  return (
    <Button type="submit" variant="primary" tone="green" onClick={handleSubmit(submit)}>
      Submit
    </Button>
  )
}
