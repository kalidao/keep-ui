import Link from 'next/link'
import { useRouter } from 'next/router'

import { Box, IconLightningBolt, IconPlus, IconUserGroupSolid } from '@kalidao/reality'
import { useKeepStore } from '~/dashboard/useKeepStore'

import { UserMenu } from '~/components/UserMenu'

import * as styles from './layout.css'

const Navigation = () => {
  const state = useKeepStore((state) => state)

  let isPropose = false
  if (Number.isNaN(state.chainId) && state.address != undefined) {
    isPropose = true
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
        {isPropose ? (
          <Link className={styles.navCTA} href={`/${state.chainId}/${state.address}/create`}>
            <>
              <IconPlus className={styles.navSVG} />
              <Box className={styles.navText}>Propose</Box>
            </>
          </Link>
        ) : null}
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
        <Box className={styles.navSVG}>{icon}</Box>
        <Box className={styles.navText}>{children}</Box>
      </>
    </Link>
  )
}

export { Navigation }
