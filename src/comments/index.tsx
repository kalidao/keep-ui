import { Box, Spinner, Text } from '@kalidao/reality'
import { useGetParams } from '~/dashboard/hooks/useGetParams'
import { useGetComments } from '~/hooks/useGetComments'

import { CreateComment } from './CreateComment'
import { RenderComment } from './RenderComment'
import { CommentHome } from './types'

export default function Comments({}) {
  const { signalId, txHash } = useGetParams()
  const { data, isLoading, isError, refetch } = useGetComments(signalId?.toString(), txHash?.toString())

  let home = CommentHome.Signal
  if (signalId) {
    home = CommentHome.Signal
  }
  if (txHash) {
    home = CommentHome.Tx
  }

  let comments = null
  if (isLoading) {
    comments = <Spinner />
  }
  if (isError) {
    comments = <Text>Something went wrong</Text>
  }
  if (data && !isError) {
    console.log('data', data)
    comments = data?.map((comment: any) => (
      <RenderComment key={comment.id} home={home} comment={comment} callback={refetch} />
    ))
  }

  return (
    <Box as="section" aria-label="Comments" display="flex" marginTop="2" flexDirection={'column'} gap="5">
      <CreateComment home={home} signalId={signalId as string} txId={txHash as string} refetch={refetch} />
      <Box display={'flex'} flexDirection="column" gap="1">
        {comments}
      </Box>
    </Box>
  )
}
