import type { NextPage } from 'next'
import Layout from '~/layout/DashboardLayout'
import { Proposals } from '~/dashboard'

const Dashboard: NextPage = () => {
  return (
    <Layout title={'Dashboard'} content={'Manage your Keep'}>
      <Proposals />
    </Layout>
  )
}

export default Dashboard
