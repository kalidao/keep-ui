// use forwardRef to access the input element
// wrap the input and nft image in a label
// use the onChange event to set the selected nft
// strongly type
import { forwardRef } from 'react'

import { Avatar, IconCheck, Stack, Text } from '@kalidao/reality'

import * as styles from './styles.css'

interface RadioNFTProps {
  image: string
  label: string
  address: string
  tokenId: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const RadioNFT = forwardRef<HTMLInputElement, RadioNFTProps>(
  ({ image, address, tokenId, checked, label, onChange, ...props }, ref) => {
    return (
      <label className={styles.root}>
        <input
          type="radio"
          value={address + '-token-' + tokenId}
          onChange={onChange}
          checked={checked}
          style={{
            appearance: 'none',
          }}
          ref={ref}
          {...props}
          className={styles.radio}
        />
        <Avatar src={image} label={label} shape="square" size="40" />
        <Stack direction={'horizontal'} align="center" justify={'flex-start'}>
          <Text>{label}</Text>
          {checked ? <IconCheck color="green" /> : null}
        </Stack>
      </label>
    )
  },
)
