import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import {
  Box,
  Button,
  Divider,
  Heading,
  IconArrowLeft,
  IconCheck,
  IconClose,
  Spinner,
  Stack,
  Text,
} from '@kalidao/reality'
import { Author, PrettyDate } from '~/components'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useGetSignal } from '~/hooks/useGetSignal'
import Layout from '~/layout/DashboardLayout'
import { Comments } from '~/signal/Comments'
import { vote } from '~/signal/utils'

import { JSONContentRenderer } from '~/components/Editor/JSONContent'
import { RenderText } from '~/components/RenderText'
import { User } from '~/components/User'

import toast from '@design/Toast'

const Signal: NextPage = () => {
  const keep = useKeepStore((state) => state)
  const { signalId } = useRouter().query
  const { data, isError, isLoading } = useGetSignal(signalId as string)
  const { user, authToken } = useDynamicContext()

  const signal = async (support: boolean) => {
    if (!user?.walletPublicKey) {
      toast('error', `Please connect and sign with wallet to signal`)
      return
    }

    if (!authToken) {
      toast('error', `Invalid Auth Token`)
      return
    }

    if (!signalId) {
      toast('error', `Not a valid signal`)
      return
    }

    await vote(signalId.toString(), user.walletPublicKey, support, authToken)
  }

  const yesVotes = !isLoading && data && data?.support?.filter((support: any) => support.type === 'yes')
  const noVotes = !isLoading && data && data?.support?.filter((support: any) => support.type === 'no')

  return (
    <Layout
      title={'Dashboard'}
      content={'Manage your Keep'}
      sidebar={
        <Stack>
          <Heading>Supported</Heading>
          <Divider />
          {yesVotes &&
            yesVotes.map((vote: any) => {
              return <User key={vote.userId} address={vote.userId} size="lg" />
            })}
          <Heading>Rejected</Heading>
          <Divider />
          {noVotes &&
            noVotes.map((vote: any) => {
              return <User key={vote.userId} address={vote.userId} size="lg" />
            })}
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
                  <User address={data ? data?.userId : ''} size="sm" />
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
                    <Author author={data ? data?.userId : ''} />
                  </Stack>
                </Stack>
                <JSONContentRenderer content={data?.content} />
              </Box>

              <Stack direction={'horizontal'} align="center">
                <Button size="small" variant="secondary" tone="green" shape="square" onClick={async () => signal(true)}>
                  <IconCheck />
                </Button>
                <Button size="small" variant="secondary" tone="red" shape="square" onClick={async () => signal(false)}>
                  <IconClose />
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
