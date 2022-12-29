import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { useAccount, useContractRead } from 'wagmi'
import { KEEP_ABI } from '~/constants'
import 'react-step-progress-bar/styles.css'
import { ProgressBar } from 'react-step-progress-bar'
import { Stack, Text } from '@kalidao/reality'

type Sig = {
  userAddress: string
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
  console.log('quorum', sigs?.length, quorum, (sigs?.length / Number(quorum)) * 100, error)

  return (
    <Stack>
      <Text>The quorum is set to {quorum}.</Text>
      {percentage == 100 && <Text>The quorum has been met. Ready to execute!</Text>}
      <ProgressBar percent={percentage} filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"></ProgressBar>
    </Stack>
  )
}

export default Quorum
