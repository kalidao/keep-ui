import React from 'react'
import * as Toolbar from '@radix-ui/react-toolbar'
import * as styles from './styles.css'
import {
  IconBookOpenSolid,
  IconCollection,
  IconDocuments,
  Box,
  IconDocumentsSolid,
  IconNFT,
  IconTokens,
  IconUserGroupSolid,
} from '@kalidao/reality'
import { CreateTxButton } from './CreateTxButton'
import { Button } from '@kalidao/reality'

import { useRouter } from 'next/router'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useAccount, useContractRead } from 'wagmi'
import { KEEP_ABI } from '~/constants'
import { getTxHash } from '../getTxHash'
import { TxStore, useTxStore } from './useTxStore'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils'
import { useDynamicContext } from '@dynamic-labs/sdk-react'
import Tooltip from '~/components/Tooltip'
import key from '../../../public/key.webp'

const operation = (op: number) => {
  switch (op) {
    case 0:
      return 'call'
    case 1:
      return 'delegatecall'
    case 2:
      return 'create'
  }
}

export const Toolbox = () => {
  const router = useRouter()
  const keep = useKeepStore((state) => state)
  const tx = useTxStore((state) => state)
  const { address } = useAccount()

  const { refetch: refetchNonce } = useContractRead({
    address: keep.address as `0xstring`,
    abi: KEEP_ABI,
    functionName: 'nonce',
    chainId: Number(keep.chainId),
  })
  const {
    data: meta,
    isLoading,
    isError,
  } = useQuery(['keep', keep.chainId, keep.address], async () =>
    fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${keep.chainId}/${keep.address}/`),
  )
  const notSigner = meta?.signers?.find((s: string) => s === address?.toLowerCase()) == undefined ? true : false

  const handleTx = async () => {
    if (keep.chainId && keep.address) {
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
      console.log('nonce', nonce)
      console.log(
        'digest',
        Number(keep.chainId),
        keep.address as string,
        tx.op,
        tx.to,
        tx.value,
        tx.data,
        nonce.toString(),
        digest,
      )

      if (digest == 'error') {
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
        authorAddress: tx.author,
      }
      console.log('body', body)

      const send = await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${keep.chainId}/${keep.address}/addTx`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then((res) => res.json())

      console.log('send', send)
    }

    // TODO: Add success/error toast
    router.push(`/${keep.chainId}/${keep.address}`)
  }
  return (
    <Toolbar.Root className={styles.ToolbarRoot} aria-label="Formatting options">
      <Toolbar.ToggleGroup
        type="single"
        aria-label="Text formatting"
        onValueChange={(value: TxStore['view']) => tx.setView(value)}
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
          <Toolbar.ToggleItem className={styles.ToolbarToggleItem} value="signers" aria-label="Users">
            <IconUserGroupSolid />
          </Toolbar.ToggleItem>
        </Tooltip>
        <Tooltip label="Contract Call">
          <Toolbar.ToggleItem className={styles.ToolbarToggleItem} value="call" aria-label="Users">
            <IconDocumentsSolid />
          </Toolbar.ToggleItem>
        </Tooltip>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator className={styles.ToolbarSeparator} />
      <Tooltip label="Learn More">
        <Toolbar.Link className={styles.ToolbarLink} href="#" target="_blank" style={{ marginRight: 10 }}>
          <IconBookOpenSolid />
        </Toolbar.Link>
      </Tooltip>
      <Toolbar.Button
        style={{ marginLeft: 'auto' }}
        onClick={handleTx}
        disabled={isLoading || isError || notSigner}
        className={styles.ToolbarButton}
      >
        Submit
      </Toolbar.Button>
    </Toolbar.Root>
  )
}
