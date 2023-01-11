import {
  Box,
  Button,
  Heading,
  Stack,
  IconArrowRight,
  Input,
  MediaPicker,
  IconMoon,
  IconSun,
  Field,
} from '@kalidao/reality'
import Back from './Back'
import { CreateProps } from './types'
import * as styles from './create.css'
import { useQuery } from '@tanstack/react-query'
import { ColorPicker } from '@design/ColorPicker/ColorPicker'
import { useCreateStore } from './useCreateStore'
import { Emblem } from './Emblem'

export const NFT = ({ store, setStore, setView }: CreateProps) => {
  const state = useCreateStore((state) => state)
  const { data } = useQuery(['daoAvatar', state.name, state.threshold, state.bio, state.avatar], async () => {
    // fetch image from api
    // create url format from store.bio string
    const bio = store.bio.replace(/\s/g, '%20')
    const url = `https://api.kali.gg/image/core?name=${store.name}&title=SIGNERS&threshold=${store.threshold}&txs=0&bio=${bio}&avatar=${avatar}`
    const image = await fetch(url).then((res) => res.text())

    console.log('url', url)

    const element = document.getElementById('svgAvatar')
    if (element) {
      element.innerHTML = image
    }
    console.log('image', image)

    return image
  })

  // TODO: Name needs to be unique per chain. Add check.
  return (
    <Box className={styles.container} as="form">
      <Back setView={setView} to={2} />
      <Stack direction={'horizontal'}>
        <Emblem />
        <Stack>
          <Heading>Design Signer Key</Heading>
          {
            /* background color picker */
            // accent color picker
          }

          {/* black and white mode picker */}
          <Button
            shape="circle"
            size="small"
            type="button"
            onClick={() => {
              if (state.bgColor === '#000000') {
                state.setBgColor('#ffffff')
                state.setTextColor('#000000')
              } else {
                state.setBgColor('#000000')
                state.setTextColor('#ffffff')
              }
            }}
            variant="transparent"
          >
            {state.bgColor == '#000000' ? <IconMoon /> : <IconSun />}
          </Button>
          <Field label="Accent">
            <ColorPicker color={state.accentColor} setColor={state.setAccentColor} />
          </Field>
        </Stack>
      </Stack>
      {/* avatar picker */}
      <MediaPicker label="Avatar" compact={true} />
      <Button suffix={<IconArrowRight />} width="full" type="submit">
        Next
      </Button>
    </Box>
  )
}
