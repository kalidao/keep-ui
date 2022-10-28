import type { NextPage } from 'next'
import { Heading, Text, Stack, Card, Button } from '@kalidao/reality'
import Layout from '~/layout/DashboardLayout'
import { useRouter } from 'next/router'
import { ViewTx } from '~/transaction'
import { fetcher } from '~/utils'
import { useQuery } from '@tanstack/react-query'
import { PrettyDate, Author, Quorum } from '~/components'
import { useAccount } from 'wagmi'
import { useSignMessage } from 'wagmi'
import { ethers } from 'ethers'

const Tx: NextPage = () => {
  const router = useRouter()
  const { address } = useAccount()
  const { chainId, keep, txHash } = router.query
  const { data } = useQuery(['keep', chainId, keep, txHash], async () => fetcher(`http://localhost:3000/txs/${txHash}`))
  const {
    data: tx,
    isError,
    isLoading,
    isSuccess,
    signMessageAsync,
  } = useSignMessage({
    message: data?.txHash,
  })

  const sign = async () => {
    if (!address) return
    const sign = await signMessageAsync()
    console.log('sign', sign)

    const { v, r, s } = ethers.utils.splitSignature(sign)
    const body = {
      address: address,
      v: v,
      r: r,
      s: s,
    }

    console.log('body', body)

    const send = await fetch(`http://localhost:3000/txs/${data?.txHash}/sign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((res) => res.json())

    console.log('post', send)
  }
  return (
    <Layout title={'Dashboard'} content={'Manage your Keep'}>
      <Card padding="6">
        <Stack>
          <Stack>
            <Heading>{data?.title}</Heading>
            <Stack direction={'horizontal'}>
              <PrettyDate timestamp={data?.createdAt} />
              <Author author={data ? data?.authorAddress : ''} />
            </Stack>
          </Stack>
          <Text>{data?.content}</Text>
          <ViewTx tx={data} />
          <Stack direction={'horizontal'} align="center">
            <Quorum sigs={data?.sigs} />
            <Button onClick={sign}>Sign</Button>
          </Stack>
        </Stack>
      </Card>
    </Layout>
  )
}

export default Tx
