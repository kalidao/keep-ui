import type { NextPage } from 'next'
import { Heading, Text, Stack, Box } from '@kalidao/reality'
import Layout from '~/layout/DashboardLayout'
import { Signers, Profile, Wrappr, Proposals, Treasury } from '~/dashboard'
import { useRouter } from 'next/router'
import { Create } from '~/transaction'

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
