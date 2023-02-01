import type { NextPage } from 'next'

import * as Tabs from '@radix-ui/react-tabs'
import { Proposals } from '~/dashboard'
import { Signals } from '~/dashboard'
import * as styles from '~/dashboard/styles.css'
import Layout from '~/layout/DashboardLayout'

const Dashboard: NextPage = () => {
  return (
    <Layout title={'Dashboard'} content={'Manage your Keep'}>
      {/* Proposal/Signal Tab */}
      <Tabs.Root className={styles.tabRoot} defaultValue="txs">
        <Tabs.List className={styles.tabList} aria-label="Review and Sign Transactions">
          <Tabs.Trigger className={styles.tabTrigger} value="txs">
            Transactions
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.tabTrigger} value="signals">
            Signals
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="TabsContent" value="txs">
          <Proposals />
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="signals">
          <Signals />
        </Tabs.Content>
      </Tabs.Root>
    </Layout>
  )
}

export default Dashboard
