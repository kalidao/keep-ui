import type { NextPage } from 'next'
import { Heading, Text, Stack, Box } from '@kalidao/reality'
import Layout from '~/layout/DashboardLayout'
import { Signers, Profile, Wrappr, Proposals, Treasury } from '~/dashboard'

const Dashboard: NextPage = () => {
  return (
    <Layout title={'Dashboard'} content={'Manage your Keep'}>
      <Proposals />
    </Layout>
  )
}

export default Dashboard
