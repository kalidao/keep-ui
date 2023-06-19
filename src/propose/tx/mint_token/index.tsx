import { useEffect, useState } from 'react';
import { Box, Divider, Input, Alert } from '@kalidao/reality';
import { useFormContext } from 'react-hook-form';
import { useSendStore } from '~/propose/tx/useSendStore';
import { MintTokenProps } from '~/propose/types';
import { isAddressOrEns } from '~/utils/ens';

const idWarnings = {
  '1816876358': 'This is the Signer Key. Please proceed with caution.',
  '3104532979': 'This is the Relay Key. Please proceed with caution.',
  '288790985': 'This is the MultiRelay Key. Please proceed with caution.',
  '1930507241': 'This is the Mint Key. Please proceed with caution.',
  '4294837299': 'This is the Burn Key. Please proceed with caution.',
  '106236017': 'This is the Quorum Key. Please proceed with caution.',
  '1521609684': 'This is the Transferability Key. Please proceed with caution.',
  '2617606769': 'This is the Permission Key. Please proceed with caution.',
  '4240432350': 'This is the User Permission Key. Please proceed with caution.',
  '3340393313': 'This is the URI Key. Please proceed with caution.',
};

export const MintToken = () => {
  const mint_token = useSendStore((state) => state.mint_token);
  const setMintToken = useSendStore((state) => state.setMintToken);
  const [warning, setWarning] = useState('');

  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<MintTokenProps>();

  const [watchedId, watchedAmount, watchedAddress] = watch(['id', 'amount', 'address']);

  useEffect(() => {
    if (watchedId !== undefined &&
        watchedAmount !== undefined &&
        watchedAddress !== undefined) {
      setMintToken({
        id: watchedId,
        amount: watchedAmount,
        address: watchedAddress as `0xstring`,
      });
      setWarning(idWarnings[watchedId] || '');
    }
  }, [watchedId, watchedAmount, watchedAddress, setMintToken]);

  return (
    <Box display={'flex'} flexDirection="column" gap="2">
      <Input
        label={`ID`}
        placeholder="ID"
        type="number"
        defaultValue={mint_token.id}
        {...register('id', { valueAsNumber: true })}
      />
      {warning && <Alert severity="warning">{warning}</Alert>}
      <Input
        label={`Amount`}
        placeholder="Amount"
        type="number"
        defaultValue={mint_token.amount}
        {...register('amount', { valueAsNumber: true })}
      />
      <Divider />
      <Input
        label={`To Address`}
        placeholder="0x or ENS"
        type="text"
        defaultValue={mint_token.address}
        {...register('address', {
          validate: (value) =>
            (value ? isAddressOrEns(value) : false) ||
            'Not a valid address or ENS.',
        })}
        error={errors?.address && <>{errors?.address?.message}</>}
      />
    </Box>
  );
};