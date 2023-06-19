import { useEffect } from 'react';
import { Box, Divider, Input } from '@kalidao/reality';
import { useFormContext } from 'react-hook-form';
import { useSendStore } from '~/propose/tx/useSendStore';
import { MintTokenProps } from '~/propose/types';
import { isAddressOrEns } from '~/utils/ens';

export const MintToken = () => {
  const mint_token = useSendStore((state) => state.mint_token);
  const setMintToken = useSendStore((state) => state.setMintToken);

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