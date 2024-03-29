import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import {
  Box,
  Button,
  Divider,
  Heading,
  IconArrowDown,
  IconArrowLeft,
  IconArrowUp,
  Spinner,
  Stack,
  Text,
} from '@kalidao/reality'
import Comments from '~/comments'
import { Author, PrettyDate } from '~/components'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useGetSignal } from '~/hooks/useGetSignal'
import Layout from '~/layout/DashboardLayout'
import { DeleteSignal } from '~/signal/DeleteSignal'
import { vote } from '~/signal/utils'

import { JSONContentRenderer } from '~/components/Editor/JSONContent'
import { User } from '~/components/user'

import toast from '@design/Toast'

const Signal: NextPage = () => {
  const keep = useKeepStore((state) => state)
  const { signalId } = useRouter().query
  const { data, isError, isLoading } = useGetSignal(signalId as string)

  const signal = async (support: boolean) => {
    if (!signalId) {
      toast('error', `Not a valid signal`)
      return
    }

    await vote(signalId.toString(), support)
  }

  const yesVotes = !isLoading && data && data?.votes?.filter((support: any) => support.type === 'yes')
  const noVotes = !isLoading && data && data?.votes?.filter((support: any) => support.type === 'no')

  console.log('yesVotes', yesVotes, data)

  return (
    <Layout
      title={'Dashboard'}
      content={'Manage your Keep'}
      sidebar={
        <Stack>
          {yesVotes?.length > 0 ? (
            <>
              <Heading>Supported</Heading>
              <Divider />

              {yesVotes.map((vote: any) => {
                return <User key={vote.userId} address={vote.userId} size="lg" />
              })}
            </>
          ) : null}
          {noVotes?.length > 0 ? (
            <>
              <Heading>Rejected</Heading>
              <Divider />
              {noVotes &&
                noVotes.map((vote: any) => {
                  return <User key={vote.userId} address={vote.userId} size="lg" />
                })}
            </>
          ) : null}
        </Stack>
      }
    >
      <Box padding={'3'} display="flex" flexDirection={'column'} gap="3">
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
                minHeight="96"
                display={'flex'}
                flexDirection="column"
                alignItems={'flex-start'}
                justifyContent="flex-start"
                gap="5"
              >
                <Stack
                  direction={'vertical'}
                  align={{
                    xs: 'flex-start',
                  }}
                  justify={'space-between'}
                >
                  <Stack direction={'horizontal'} align="center" justify="space-between">
                    <Stack direction={'horizontal'}>
                      <User address={data ? data?.userId : ''} size="sm" />
                      <Heading>{data?.title}</Heading>
                    </Stack>
                    <DeleteSignal />
                  </Stack>
                  <Stack
                    direction={{
                      xs: 'vertical',
                      md: 'horizontal',
                    }}
                    align="center"
                    justify={'center'}
                  >
                    <PrettyDate timestamp={data?.createdAt} />
                    <Author author={data ? data?.userId : ''} />
                  </Stack>
                </Stack>
                <JSONContentRenderer content={data?.content} />
              </Box>

              <Stack direction={'horizontal'} align="center">
                <Button size="small" variant="secondary" tone="green" shape="circle" onClick={async () => signal(true)}>
                  <IconArrowUp />
                </Button>
                <Button size="small" variant="secondary" tone="red" shape="circle" onClick={async () => signal(false)}>
                  <IconArrowDown />
                </Button>
              </Stack>
            </Box>
          )}
        </Stack>
        <Comments />
      </Box>
    </Layout>
  )
}

export default Signal
