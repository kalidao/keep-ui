import { Tag } from '@kalidao/reality'
import { useRouter } from 'next/router'
import { useContractRead, useEnsName } from 'wagmi'
import { truncAddress } from '~/utils'

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
  const { data: quorum } = useContractRead({
    address: keep as string,
    chainId: Number(chainId),
    functionName: 'quorum',
  })

  console.log('quorum', quorum)

  return <Tag label="Author">{sigs?.length}</Tag>
}

export default Quorum
