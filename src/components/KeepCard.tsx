import Image from 'next/image'
import Link from 'next/link'

import { Avatar, Box, Stack, Tag, Text } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'

import * as styles from './styles.css'

type Props = {
  name: string
  chainId: number
  keep: string
  avatar: string | undefined
  bio: string | undefined
  txs: any
}

const KeepCard = ({ name, chainId, keep, avatar, txs }: Props) => {
  // check if keep has pending transactions
  const pendingTxs = txs.filter((tx: any) => tx.status === 'pending')
  const isPending = pendingTxs.length > 0 ? true : false
  const avatarUrl = `${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${chainId}/${keep}/1816876358/image`
  // get svg from avatarUrl
  const { data } = useQuery(['avatar', avatarUrl], async () => {
    const res = await fetch(avatarUrl)
    const data = await res.text()
    // if data is not svg, throw new error
    if (!data.includes('svg')) {
      throw new Error('Not an svg')
    }
    return data
  })
  console.log('svg', data)
  return (
    <Link
      href={`/${chainId}/${keep}`}
      style={{
        textDecoration: 'none',
      }}
    >
      {data ? <Box dangerouslySetInnerHTML={{ __html: data }} className={styles.keepCard} /> : null}
    </Link>
  )
}

export default KeepCard
