import type { NextPage } from 'next'
import { Stack } from '@kalidao/reality'
import Layout from '~/layout'
import { fetcher } from '~/utils'
import { useQuery } from '@tanstack/react-query'
import { KeepCard } from '~/components/'

const Explore: NextPage = () => {
  const { data: keeps } = useQuery(['allKeeps'], () => fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/all`))

  return (
    <Layout title={'Home'} content={'Create a Keep'}>
      <Stack direction={'horizontal'} wrap>
        {keeps &&
          keeps.map((keep: any) => {
            return (
              <KeepCard
                key={keep?.address + keep?.chainId}
                name={keep?.name}
                avatar={keep?.avatar}
                chainId={keep?.chainId}
                keep={keep?.address}
                bio={keep?.bio}
              />
            )
          })}
      </Stack>
    </Layout>
  )
}

export default Explore
