import { Card, Stack, Heading, Text, Button, Avatar, IconArrowRight, Stat } from '@kalidao/reality'
import { ethers } from 'ethers'

type Props = {
  native: {
    balance: string
  }
  nfts: any
  tokens: any
}

const Treasury = ({ native, nfts, tokens }: Props) => {
  return (
    <Card padding="6">
      <Stack justify={'space-between'} space="13">
        <Heading>Treasury</Heading>
        <Stack direction={'horizontal'}>
          <Stat label="Balance" value={ethers.utils.formatEther(ethers.BigNumber.from(native?.balance))} meta="MATIC" />
          <Stat label="Collectibles" value={nfts?.length} meta="NFTs" />
          <Stat label="Tokens" value={tokens?.length} meta={'ERC20s'} />
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
