import { Button, IconCheck } from '@kalidao/reality'

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const NoVote = ({ onClick }: Props) => {
  return (
    <Button size="small" shape="circle" variant="secondary" tone="red" onClick={onClick}>
      <IconCheck />
    </Button>
  )
}

export default NoVote
