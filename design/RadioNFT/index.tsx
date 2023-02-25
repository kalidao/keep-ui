import { forwardRef } from 'react'

import { Avatar, Box, IconCheck, Stack, Text } from '@kalidao/reality'

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
    const value = address + '-token-' + tokenId
    console.log('token', address, tokenId, checked)
    return (
      <Box as="label" className={styles.root}>
        <Text weight="semiBold" align="center">
          {label}
        </Text>
        <Box
          as="input"
          type="checkbox"
          value={value}
          onChange={onChange}
          checked={checked}
          style={{
            // remove default style
            appearance: 'none',
            all: 'unset',
            position: 'absolute',
            height: 0,
            width: 0,
          }}
          ref={ref}
          {...props}
          className={styles.radio}
        />
        <Avatar src={image} label={label} shape="square" size="40" />
        <Box width="full" display="flex" alignItems={'center'} justifyContent="space-between">
          <Text font="mono">#{tokenId}</Text>
          {checked ? <IconCheck color="green" className={styles.checkmark} /> : null}
        </Box>
      </Box>
    )
  },
)
