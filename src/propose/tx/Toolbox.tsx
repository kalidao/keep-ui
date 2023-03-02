import React from 'react'

import { useRouter } from 'next/router'

import { getAuthToken, useDynamicContext } from '@dynamic-labs/sdk-react'
import { IconBookOpenSolid, IconDocumentsSolid, IconNFT, IconTokens, IconUserGroupSolid } from '@kalidao/reality'
import * as Toolbar from '@radix-ui/react-toolbar'
import { useContractRead } from 'wagmi'
import { KEEP_ABI } from '~/constants'
import { docsUrl } from '~/constants/socials'
import { useKeepStore } from '~/dashboard/useKeepStore'

import Tooltip from '~/components/Tooltip'

import toast from '@design/Toast'

import { getTxHash } from '../getTxHash'
import { createSignal } from '../signal/createSignal'
import { handleSendNFT } from './handleTx'
import { sendTx } from './sendTx'
import * as styles from './styles.css'
import { SendStore, useSendStore } from './useSendStore'
import { createManageSignersPayload } from './utils'

const operation = (op: number) => {
  switch (op) {
    case 0:
      return 'call'
    case 1:
      return 'delegatecall'
    case 2:
      return 'create'
    default:
      return 'unknown'
  }
}

export const Toolbox = () => {
  const router = useRouter()
  const keep = useKeepStore((state) => state)
  const tx = useSendStore((state) => state)
  const { user } = useDynamicContext()

  const { data: nonce, refetch: refetchNonce } = useContractRead({
    address: keep.address as `0xstring`,
    abi: KEEP_ABI,
    functionName: 'nonce',
    chainId: Number(keep.chainId),
  })


  const notSigner =
    keep?.signers?.find((s: string) => s === user?.walletPublicKey?.toLowerCase()) == undefined ? true : false

  const handleTx = async () => {
    if (!user?.walletPublicKey) {
      toast('error', 'You must be logged in to submit a transaction')
      return
    } else {
      if (user.walletPublicKey) tx.setAuthor(user.walletPublicKey)
    }

    if (notSigner) {
      toast('error', 'You must be a signer to submit a transaction')
      return
    }

    if (keep.chainId && keep.address) {
      if (!tx.title || !tx.content) {
        toast('error', 'Title and content are required')
        return
      }

      if (tx.view == 'manage_signers') {
        tx.setTo(keep.address)

        if (!keep.threshold) {
          toast('error', 'Error: Invalid transaction')
          return
        }

        let data = createManageSignersPayload(keep.address, tx.manage_signers, keep.signers, keep.threshold)
        tx.setData(data)
      }

      if (tx.view == 'send_nft') {
        tx.setTo(keep.address)
        let data = handleSendNFT(keep.address, tx)
        tx.setData(data)
      }

      if (tx.view == undefined) {
        // submit signal
        const body = {
          title: tx.title,
          content: tx.content,
          authorAddress: tx.author,
        }

        await createSignal(keep.address, keep.chainId, tx.title, tx.content, router)
      } else {
        const { data: nonce } = await refetchNonce()
        if (!nonce) return

        const digest = await getTxHash(
          Number(keep.chainId),
          keep.address as string,
          tx.op,
          tx.to,
          tx.value,
          tx.data,
          nonce.toString(),
        )

        if (digest == 'error') {
          toast('error', 'Error: Invalid transaction')
          return
        }

        if (!nonce) return
        const body = {
          op: operation(tx.op),
          to: tx.to,
          data: tx.data,
          nonce: nonce.toString(),
          value: tx.value,
          txHash: digest,
          title: tx.title,
          content: tx.content,
          authorAddress: user.walletPublicKey?.toLowerCase(),
        }


        await sendTx(
          keep.chainId,
          keep.address,
          {
            op: operation(tx.op),
            to: tx.to,
            data: tx.data,
            nonce: nonce.toString(),
            value: tx.value,
            txHash: digest,
            title: tx.title,
            content: tx.content,
            userId: user.walletPublicKey.toLowerCase() ?? '',
          },
          router,
        )
      }
    }
  }
  return (
    <Toolbar.Root className={styles.ToolbarRoot} aria-label="Formatting options">
      <Toolbar.ToggleGroup
        type="single"
        aria-label="Text formatting"
        value={tx.view as Exclude<SendStore['view'], undefined>}
        onValueChange={(value: string) => {
          tx.setView(value as Exclude<SendStore['view'], undefined>)

          if (value == 'manage_signers') {
            if (!keep.threshold) {
              return toast('error', 'Threshold is required')
            }
            tx.setManageSigners({
              signers: [...keep.signers, ''],
              threshold: keep.threshold,
            })
          }
        }}
      >
        <Tooltip label="Send Tokens">
          <Toolbar.ToggleItem className={styles.ToolbarToggleItem} value="send_token" aria-label="Tokens">
            <IconTokens />
          </Toolbar.ToggleItem>
        </Tooltip>
        <Tooltip label="Send NFTs">
          <Toolbar.ToggleItem className={styles.ToolbarToggleItem} value="send_nft" aria-label="NFTs">
            <IconNFT />
          </Toolbar.ToggleItem>
        </Tooltip>
        <Tooltip label="Manage Signers">
          <Toolbar.ToggleItem className={styles.ToolbarToggleItem} value="manage_signers" aria-label="Users">
            <IconUserGroupSolid />
          </Toolbar.ToggleItem>
        </Tooltip>
        <Tooltip label="Contract Call">
          <Toolbar.ToggleItem className={styles.ToolbarToggleItem} value="builder" aria-label="Call Builder">
            <IconDocumentsSolid />
          </Toolbar.ToggleItem>
        </Tooltip>
        {/* <Tooltip label="NFT Generator">
          <Toolbar.ToggleItem className={styles.ToolbarToggleItem} value="nft_generator" aria-label="NFT Generator">
            <IconPlus />
          </Toolbar.ToggleItem>
        </Tooltip> */}
      </Toolbar.ToggleGroup>
      <Toolbar.Separator className={styles.ToolbarSeparator} />
      <Tooltip label="Learn More">
        <Toolbar.Link className={styles.ToolbarLink} href={docsUrl} target="_blank" style={{ marginRight: 10 }}>
          <IconBookOpenSolid />
        </Toolbar.Link>
      </Tooltip>
      <Toolbar.Button style={{ marginLeft: 'auto' }} onClick={handleTx} className={styles.ToolbarButton}>
        Submit
      </Toolbar.Button>
    </Toolbar.Root>
  )
}
