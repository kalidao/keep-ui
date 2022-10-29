import { Button, IconClose } from '@kalidao/reality'

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const CloseButton = ({ onClick }: Props) => {
  return (
    <Button size="small" shape="circle" variant="secondary" tone="red" onClick={onClick}>
      <IconClose />
    </Button>
  )
}

export default CloseButton
