import { Box } from '@kalidao/reality'
import { useKeepStore } from '~/dashboard/useKeepStore'
import { useTxStore } from '~/dashboard/useTxStore'
import { getExplorerLink } from '~/utils/getExplorerLink'
import { timestampToTimepassed } from '~/utils/prettyDate'

import * as styles from './styles.css'

export const Result = () => {
  const tx = useTxStore((state) => state)
  const keep = useKeepStore((state) => state)

  return (
    <>
      {tx?.executedOn && (
        <Box
          as="a"
          href={getExplorerLink(tx?.executionHash as string, 'tx', keep?.chainId ?? 1)}
          target="_blank"
          rel="noopenner noreferrer"
          color="text"
          style={{
            fontStyle: 'italic',
          }}
          className={styles.executedTxLink}
        >
          Executed {timestampToTimepassed(tx?.executedOn)}
          {' ago.'}
        </Box>
      )}
    </>
  )
}
