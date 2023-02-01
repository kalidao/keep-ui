import Link from 'next/link'

import { Box, Button, IconArrowLeft, Input, Stack, Textarea } from '@kalidao/reality'
import { useKeepStore } from '~/dashboard/useKeepStore'

import { highBackground } from '@design/blur.css'

import { SendToken } from './SendToken'
import { Toolbox } from './Toolbox'
import { TxStore, useTxStore } from './useTxStore'

const Transaction = () => {
  const keep = useKeepStore((state) => state)
  const tx = useTxStore((state) => state)

  const views: { [key in Exclude<TxStore['view'], undefined>]: React.ReactNode } = {
    send_token: <SendToken />,
    send_nft: <SendToken />,
  }

  return (
    <Box className={highBackground}>
      <Stack direction={'horizontal'} justify="space-between">
        <Link href={`/${keep.chainId}/${keep.address}`} legacyBehavior passHref>
          <Button shape="circle" variant="tertiary" size="small" as="a">
            <IconArrowLeft />
          </Button>
        </Link>
        <Box width="full">
          <Stack>
            <Input
              label="Title"
              description=""
              placeholder="Title"
              onChange={(e) => tx.setTitle(e.currentTarget.value)}
            />
            <Textarea
              label="Description"
              description=""
              placeholder="What is this transaction about?"
              onChange={(e) => tx.setContent(e.currentTarget.value)}
            />
            {tx.view && views[tx.view]}
            <Toolbox />
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default Transaction
