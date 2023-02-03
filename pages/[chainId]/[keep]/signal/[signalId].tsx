import { useEffect } from 'react'

import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Box, Button, Card, Heading, IconArrowLeft, Spinner, Stack, Text } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { Author, PrettyDate } from '~/components'
import { KEEP_ABI } from '~/constants'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useTxStore } from '~/dashboard/useTxStore'
import Layout from '~/layout/DashboardLayout'
import { ViewTx } from '~/proposal'
import Execute from '~/proposal/Execute'
import Quorum from '~/proposal/Quorum'
import Vote from '~/proposal/Vote'
import { fetcher } from '~/utils'
import { toOp } from '~/utils/toOp'

type Sign = {
  user: `0xstring`
  v: number
  r: `0xstring`
  s: `0xstring`
}

const Signal: NextPage = (props: any) => {
  const keep = useKeepStore((state) => state)
  const { signalId } = useRouter().query
  const { data, isError, isLoading } = useQuery(['keepSignal', signalId], async () =>
    fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/signals/${signalId}`),
  )

  console.log('data', data)
  return (
    <Layout
      title={'Dashboard'}
      content={'Manage your Keep'}
      sidebar={
        <Stack>
          <Quorum />
        </Stack>
      }
    >
      <Box padding={'3'}>
        <Stack
          direction={{
            xs: 'vertical',
            md: 'horizontal',
          }}
        >
          <Link href={`/${keep.chainId}/${keep.address}`} passHref legacyBehavior>
            <Button size="small" variant="transparent" as="a">
              <IconArrowLeft />
            </Button>
          </Link>
          {isLoading && (
            <Box width="full" height="52" display="flex" justifyContent={'center'} alignItems="center">
              <Spinner />
            </Box>
          )}
          {isError && <Text>Something went wrong</Text>}
          {data && (
            <Box
              height="full"
              width={'full'}
              display={'flex'}
              flexDirection="column"
              alignItems={'baseline'}
              justifyContent={'space-between'}
              gap="5"
            >
              <Box
                width="full"
                height="full"
                display={'flex'}
                flexDirection="column"
                alignItems={'baseline'}
                justifyContent="center"
                gap="5"
              >
                <>
                  <Stack
                    direction={{
                      xs: 'vertical',
                      md: 'horizontal',
                    }}
                    align={{
                      xs: 'flex-start',
                      md: 'center',
                    }}
                    justify={'space-between'}
                  >
                    <Heading>{data?.title}</Heading>
                    <Stack
                      direction={{
                        xs: 'vertical',
                        md: 'horizontal',
                      }}
                      align="center"
                      justify={'center'}
                    >
                      <PrettyDate timestamp={data?.createdAt} />
                      <Author author={data ? data?.authorAddress : ''} />
                    </Stack>
                  </Stack>
                  <Text>{data?.content}</Text>
                </>
              </Box>
              <Stack direction={'horizontal'} align="center">
                <Vote />
              </Stack>
            </Box>
          )}
        </Stack>
      </Box>
    </Layout>
  )
}

export default Signal
