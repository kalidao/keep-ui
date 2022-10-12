import { Button, IconArrowLeft } from '@kalidao/reality'

type Props = {
  setView: React.Dispatch<React.SetStateAction<number>>
  to: number
}

const Back = ({ setView, to }: Props) => {
  const navigate = () => {
    setView(to)
  }
  return (
    <Button shape="circle" variant="transparent" size="small" onClick={navigate}>
      <IconArrowLeft />
    </Button>
  )
}

export default Back
