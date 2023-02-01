import { Skeleton, Stack, Text } from '@kalidao/reality'
import { ProgressBar } from 'react-step-progress-bar'
import { Sig } from '~/dashboard/types'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useTxStore } from '~/dashboard/useTxStore'

export const VoteProgress = () => {
  const tx = useTxStore((state) => state)
  const keep = useKeepStore((state) => state)

  if (keep.threshold === undefined) return <Skeleton height={'96'} width="full" />

  const yesSigs = tx?.sigs?.filter((sig: Sig) => sig.type === 'yes')
  const noSigs = tx?.sigs?.filter((sig: Sig) => sig.type === 'no')

  const yesPercentage = tx && (yesSigs?.length / Number(keep.threshold)) * 100
  const noPercentage = tx && (noSigs?.length / Number(keep.threshold)) * 100

  return (
    <>
      <ProgressBar
        percent={yesPercentage}
        filledBackground="linear-gradient(to right, rgb(48, 209, 88), rgb(52, 199, 89))"
      />

      <Stack direction={'horizontal'} align="center" justify={'space-between'}>
        <Text weight="semiBold">Yes</Text>
        <Text weight="semiBold">
          {yesSigs?.length}/{keep?.threshold}
        </Text>
      </Stack>
      <ProgressBar
        percent={noPercentage}
        filledBackground="linear-gradient(to right, rgb(255, 69, 58), rgb(255, 59, 48))"
      />
      <Stack direction={'horizontal'} align="center" justify={'space-between'}>
        <Text weight="semiBold">No</Text>
        <Text weight="semiBold">
          {noSigs?.length}/{keep?.threshold}
        </Text>
      </Stack>
    </>
  )
}
