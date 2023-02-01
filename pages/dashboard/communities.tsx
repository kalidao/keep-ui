import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Box, Divider, Heading, Stack } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { KeepCard } from '~/components'
import * as styles from '~/dashboard/communities.css'
import Layout from '~/layout/'
import { fetcher } from '~/utils'

const Communities: NextPage = () => {
  const { user } = useDynamicContext()
  const { data: keeps, isLoading } = useQuery(
    ['userKeeps', user?.walletPublicKey],
    async () => {
      const data = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps?signer=${user?.walletPublicKey}`)
      return data
    },
    {
      enabled: !!user,
    },
  )
  const router = useRouter()

  if (!user) {
    router.push('/login')
  }

  return (
    <Layout title={'Dashboard'} content={'Manage your Keep'}>
      <Box width="full" display="flex" alignItems={'center'} justifyContent="center" paddingTop="10">
        <Heading>Communities</Heading>
      </Box>
      <Divider />
      <Box display="flex" alignItems={'center'} width="full" justifyContent={'center'}>
        <Box className={styles.communityGrid}>
          {keeps &&
            keeps.map((keep: any) => {
              console.log('keep', `/${keep.chainId}/${keep.address}`)
              return (
                <KeepCard
                  key={keep.address}
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
