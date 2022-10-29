import React, { useState } from 'react'
import { Card, Stack, Heading, Text, Button, IconArrowRight } from '@kalidao/reality'
import { Transaction } from '~/propose/tx/'
import Preview from '~/propose/Preview'
import { Signal } from '~/propose/signal/'

const Create = () => {
  const [view, setView] = useState('preview')

  const views: { [key: string]: React.ReactNode } = {
    preview: <Preview />,
    signal: <Signal setView={setView} />,
    tx: <Transaction setView={setView} />,
  }

  return (
    <Card padding="6">
      <Stack>
        <Stack direction={'horizontal'}>
          <Card
            level={view == 'preview' ? '2' : '1'}
            padding="6"
            width={'full'}
            hover={view == 'preview' ? true : false}
          >
            <Stack direction={'horizontal'} align="center" justify={'space-between'}>
              <Stack>
                <Heading>Proposal</Heading>
                <Text>Proposals are on-chain transactions for multisig signers.</Text>
              </Stack>
              <Button shape="circle" disabled={view != 'preview' ? true : false} onClick={() => setView('tx')}>
                <IconArrowRight />
              </Button>
            </Stack>
          </Card>
          <Card level={view == 'preview' ? '2' : '1'} padding="6" width="full" hover={view == 'preview' ? true : false}>
            <Stack direction={'horizontal'} align="center" justify={'space-between'}>
              <Stack>
                <Heading>Signal</Heading>
                <Text>Signals are off-chain discussion posts for community.</Text>
              </Stack>
              <Button shape="circle" disabled={view != 'preview' ? true : false} onClick={() => setView('signal')}>
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
