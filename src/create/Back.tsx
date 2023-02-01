import { Button, IconArrowLeft } from '@kalidao/reality'

import { CreateStore } from './useCreateStore'

type Props = {
  setView: (view: CreateStore['view']) => void
  to: CreateStore['view']
}

const Back = ({ setView, to }: Props) => {
  const navigate = () => {
    setView(to)
  }

  return (
    <Button type="button" shape="circle" variant="transparent" size="small" onClick={navigate}>
      <IconArrowLeft />
    </Button>
  )
}

export default Back
