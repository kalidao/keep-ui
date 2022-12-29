import type { NextPage } from 'next'
import Layout from '~/layout/DashboardLayout'
import Create from '~/propose/Create'

const Tx: NextPage = () => {
  return (
    <Layout title={'Dashboard'} content={'Manage your Keep'}>
      <Create />
    </Layout>
  )
}

export default Tx
