import { Stack } from '@kalidao/reality'
import { useTxStore } from '~/dashboard/useTxStore'

import DownVote from './DownVote'
import UpVote from './UpVote'

const Vote = () => {
  const tx = useTxStore((state) => state)

  if (tx?.status === 'process' || tx?.status === 'executed') {
    return null
  }

  return (
    <Stack direction="horizontal" align="center" justify={'flex-start'}>
      {tx?.status != 'process_yes' && <UpVote />}
      {tx?.status != 'process_no' && <DownVote />}
    </Stack>
  )
}

export default Vote
