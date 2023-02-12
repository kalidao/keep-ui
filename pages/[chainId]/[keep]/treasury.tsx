import type { NextPage } from 'next'

import { Box, Stack } from '@kalidao/reality'
import * as Tabs from '@radix-ui/react-tabs'
import { NftTreasury, Signers, TokenTreasury, Treasury } from '~/dashboard'
import GiveMoney from '~/dashboard/GiveMoney'
import * as styles from '~/dashboard/styles.css'
import Layout from '~/layout/DashboardLayout'

const TreasuryPage: NextPage = () => {
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
      <Tabs.Root className={styles.tabRoot} defaultValue="tokens">
        <Tabs.List className={styles.tabList} aria-label="Review and Sign Transactions">
          <Box width="full" display="flex" flexDirection={'row'} alignItems="center" justifyContent={'space-between'}>
            <Stack direction={'horizontal'}>
              <Tabs.Trigger className={styles.tabTrigger} value="tokens">
                Tokens
              </Tabs.Trigger>
              <Tabs.Trigger className={styles.tabTrigger} value="nfts">
                NFTs
              </Tabs.Trigger>
            </Stack>
            <GiveMoney />
          </Box>
        </Tabs.List>
        <Tabs.Content className="TabsContent" value="tokens">
          <TokenTreasury />
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="nfts">
          <NftTreasury />
        </Tabs.Content>
      </Tabs.Root>
    </Layout>
  )
}

export default TreasuryPage
