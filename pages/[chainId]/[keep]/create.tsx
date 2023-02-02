import type { NextPage } from 'next'

import { Stack } from '@kalidao/reality'
import { Treasury } from '~/dashboard'
import Layout from '~/layout/DashboardLayout'
import { Transaction } from '~/propose/tx/'

const Tx: NextPage = () => {
  return (
    <Layout
      title={'Dashboard'}
      content={'Manage your Keep'}
      sidebar={
        <Stack>
          <Treasury />
        </Stack>
      }
    >
      <Transaction />
    </Layout>
  )
}

export default Tx
