import { Avatar, Button, Box, IconPlus, Spinner, Stack } from '@kalidao/reality'
import { fetcher } from '~/utils'
import { useQuery } from '@tanstack/react-query'
import { useDynamicContext } from '@dynamic-labs/sdk-react'
import Link from 'next/link'
import Image from 'next/image'
import Tooltip from '~/components/Tooltip'

export const Sidebar = () => {
  const { user } = useDynamicContext()
  const { data: keeps, isLoading } = useQuery(
    ['userKeeps', user?.walletPublicKey],
    async () => {
      const data = await fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps?signer=${user?.walletPublicKey}`)
      return data
    },
    {
      enabled: !!user,
    },
  )

  if (!user) {
    return null
  }

  return (
    <Box
      position={'absolute'}
      display="flex"
      flexDirection={'column'}
      alignItems="center"
      justifyContent={'space-between'}
      backgroundColor={'backgroundSecondary'}
      minHeight="viewHeight"
      paddingTop="5"
      borderColor={'backgroundTertiary'}
      borderRightWidth="1"
      width="fit"
      paddingRight="3"
    >
      <Link href="/create">
        <Image alt="brand logo and back button" src="/favicon-32x32.png" height="25" width="25" />
      </Link>
      {isLoading && <Spinner />}
      <Stack>
        {keeps &&
          keeps.map((keep: any) => {
            console.log('keep', `/${keep.chainId}/${keep.address}`)
            return (
              <Link href={`/${keep.chainId}/${keep.address}`}>
                <Tooltip label={keep.name} key={keep.address + keep.chainId}>
                  <Avatar size="13" label={`${keep.name} link`} src={keep.avatar} />
                </Tooltip>
              </Link>
            )
          })}
        <Button shape="circle" tone="green" variant="secondary">
          <IconPlus />
        </Button>
      </Stack>
    </Box>
  )
}
