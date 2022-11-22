import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Heading, Avatar, Text, Stack, Box, Card, Button, IconArrowRight } from '@kalidao/reality'
import Layout from '~/layout'
import Create from '~/create'
import { fetcher } from '~/utils'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { KeepCard } from '~/components/'

const Explore: NextPage = () => {
  const { data: keeps, error } = useQuery(['allKeeps'], () => fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/all`))
  console.log('keeps', keeps, error)
  return (
    <Layout title={'Home'} content={'Create a Keep'}>
      <Stack direction={'horizontal'} wrap>
        {keeps &&
          keeps.map((keep: any) => {
            return (
              <KeepCard
                key={keep?.address}
                name={keep?.name}
                avatar={keep?.avatar}
                chainId={keep?.chainId}
                keep={keep?.address}
                bio={keep?.bio}
              />
            )
          })}
      </Stack>
    </Layout>
  )
}

export default Explore
