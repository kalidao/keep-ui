import { AppTribute } from './AppTribute'
import { SendNFT } from './SendNFT'
import { TxMenu } from './TxMenu'
import { TxStore, useTxStore } from './useTxStore'
import { SendToken } from './SendToken'
import { Box } from '@kalidao/reality'
import * as styles from './styles.css'

export const Toolbox = () => {
  const views: { [key in TxStore['view']]: React.ReactNode } = {
    menu: <TxMenu />,
    send_token: <SendToken />,
    send_nft: <SendNFT />,
    app_tribute: <AppTribute />,
  }

  return <Box className={styles.toolboxRoot}></Box>
}
