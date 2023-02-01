import type { NextPage } from 'next'

import { Proposals } from '~/dashboard'
import Layout from '~/layout/DashboardLayout'

const Dashboard: NextPage = () => {
  return (
    <Layout title={'Dashboard'} content={'Manage your Keep'}>
      <Proposals />
    </Layout>
  )
}

export default Dashboard
