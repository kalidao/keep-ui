import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Box, Divider, Heading } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { KeepCard } from '~/components'
import * as styles from '~/dashboard/communities.css'
import Layout from '~/layout/'
import { fetcher } from '~/utils'

const Communities: NextPage = () => {
  const { user } = useDynamicContext()
  const { data: keeps } = useQuery(
    ['userKeeps', user?.blockchainAccounts?.[0]?.address],
    async () => {
      const data = await fetcher(
        `${process.env.NEXT_PUBLIC_KEEP_API}/keeps?signer=${user?.blockchainAccounts?.[0]?.address}`,
      )
      return data.keeps
    },
    {
      enabled: !!user,
    },
  )
  const router = useRouter()

  if (!user) {
    router.push('/login')
  }
  console.log('keeps communtiies', keeps)
  return (
    <Layout title={'Dashboard'} content={'Manage your Keep'}>
      <Box width="full" display="flex" alignItems={'center'} justifyContent="center" paddingTop="5" paddingBottom={'5'}>
        <Heading>Communities</Heading>
      </Box>
      <Divider />
      <Box display="flex" alignItems={'center'} width="full" justifyContent={'center'}>
        <Box className={styles.communityGrid}>
          {keeps &&
            keeps.map((k: any) => {
              const keep = k.keep
              console.log('keep', keep)
              let key = keep.chainId + keep.address
              return (
                <KeepCard
                  key={key}
                  name={keep.name}
                  keep={keep.address}
                  chainId={keep.chainId}
                  avatar={keep.avatar}
                  txs={keep.transactions}
                  bio={keep.bio}
                />
              )
            })}
        </Box>
      </Box>
    </Layout>
  )
}

export default Communities
