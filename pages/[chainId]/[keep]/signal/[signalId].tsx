import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Box, Button, Heading, IconArrowLeft, IconCheck, IconClose, Spinner, Stack, Text } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { Author, PrettyDate } from '~/components'
import { useKeepStore } from '~/dashboard/useKeepStore'
import Layout from '~/layout/DashboardLayout'
import Quorum from '~/proposal/Quorum'
import { fetcher } from '~/utils'

const Signal: NextPage = () => {
  const keep = useKeepStore((state) => state)
  const { signalId } = useRouter().query
  const { data, isError, isLoading } = useQuery(['keepSignal', signalId], async () =>
    fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/signals/${signalId}`),
  )
  const { user, authToken } = useDynamicContext()

  const yes = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/signals/${signalId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          user: user,
          vote: true,
        }),
      })
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    }
  }

  const no = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/signals/${signalId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          user: user,
          vote: false,
        }),
      })
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    }
  }

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
                <Button variant="secondary" tone="green" shape="circle" onClick={yes}>
                  <IconCheck />
                </Button>
                <Button variant="secondary" tone="red" shape="circle" onClick={no}>
                  <IconClose />
                </Button>
              </Stack>
            </Box>
          )}
        </Stack>
      </Box>
    </Layout>
  )
}

export default Signal
