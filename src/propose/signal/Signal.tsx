import { useRouter } from 'next/router'
import { Card, Stack, Input, Textarea, Button, IconArrowLeft } from '@kalidao/reality'
import { useAccount } from 'wagmi'
import { useQuery } from 'wagmi'
import { fetcher } from '~/utils'

type Props = {
  setView: React.Dispatch<React.SetStateAction<string>>
}

const Signal = ({ setView }: Props) => {
  // TODO: Signal for Guilds
  return (
    <Card padding="6" width="3/4">
      <Stack direction={'horizontal'}>
        <Button shape="circle" variant="tertiary" size="small" onClick={() => setView('preview')}>
          <IconArrowLeft />
        </Button>
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
