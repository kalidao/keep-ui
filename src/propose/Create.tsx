import React, { useState } from 'react'
import { Card, Stack, Heading, Text, Button, IconArrowRight } from '@kalidao/reality'
import { Transaction } from '~/propose/tx/'
import { Signal } from '~/propose/signal/'

const Create = () => {
  const [view, setView] = useState('tx')

  const views: { [key: string]: React.ReactNode } = {
    signal: <Signal setView={setView} />,
    tx: <Transaction setView={setView} />,
  }

  return (
    <Card padding="6">
      <Stack>
        <Stack direction={'horizontal'}>
          <Card level={view !== 'tx' ? '2' : '1'} padding="6" width={'full'} hover={view !== 'tx' ? true : false}>
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
          <Card level={view !== 'signal' ? '2' : '1'} padding="6" width="full" hover={view !== 'signal' ? true : false}>
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
    </Card>
  )
}

export default Create
