import type { NextPage } from 'next'
import { Heading, Text, Stack, Box } from '@kalidao/reality'
import Layout from '~/layout/DashboardLayout'
import { useRouter } from 'next/router'
import Create from '~/propose/Create'

const Tx: NextPage = () => {
  const router = useRouter()
  const { chainId, keep } = router.query

  return (
    <Layout title={'Dashboard'} content={'Manage your Keep'}>
      <Create />
    </Layout>
  )
}

export default Tx
