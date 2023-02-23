import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'

import { Box, Stack } from '@kalidao/reality'
import * as Tabs from '@radix-ui/react-tabs'
import { Proposals, Signals, Signers, Treasury } from '~/dashboard'
import * as styles from '~/dashboard/styles.css'
import { KeepStore, useKeepStore } from '~/dashboard/useKeepStore'
import Layout from '~/layout/DashboardLayout'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@design/Select'

const Dashboard: NextPage = () => {
  const setTxFilter = useKeepStore((state) => state.setTxFilter)
  const txFilter = useKeepStore((state) => state.txFilter)

  return (
    <Layout
      title={'Dashboard'}
      content={'Manage your Keep'}
      sidebar={
        <Stack>
          <Treasury />
          <Signers />
        </Stack>
      }
    >
      {/* Proposal/Signal Tab */}
      <Tabs.Root className={styles.tabRoot} defaultValue="txs">
        <Tabs.List className={styles.tabList} aria-label="Review and Sign Transactions">
          <Box width="full" display="flex" flexDirection={'row'} alignItems="center" justifyContent={'space-between'}>
            <Stack direction={'horizontal'}>
              <Tabs.Trigger className={styles.tabTrigger} value="txs">
                Transactions
              </Tabs.Trigger>
              <Tabs.Trigger className={styles.tabTrigger} value="signals">
                Signals
              </Tabs.Trigger>
            </Stack>
            <Box>
              <Select
                value={txFilter}
                onValueChange={(value: KeepStore['txFilter']) => {
                  setTxFilter(value)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectGroup>
                    <SelectItem value={'all'}>All</SelectItem>
                    <SelectItem value={'pending'}>Pending</SelectItem>
                    <SelectItem value={'process'}>Processable</SelectItem>
                    <SelectItem value={'executed'}>Executed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Box>
          </Box>
        </Tabs.List>
        <Tabs.Content className={styles.tabContent} value="txs">
          <Proposals />
        </Tabs.Content>
        <Tabs.Content className={styles.tabContent} value="signals">
          <Signals />
        </Tabs.Content>
      </Tabs.Root>
    </Layout>
  )
}

export default Dashboard
