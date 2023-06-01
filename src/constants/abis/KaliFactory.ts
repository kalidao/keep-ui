export const KALI_FACTORY_ABI = [
  {
    inputs: [{ internalType: 'address', name: '_kaliTemplate', type: 'address' }],
    stateMutability: 'payable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'contract Kali', name: 'kali', type: 'address' },
      { indexed: false, internalType: 'contract KeepTokenManager', name: 'token', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { indexed: false, internalType: 'bytes32', name: 'name', type: 'bytes32' },
      {
        components: [
          { internalType: 'enum Operation', name: 'op', type: 'uint8' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        indexed: false,
        internalType: 'struct Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
      { indexed: false, internalType: 'string', name: 'daoURI', type: 'string' },
      { indexed: false, internalType: 'uint120[4]', name: 'govSettings', type: 'uint120[4]' },
    ],
    name: 'Deployed',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'contract KeepTokenManager', name: '_token', type: 'address' },
      { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
      { internalType: 'bytes32', name: '_name', type: 'bytes32' },
      {
        components: [
          { internalType: 'enum Operation', name: 'op', type: 'uint8' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct Call[]',
        name: '_calls',
        type: 'tuple[]',
      },
      { internalType: 'string', name: '_daoURI', type: 'string' },
      { internalType: 'uint120[4]', name: '_govSettings', type: 'uint120[4]' },
    ],
    name: 'deployKali',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract KeepTokenManager', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'bytes32', name: 'name', type: 'bytes32' },
    ],
    name: 'determineKali',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes[]', name: 'data', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ internalType: 'bytes[]', name: '', type: 'bytes[]' }],
    stateMutability: 'payable',
    type: 'function',
  },
]
