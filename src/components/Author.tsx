import { Tag } from '@kalidao/reality'
import { useEnsName } from 'wagmi'
import { truncAddress } from '~/utils'

const Author = ({ author }: { author: string }) => {
  const { data: ensName } = useEnsName({
    address: author as `0xstring`,
    chainId: 1,
  })

  return <Tag label="Author">{ensName ? ensName : truncAddress(author)}</Tag>
}

export default Author
