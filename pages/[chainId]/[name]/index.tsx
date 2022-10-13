import type { NextPage } from 'next'
import { Heading, Text, Stack, Box } from '@kalidao/reality'
import Layout from '~/layout/DashboardLayout'
import Create from '~/create'

const Dashboard: NextPage = () => {
  return <Layout title={'Dashboard'} content={'Manage your Keep'}></Layout>
}

export default Dashboard
