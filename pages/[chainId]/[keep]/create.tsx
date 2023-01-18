import type { NextPage } from 'next'
import Layout from '~/layout/DashboardLayout'
import { Transaction } from '~/propose/tx/'

const Tx: NextPage = () => {
  return (
    <Layout title={'Dashboard'} content={'Manage your Keep'}>
      <Transaction />
    </Layout>
  )
}

export default Tx
