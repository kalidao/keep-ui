import type { NextPage } from 'next'
import { Heading, Text, Stack, Box } from '@kalidao/reality'
import Layout from '~/layout/DashboardLayout'
import { Signers, Profile, Wrappr, Proposals, Treasury } from '~/dashboard'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const { chainId, keep } = router.query
  const { data, error } = useQuery(['keep', chainId, keep], async () =>
    fetcher(`http://localhost:3000/keeps/137/0xDfC2eA457944F874E68B0cC1e08FB4f4Af7C3f12`),
  )

  console.log('data', data, error)

  return (
    <Layout title={'Dashboard'} content={'Manage your Keep'}>
      <Proposals />
    </Layout>
  )
}

export default Dashboard
