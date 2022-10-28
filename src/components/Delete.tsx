import { Tag } from '@kalidao/reality'
import { NextRouter } from 'next/router'
import { Button, IconClose } from '@kalidao/reality'
import toast, { Toaster } from 'react-hot-toast'

type Props = {
  txHash: string
  router: NextRouter
  chainId: string
  keep: string
}

const Delete = ({ txHash, router, chainId, keep }: Props) => {
  const deleteTx = async () => {
    const res = await fetch(`http://localhost:3000/txs/${txHash}`, {
      method: 'POST',
    }).then((res) => res.json())

    if (res.status() === 200) {
      toast('Transaction deleted!')
      router.push(`/${chainId}/${keep}`)
    }
  }

  return (
    <Button shape="circle" variant="secondary" tone="red" size="small" onClick={deleteTx}>
      <IconClose />
    </Button>
  )
}

export default Delete
