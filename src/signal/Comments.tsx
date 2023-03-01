import { useState } from 'react'

import { useRouter } from 'next/router'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Box, Button, Card, IconCheck, IconClose, IconPencil, Spinner, Stack, Text } from '@kalidao/reality'
import { JSONContent } from '@tiptap/react'
import { useGetSignalComments } from '~/hooks/useGetSignalComments'
import { prettyDate } from '~/utils'

import { JSONContentRenderer } from '~/components/Editor/JSONContent'
import { User } from '~/components/User'

import { IconChat } from '@design/IconChat'
import toast from '@design/Toast'

import { Comment } from './Comment'
import { EditComment } from './EditComment'
import { signalCommentVote } from './utils'

const Comments = () => {
  const { signalId } = useRouter().query
  const { data, isError, isLoading, refetch } = useGetSignalComments(signalId as string)

  let comments = null
  if (isLoading) {
    comments = <Spinner />
  }
  if (isError) {
    comments = <Text>Something went wrong</Text>
  }
  if (data) {
    console.log('comments', data)
    comments = data?.map((comment: any) => <RenderComment key={comment.id} comment={comment} callback={refetch} />)
  }

  return (
    <Box as="section" aria-label="Comments" display="flex" flexDirection={'column'} gap="5">
      <Comment signalId={signalId as string} refetch={refetch} />
      <Box display={'flex'} flexDirection="column" gap="1">
        {comments}
      </Box>
    </Box>
  )
}

const RenderComment = ({ comment, callback }: { comment: any; callback: any }) => {
  const { data, isLoading, isError } = useGetSignalComments(comment.signalId, comment.id)
  const [reply, setReply] = useState(false)
  const [showChildren, setShowChildren] = useState<any>(false)
  const [edit, setEdit] = useState(false)

  let children = null
  let replies = 0
  if (comment.parentId) {
    children = data?.children?.map((child: any) => <RenderComment key={child.id} comment={child} callback={callback} />)
    replies = data?.children?.length
  } else {
    children = comment?.children?.map((child: any) => (
      <RenderComment key={child.id} comment={child} callback={callback} />
    ))
    replies = comment?.children?.length
  }

  return (
    <Card padding="3">
      <Stack>
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <User address={comment.userId} size="lg" />
          <Button shape="circle" variant="transparent" size="small" onClick={() => setEdit(!edit)}>
            <IconPencil />
          </Button>
        </Stack>
        {edit ? (
          <EditComment
            comment={comment}
            callback={() => {
              callback?.().then(() => {
                setEdit(false)
              })
            }}
          />
        ) : (
          <JSONContentRenderer content={comment.content} />
        )}
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <Stack direction={'horizontal'} align="center" justify={'flex-start'}>
            <SignalCommentVote signalId={comment.signalId} commentId={comment.id} callback={callback} type={true} />
            <SignalCommentVote signalId={comment.signalId} commentId={comment.id} callback={callback} type={false} />
            <Button size="small" variant="secondary" onClick={() => setReply(!reply)} prefix={<IconChat />}>
              Reply
            </Button>
            <Text color="textSecondary">🕓 {prettyDate(comment.updatedAt)}</Text>
          </Stack>
          {replies > 0 ? (
            <Box color="textSecondary" as="button" onClick={() => setShowChildren(!showChildren)}>
              {showChildren
                ? `Hide ${replies} ${replies > 1 ? 'replies' : 'reply'}`
                : `Show ${replies} more ${replies > 1 ? 'replies' : 'reply'}`}
            </Box>
          ) : null}
        </Stack>
        {reply && (
          <Comment
            signalId={comment.signalId}
            parentId={comment.id}
            refetch={() => {
              callback?.()
              setReply(false)
            }}
          />
        )}
        {showChildren && children}
      </Stack>
    </Card>
  )
}

const SignalCommentVote = ({
  signalId,
  commentId,
  callback,
  type,
}: {
  signalId: string
  commentId: string
  callback: any
  type: boolean
}) => {
  const { user, authToken } = useDynamicContext()
  const { data, isLoading, isError } = useGetSignalComments(signalId, commentId)
  const [loading, setLoading] = useState(false)
  const vote = async () => {
    setLoading(true)
    if (!authToken) {
      toast('error', `Please connect and sign with wallet to vote!`)
      return
    }
    const response = await signalCommentVote(signalId, commentId, type, authToken)
      .then(() => callback?.())
      .then(() => setLoading(false))
  }

  let isVoted = false
  if (data) {
    const typeEnum = type ? 'yes' : 'no'
    isVoted =
      data?.votes?.find((vote: any) => {
        console.log('vote.userId', vote.userId, user?.walletPublicKey?.toLowerCase())
        return vote.userId === user?.walletPublicKey?.toLowerCase()
      })?.type === typeEnum
  }

  return (
    <Button
      disabled={isVoted || loading}
      shape="circle"
      size="small"
      variant="secondary"
      tone={type ? 'green' : 'red'}
      onClick={vote}
    >
      {type ? <IconCheck /> : <IconClose />}
    </Button>
  )
}

export { Comments }
