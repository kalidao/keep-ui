import type { NextPage } from 'next'
import { Heading, Text, Stack, Box } from '@kalidao/reality'
import Layout from '~/layout/DashboardLayout'
import { Signers, Profile, Wrappr, Proposals, Treasury } from '~/dashboard'
import { useRouter } from 'next/router'
import { ViewTx } from '~/transaction'
import { fetcher } from '~/utils'
import { useQuery } from '@tanstack/react-query'

const Tx: NextPage = () => {
  const router = useRouter()
  const { chainId, keep, txHash } = router.query
  const { data } = useQuery(['keep', chainId, keep, txHash], async () =>
    fetcher(`http://localhost:3000/transactions/${chainId}/${keep}/${txHash}`),
  )

  return (
    <Layout title={'Dashboard'} content={'Manage your Keep'}>
      <ViewTx tx={data} />
    </Layout>
  )
}

export default Tx
