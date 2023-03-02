import { Box, Button, Divider, IconRefresh, Stack } from '@kalidao/reality'

import { bodoni } from '../../pages/_app'
import * as styles from './create.css'
import { useCreateStore } from './useCreateStore'

export const Error = () => {
  const state = useCreateStore((state) => state)
  const signers = state.signers.map((signer) => signer.address).sort((a, b) => +a - +b) as `0xstring`[] // TODO: add validation on address
  const body = {
    address: state.address,
    chain: 137,
    blocknumber: 0,
    name: state.name,
    signers: signers,
    threshold: state.threshold,
    avatar: state.avatar,
    templateId: 'signer',
    bio: state.bio,
    params: {
      borderColor: state.borderColor,
      borderTextColor: state.borderTextColor,
      bgColor: state.bgColor,
      innerTextColor: state.innerTextColor,
    },
    socials: {
      twitter: state.twitter,
      discord: state.discord,
      website: state.website,
    },
  }


  return (
    <Box className={styles.shell}>
      <Stack direction={'horizontal'}>
        <Stack>
          <Stack direction={'horizontal'} align={'center'} justify="center">
            <Box
              fontSize="headingOne"
              color="text"
              style={{
                ...bodoni.style,
                fontStyle: 'italic',
              }}
            >
              {state.loadingMessage}
            </Box>
          </Stack>
          <Divider />
          <Box className={styles.form}>
            <Stack direction={'horizontal'} align="center" justify="center">
              <Button
                as="a"
                href="/create"
                size="large"
                variant="transparent"
                onClick={() => {
                  fetch(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/setup`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                  })
                }}
                prefix={<IconRefresh />}
              >
                Try again
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}
