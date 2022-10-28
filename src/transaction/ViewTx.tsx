import { Stack, Heading, Text, Button, Card } from '@kalidao/reality'
import { useSignMessage } from 'wagmi'

const ViewTx = ({ tx }: { tx: any }) => {
  const { data, isError, isLoading, isSuccess, signMessageAsync } = useSignMessage({
    message: tx?.txHash,
  })
  const sign = async () => {
    const sign = await signMessageAsync()
    console.log('sign', sign)
    const res = await fetch(
      `http://localhost:3000/transactions/${tx?.keepChainId}/${tx?.keepAddress}/${tx?.txHash}/sign`,
      {
        method: 'POST',
        body: JSON.stringify({
          sign: sign,
        }),
      },
    )
    console.log('post', res)
  }
  console.log('tx', tx)
  return (
    <Stack>
      <Heading>{tx?.post?.title}</Heading>
      <Text>{tx?.post?.description}</Text>
      <Card padding="10">
        <Text>Type: {tx?.op}</Text>
        <Text>Type: {tx?.nonce}</Text>
        <Text>To: {tx?.to}</Text>
        <Text>Value: {tx?.value}</Text>
        <Text>Data: {tx?.data}</Text>
      </Card>
      <Button onClick={sign}>Sign</Button>
    </Stack>
  )
}

export default ViewTx
