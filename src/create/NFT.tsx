import {
  Box,
  Button,
  Heading,
  Stack,
  IconArrowRight,
  MediaPicker,
  IconMoon,
  IconSun,
  Field,
  Divider,
  Text,
} from '@kalidao/reality'
import Back from './Back'
import * as styles from './create.css'
import { ColorPicker } from '@design/ColorPicker/ColorPicker'
import { useCreateStore } from './useCreateStore'
import { Emblem } from './Emblem'
import { PostIt } from './PostIt'
import { getDominantColor } from '~/utils/getDominantColor'
import { useEffect, useState } from 'react'
import { uploadFile } from '~/utils/upload'

// Opposite color function
const oppColor = (color: string) => {
  // Convert hex to RGB
  const hex = color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  // Determine whether the color is light or dark
  const brightness = Math.round((r * 299 + g * 587 + b * 114) / 1000)
  // Return the opposite color
  return brightness > 125 ? '#000000' : '#ffffff'
}

export const NFT = () => {
  const state = useCreateStore((state) => state)
  const [error, setError] = useState<{
    message: string
  }>()

  const handleSubmit = async (e: any) => {
    state.setView('confirm')
  }

  useEffect(() => {
    state.setInnerTextColor(oppColor(state.bgColor))
  }, [state])

  const uploadAvatar = async (file: File) => {
    if (file) {
      await uploadFile(file)
        .then((url) => {
          state.setAvatar(url)
        })
        .catch((err) => {
          setError({
            message: 'Error uploading file. Please try again.',
          })
        })
    }
  }

  return (
    <Box className={styles.shell} as="form">
      <Stack direction={'horizontal'}>
        <Stack>
          <Stack>
            <Back setView={state.setView} to={'signers'} />
            <Heading level="2">Design Signer Key</Heading>
          </Stack>
          <Divider />
          <Box className={styles.form}>
            {/* avatar picker */}
            <Field label="Upload Avatar for Keep" error={error && error.message}>
              <MediaPicker
                name={'avatar'}
                label="Avatar"
                compact={true}
                onChange={async (file: any) => {
                  console.log('file', file)
                  state.setAvatarFile(file)
                  // convert image file to a url for preview
                  const reader = new FileReader()
                  reader.readAsDataURL(file)
                  reader.onloadend = async () => {
                    console.log('reader', reader)
                    state.setAvatar(reader.result as string)

                    const dominantColor = await getDominantColor(reader.result as string)
                    console.log('dominantColor', dominantColor)
                    state.setBgColor(dominantColor)
                  }
                  await uploadAvatar(file)
                }}
              />
            </Field>
            <Divider />
            <Stack direction={'horizontal'}>
              <Emblem />
              <Stack>
                <Stack direction={'horizontal'} align="center">
                  <Text variant="label">Mode</Text>
                  <Button
                    size="small"
                    type="button"
                    onClick={() => {
                      if (state.borderColor === '#000000') {
                        state.setBorderColor('#ffffff')
                        state.setBorderTextColor('#000000')
                      } else {
                        state.setBorderColor('#000000')
                        state.setBorderTextColor('#ffffff')
                      }
                    }}
                    variant="transparent"
                  >
                    {state.bgColor === '#000000' ? <IconSun /> : <IconMoon />}
                  </Button>
                </Stack>
                <Field label="Background Color">
                  <ColorPicker color={state.bgColor} setColor={state.setBgColor} />
                </Field>
              </Stack>
            </Stack>
            <Button suffix={<IconArrowRight />} width="full" onClick={handleSubmit}>
              Next
            </Button>
          </Box>
        </Stack>
        <Stack>
          <PostIt title="What is a Signer Key?">
            <Text>
              A dynamic NFT representing the right to sign a transaction on <i>{state.name}</i> Keep. The latest
              transaction to sign and other notifications will appear on it.
            </Text>
          </PostIt>
        </Stack>
      </Stack>
    </Box>
  )
}
