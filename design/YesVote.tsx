import { Button, IconCheck } from '@kalidao/reality'

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const YesVote = ({ onClick }: Props) => {
  return (
    <Button size="small" shape="circle" variant="secondary" tone="green" onClick={onClick}>
      <IconCheck />
    </Button>
  )
}

export default YesVote
