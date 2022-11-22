import React, { useState } from 'react'
import { Card, Box, Stack, Heading, Text, Button, IconArrowRight } from '@kalidao/reality'
import { Transaction } from '~/propose/tx/'
import { Signal } from '~/propose/signal/'

const Create = () => {
  const [view, setView] = useState('tx')

  const views: { [key: string]: React.ReactNode } = {
    signal: <Signal setView={setView} />,
    tx: <Transaction setView={setView} />,
  }

  return (
    <Box>
      <Stack>
        <Stack direction={'horizontal'}>
          <Card padding="6" width={'full'} hover={view !== 'tx' ? true : false}>
            <Stack direction={'horizontal'} align="center" justify={'space-between'}>
              <Stack>
                <Heading>Proposal</Heading>
                <Text>Proposals are on-chain transactions for multisig signers.</Text>
              </Stack>
              <Button shape="circle" disabled={view !== 'tx' ? false : true} onClick={() => setView('tx')}>
                <IconArrowRight />
              </Button>
            </Stack>
          </Card>
          <Card padding="6" width="full" hover={view !== 'signal' ? true : false}>
            <Stack direction={'horizontal'} align="center" justify={'space-between'}>
              <Stack>
                <Heading>Signal</Heading>
                <Text>Signals are off-chain discussion posts for community.</Text>
              </Stack>
              <Button shape="circle" disabled={view !== 'signal' ? false : true} onClick={() => setView('signal')}>
                <IconArrowRight />
              </Button>
            </Stack>
          </Card>
        </Stack>
        {views[view]}
      </Stack>
    </Box>
  )
}

export default Create
