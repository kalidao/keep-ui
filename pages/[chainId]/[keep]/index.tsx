import type { NextPage } from 'next'
import { Heading, Text, Stack, Box } from '@kalidao/reality'
import Layout from '~/layout/DashboardLayout'
import { Signers, Profile, Wrappr, Proposals, Treasury } from '~/dashboard'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const { chainId, keep } = router.query

  return (
    <Layout title={'Dashboard'} content={'Manage your Keep'}>
      <Stack>
        <Stack direction={'horizontal'} justify="space-between">
          <Profile />
          <Treasury />
          <Wrappr />
          <Signers />
        </Stack>
        <Proposals />
      </Stack>
    </Layout>
  )
}

export default Dashboard
