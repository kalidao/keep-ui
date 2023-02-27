import { useState } from 'react'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Dialog } from '@headlessui/react'
import {
  Box,
  Button,
  FieldSet,
  Heading,
  IconClose,
  IconDiscord,
  IconLink,
  IconPencil,
  IconTwitter,
  Input,
  MediaPicker,
  Stack,
  Textarea,
} from '@kalidao/reality'
import { uploadFile } from '~/utils/upload'

import toast from '@design/Toast'
import { dialog, dialogBox, dialogPanel } from '@design/dialog.css'

import { useKeepStore } from './useKeepStore'

const EditProfile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, authToken } = useDynamicContext()
  const keep = useKeepStore((state) => state)

  // form
  const [bio, setBio] = useState('')
  const [twitterUrl, setTwitterUrl] = useState('')
  const [discordUrl, setDiscordUrl] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [loading, setLoading] = useState(false)

  if (!user) return null

  const isSigner = keep.signers.find((signer) => signer.toLowerCase() === user.walletPublicKey?.toLowerCase())

  if (!isSigner) return null

  const uploadAvatar = async (file: File) => {
    if (file) {
      await uploadFile(file)
        .then((url) => {
          setAvatarUrl(url)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_KEEP_API}/keeps/edit_profile?address=${keep.address}&chainId=${keep.chainId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            bio,
            avatar: avatarUrl,
            socials: {
              twitter: twitterUrl,
              discord: discordUrl,
              website: websiteUrl,
            },
          }),
        },
      )

      if (res.ok) {
        toast('success', 'Profile updated!')
        setIsOpen(false)
      } else {
        toast('error', 'Error saving changes!')
      }
      setLoading(false)
    } catch (e) {
      toast('error', 'Error saving changes!')
      setLoading(false)
    }
  }

  return (
    <>
      <Button size="small" shape="circle" variant="transparent" onClick={() => setIsOpen(true)}>
        <IconPencil />
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={dialog}>
        <Dialog.Panel className={dialogPanel}>
          <Box
            as="form"
            onSubmit={save}
            width={{
              xs: 'full',
              lg: '180',
            }}
            className={dialogBox}
          >
            <Dialog.Title>
              <Stack direction={'horizontal'} align="center" justify={'space-between'}>
                <Heading>Edit profile</Heading>
                <Button size="small" variant="secondary" tone="red" shape="circle" onClick={() => setIsOpen(false)}>
                  <IconClose />
                </Button>
              </Stack>
            </Dialog.Title>
            <Dialog.Description>
              <Stack direction={'vertical'} align="flex-start" justify="center">
                <Textarea label="Bio" maxLength={160} onChange={(e) => setBio(e.currentTarget.value)} />
                <MediaPicker
                  name={'avatar'}
                  label="Avatar"
                  compact={true}
                  onChange={async (file: any) => {
                    // convert image file to a url for preview
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onloadend = async () => {
                      console.log('reader', reader)
                      setAvatarUrl(reader.result as string)
                    }
                    await uploadAvatar(file)
                  }}
                />
                <FieldSet legend="Socials">
                  <Input
                    label="Twitter"
                    suffix={<IconTwitter />}
                    hideLabel
                    onChange={(e) => setTwitterUrl(e.currentTarget.value)}
                  />
                  <Input
                    label="Discord"
                    suffix={<IconDiscord />}
                    hideLabel
                    onChange={(e) => setDiscordUrl(e.currentTarget.value)}
                  />
                  <Input
                    label="Website"
                    suffix={<IconLink />}
                    hideLabel
                    onChange={(e) => setWebsiteUrl(e.currentTarget.value)}
                  />
                </FieldSet>
              </Stack>
            </Dialog.Description>
            <Stack direction={'horizontal'} align="center" justify="center">
              <Button width="full" tone="green" type="submit" disabled={loading}>
                Save
              </Button>
            </Stack>
          </Box>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}

export { EditProfile }
