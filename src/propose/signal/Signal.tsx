import { useRouter } from 'next/router'
import { Card, Stack, Input, Textarea, Button, IconArrowLeft } from '@kalidao/reality'

type Props = {
  setView: React.Dispatch<React.SetStateAction<string>>
}

const Signal = ({ setView }: Props) => {
  const router = useRouter()
  const { chainId, keep } = router.query

  // TODO: Signal for Guilds
  return (
    <Card padding="6" width="3/4">
      <Stack direction={'horizontal'}>
        <Link href={`/${chainId}/${keep}`} passHref>
          <Button shape="circle" variant="tertiary" size="small" as="a">
            <IconArrowLeft />
          </Button>
        </Link>
        <Stack>
          <Card padding="6" width="full">
            <Input label="Title" description="It is a required." placeholder="I am a title of sorts." />
            <Textarea
              label="Description"
              description="You can use this field for context."
              placeholder="I am a signaling silly lil things for my silly lil community."
            />
            <Button disabled={true}>Submit</Button>
          </Card>
        </Stack>
      </Stack>
    </Card>
  )
}

export default Signal
