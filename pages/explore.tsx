import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Heading, Avatar, Text, Stack, Box, Card, Button, IconArrowRight } from '@kalidao/reality'
import Layout from '~/layout'
import Create from '~/create'
import { fetcher } from '~/utils'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

const Explore: NextPage = () => {
  const { data: keeps, error } = useQuery(['allKeeps'], () => fetcher(`http://localhost:3000/keeps/`))

  return (
    <Layout title={'Home'} content={'Create a Keep'}>
      <Stack direction={'horizontal'}>
        {keeps &&
          keeps.map((keep: any) => {
            console.log(keep)
            return (
              <Keep
                key={keep?.address}
                name={keep?.name}
                avatar={keep?.avatar}
                chainId={keep?.chainId}
                keep={keep?.address}
              />
            )
          })}
      </Stack>
    </Layout>
  )
}

type Props = {
  name: string
  chainId: number
  keep: string
  avatar: string | undefined
}

const Keep = ({ name, chainId, keep, avatar }: Props) => {
  console.log('name', name)
  return (
    <Card padding={'6'}>
      <Stack direction={'vertical'}>
        <Stack direction={'horizontal'}>
          <Avatar src={avatar} label={name + ' avatar'} address={keep} placeholder />
          <Heading>{name}</Heading>
        </Stack>
        <Link href={`/${chainId}/${keep}`}>
          <Button as="a" shape="square" size="small" variant="secondary">
            <IconArrowRight />
          </Button>
        </Link>
      </Stack>
    </Card>
  )
}

export default Explore
