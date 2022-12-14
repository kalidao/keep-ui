import { Card, Stack, Heading, Text, Button, IconArrowRight, Stat } from '@kalidao/reality'
import { ethers } from 'ethers'

type Props = {
  native: any
  nfts: any
  tokens: any
  synced: string
}

const Treasury = ({ native, tokens }: Props) => {
  const _balance = native ? ethers.utils.formatUnits(native?.balance) : 0
  const _tokens = tokens ? tokens?.length : 0
  // const _nfts = nfts ? nfts?.length : 0

  return (
    <Card padding="6">
      <Stack justify={'space-between'} space="13">
        <Heading>Treasury</Heading>
        <Stack direction={'horizontal'}>
          <Stat label="Balance" value={_balance} meta={native?.contract_ticker_symbol} />
          {/* <Stat label="Collectibles" value={_nfts} meta="NFTs" /> */}
          <Stat label="Tokens" value={_tokens} meta={'ERC20s'} />
        </Stack>
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <Text color="foregroundSecondary">Synced 1 minute ago.</Text>
          <Button size="small" variant="secondary">
            <IconArrowRight />
          </Button>
        </Stack>
      </Stack>
    </Card>
  )
}

export default Treasury
