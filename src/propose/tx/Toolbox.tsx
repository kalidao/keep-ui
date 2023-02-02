import React from 'react'

import { useRouter } from 'next/router'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import {
  Box,
  IconBookOpenSolid,
  IconCollection,
  IconDocuments,
  IconDocumentsSolid,
  IconNFT,
  IconTokens,
  IconUserGroupSolid,
} from '@kalidao/reality'
import { Button } from '@kalidao/reality'
import * as Toolbar from '@radix-ui/react-toolbar'
import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'
import { useAccount, useContractRead } from 'wagmi'
import { KEEP_ABI } from '~/constants'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { fetcher } from '~/utils'

import Tooltip from '~/components/Tooltip'

import key from '../../../public/key.webp'
import { getTxHash } from '../getTxHash'
import { CreateTxButton } from './CreateTxButton'
import * as styles from './styles.css'
import { SendStore, useSendStore } from './useTxStore'

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
  const tx = useSendStore((state) => state)
  const { user } = useDynamicContext()

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
  const notSigner =
    meta?.signers?.find((s: string) => s === user?.walletPublicKey?.toLowerCase()) == undefined ? true : false

  const handleTx = async () => {
    console.log('user', user)
    if (!user) {
      alert('Please connect your wallet')
      return
    } else {
      tx.setAuthor(user.walletPublicKey)
    }

    if (notSigner) {
      alert('You are not a signer of this keep')
      return
    }

    if (keep.chainId && keep.address) {
      if (!tx.title || !tx.content) {
        alert('Title and Description are required')
        return
      }

      if (!tx.author) {
        alert('Author is required')
        return
      }

      if (tx.to == ethers.constants.AddressZero) {
        // submit signal
        const body = {
          title: tx.title,
          content: tx.content,
          authorAddress: tx.author,
        }

        const send = await fetch(
          `${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${keep.chainId}/${keep.address}/addSignal`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          },
        )
          .then((res) => res.json())
          .catch((e) => {
            console.log('error', e)
            alert('Error: Invalid transaction')
          })
          .finally(() => router.push(`/${keep.chainId}/${keep.address}`))
      } else {
        // isSignal or isTx ?

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
          alert('Error: Invalid transaction')
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
        })
          .then((res) => res.json())
          .catch((e) => {
            console.log('error', e)
            alert('Error: Invalid transaction')
          })
          .finally(() => router.push(`/${keep.chainId}/${keep.address}`))

        console.log('send', send)
      }
    }
  }
  return (
    <Toolbar.Root className={styles.ToolbarRoot} aria-label="Formatting options">
      <Toolbar.ToggleGroup
        type="single"
        aria-label="Text formatting"
        // exclude undefined in type TxStore['view']
        value={tx.view as Exclude<SendStore['view'], undefined>}
        onValueChange={(value: string) => {
          tx.setView(value as Exclude<SendStore['view'], undefined>)
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
