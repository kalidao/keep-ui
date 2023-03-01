import Link from 'next/link'

import { Box, Button, Card, Field, IconArrowLeft, Input, Stack, Textarea } from '@kalidao/reality'
import { useKeepStore } from '~/dashboard/useKeepStore'

import Editor from '~/components/Editor'

import { highBackground } from '@design/blur.css'

import { Builder } from './Builder'
import { ManageSigners } from './ManageSigners'
import { NftGenerator } from './NftGenerator'
import { SendNFT } from './SendNFT'
import { SendToken } from './SendToken'
import { Toolbox } from './Toolbox'
import { SendStore, useSendStore } from './useSendStore'

const Transaction = () => {
  const keep = useKeepStore((state) => state)
  const tx = useSendStore((state) => state)

  const views: { [key in Exclude<SendStore['view'], undefined>]: React.ReactNode } = {
    send_token: <SendToken />,
    send_nft: <SendNFT />,
    builder: <Builder />,
    manage_signers: <ManageSigners />,
    nft_generator: <NftGenerator />,
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
            <Field label="Description" description="">
              <Editor placeholder="Say something" content={tx.content} setContent={tx.setContent} />
            </Field>
            <Card padding="6">{tx.view && views[tx.view]}</Card>
            <Toolbox />
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default Transaction
