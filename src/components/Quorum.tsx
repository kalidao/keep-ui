import { Tag } from '@kalidao/reality'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { useContractRead, useEnsName } from 'wagmi'
import { KEEP_ABI } from '~/constants'
import { truncAddress } from '~/utils'
import 'react-step-progress-bar/styles.css'
import { ProgressBar, Step } from 'react-step-progress-bar'

type Sig = {
  userAddress: string
  v: string
  r: string
  s: string
}

const Quorum = ({ sigs }: { sigs: Sig[] }) => {
  // const { data: quorum } = useContractRead({
  //     address:
  // })
  const router = useRouter()
  const { chainId, keep } = router.query
  const { data, error } = useContractRead({
    address: keep as string,
    abi: KEEP_ABI,
    chainId: Number(chainId),
    functionName: 'quorum',
  })

  const quorum = data ? ethers.utils.formatUnits(data, 0) : 0
  console.log('quorum', sigs?.length, quorum, (sigs?.length / Number(quorum)) * 100, error)

  return (
    <ProgressBar
      percent={(sigs?.length / Number(quorum)) * 100}
      filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
    />
  )
}

export default Quorum
