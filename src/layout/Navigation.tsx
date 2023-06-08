import Link from 'next/link'
import { useRouter } from 'next/router'

import { Box, IconLightningBolt, IconPlus, IconUserGroupSolid } from '@kalidao/reality'
import { Propose } from '~/propose/Propose'
import DeployDao from '~/deploy-dao'

import { UserMenu } from '~/components/user-menu'

import * as styles from './layout.css'

const Navigation = () => {
  const router = useRouter()
  const { chainId, keep } = router.query

  let isPropose
  if (chainId && keep) {
    isPropose = true
  } else {
    isPropose = false
  }
  return (
    <Box className={styles.leftbar}>
      <Box
        width="full"
        paddingTop={{
          xs: '0',
          lg: '10',
        }}
        paddingX={{
          xs: '10',
          lg: '0',
        }}
        gap="10"
        display="flex"
        flexDirection={{
          xs: 'row',
          lg: 'column',
        }}
        alignItems="flex-start"
        justifyContent={'flex-start'}
      >
        <NavItem link={`/dashboard`} icon={<IconLightningBolt />}>
          Activity
        </NavItem>
        <NavItem link={`/dashboard/communities`} icon={<IconUserGroupSolid />}>
          Communities
        </NavItem>
        <NavItem link={`/create`} icon={<IconPlus />}>
          Create
        </NavItem>
        {isPropose ? <Propose /> : null}
        <DeployDao/>
      </Box>
      <UserMenu />
    </Box>
  )
}

export const NavItem = ({
  icon,
  children,
  link,
}: {
  icon: React.ReactNode
  children: React.ReactNode
  link: string
}) => {
  return (
    <Link href={link} className={styles.nav}>
      <>
        <Box color="text" className={styles.navSVG}>
          {icon}
        </Box>
        <Box className={styles.navText}>{children}</Box>
      </>
    </Link>
  )
}

export { Navigation }
