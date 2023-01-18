import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { useAccount, useContractRead } from 'wagmi'
import { KEEP_ABI } from '~/constants'
import 'react-step-progress-bar/styles.css'
import { ProgressBar } from 'react-step-progress-bar'
import { Card, Divider, Heading, Stack, Stat, Tag, Text } from '@kalidao/reality'
import { Signer } from '~/dashboard/Signers'

type Sig = {
  signer: string
  v: string
  r: string
  s: string
}

const Quorum = ({ sigs }: { sigs: Sig[] }) => {
  const { address } = useAccount()
  const router = useRouter()
  const { chainId, keep } = router.query
  const { data, error } = useContractRead({
    address: keep as typeof address,
    abi: KEEP_ABI,
    chainId: Number(chainId),
    functionName: 'quorum',
  })

  const quorum = data ? ethers.utils.formatUnits(data, 0) : 0
  const percentage = (sigs.length / Number(quorum)) * 100
  console.log('quorum', sigs, sigs?.length, quorum, (sigs?.length / Number(quorum)) * 100, error)

  return (
    <Card padding="6" width="128">
      <Stack>
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <Heading>Status</Heading>
          <Tag size="medium" tone="green">
            Passing
          </Tag>
        </Stack>
        <Divider />
        {percentage == 100 && <Text>The quorum has been met. Ready to execute!</Text>}
        <ProgressBar percent={percentage} filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"></ProgressBar>
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <Text>Yes</Text>
          <Text>{sigs.length}</Text>
        </Stack>
        <Divider />
        <Heading>
          Signed by {sigs.length} of {quorum}
        </Heading>
        {sigs.length > 0 && <Divider />}
        {sigs?.map((sig) => (
          <Signer key={sig.signer} signer={sig.signer} />
        ))}
      </Stack>
    </Card>
  )
}

export default Quorum
