import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Avatar, Box, Stack, Tag, Text } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import Draggable from 'react-draggable'
import { useIsMounted } from '~/hooks/useIsMounted'

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
  const [click, setClick] = useState(0)
  const mounted = useIsMounted()
  const avatarUrl = `${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${chainId}/${keep}/1816876358/image`
  const router = useRouter()
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

  useEffect(() => {
    // prefetch keep page
    router.prefetch(`/${chainId}/${keep}`)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const now = Date.now()
    if (now - click < 300) {
      // double click
      router.push(`/${chainId}/${keep}`)
    } else {
      setClick(now)
    }
  }

  if (!mounted) {
    return null
  }
  return (
    <Draggable>
      {/* <Link
        href={`/${chainId}/${keep}`}
        style={{
          textDecoration: 'none',
        }}
      > */}
      {data ? (
        <Box onClick={handleClick} dangerouslySetInnerHTML={{ __html: data }} className={styles.keepCard} />
      ) : (
        <Box></Box>
      )}
      {/* </Link> */}
    </Draggable>
  )
}

export default KeepCard
