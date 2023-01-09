export const TRIBUTE_ROUTER_ABI = [
  {
    inputs: [],
    stateMutability: 'payable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'AlreadyReleased',
    type: 'error',
  },
  {
    inputs: [],
    name: 'DeadlinePending',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidETHTribute',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidSig',
    type: 'error',
  },
  {
    inputs: [],
    name: 'Reentrancy',
    type: 'error',
  },
  {
    inputs: [],
    name: 'Unauthorized',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'DataReceived',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'enum Standard',
        name: 'std',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint88',
        name: 'tokenId',
        type: 'uint88',
      },
      {
        indexed: false,
        internalType: 'uint112',
        name: 'amount',
        type: 'uint112',
      },
      {
        indexed: false,
        internalType: 'uint96',
        name: 'forId',
        type: 'uint96',
      },
      {
        indexed: false,
        internalType: 'uint112',
        name: 'forAmount',
        type: 'uint112',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'deadline',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'description',
        type: 'bytes32',
      },
    ],
    name: 'TributeMade',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approve',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'description',
        type: 'bytes32',
      },
    ],
    name: 'TributeReleased',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'count',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
      {
        internalType: 'enum Standard',
        name: 'std',
        type: 'uint8',
      },
      {
        internalType: 'uint88',
        name: 'tokenId',
        type: 'uint88',
      },
      {
        internalType: 'uint112',
        name: 'amount',
        type: 'uint112',
      },
      {
        internalType: 'uint96',
        name: 'forId',
        type: 'uint96',
      },
      {
        internalType: 'uint112',
        name: 'forAmount',
        type: 'uint112',
      },
      {
        internalType: 'uint32',
        name: 'deadline',
        type: 'uint32',
      },
      {
        internalType: 'bytes32',
        name: 'description',
        type: 'bytes32',
      },
    ],
    name: 'makeTribute',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
      {
        internalType: 'enum Standard',
        name: 'std',
        type: 'uint8',
      },
      {
        internalType: 'uint88',
        name: 'tokenId',
        type: 'uint88',
      },
      {
        internalType: 'uint112',
        name: 'amount',
        type: 'uint112',
      },
      {
        internalType: 'uint96',
        name: 'forId',
        type: 'uint96',
      },
      {
        internalType: 'uint112',
        name: 'forAmount',
        type: 'uint112',
      },
      {
        internalType: 'uint32',
        name: 'deadline',
        type: 'uint32',
      },
      {
        internalType: 'bytes32',
        name: 'description',
        type: 'bytes32',
      },
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32',
      },
    ],
    name: 'makeTributeBySig',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: 'data',
        type: 'bytes[]',
      },
    ],
    name: 'multicall',
    outputs: [
      {
        internalType: 'bytes[]',
        name: 'results',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'nonces',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'onERC1155Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'approve',
        type: 'bool',
      },
      {
        internalType: 'bytes32',
        name: 'description',
        type: 'bytes32',
      },
    ],
    name: 'releaseTribute',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'approve',
        type: 'bool',
      },
      {
        internalType: 'bytes32',
        name: 'description',
        type: 'bytes32',
      },
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32',
      },
    ],
    name: 'releaseTributeBySig',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract Permit',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32',
      },
    ],
    name: 'selfPermit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract Permit',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32',
      },
    ],
    name: 'selfPermit1155',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract Permit',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'sig',
        type: 'bytes',
      },
    ],
    name: 'selfPermit721',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract Permit',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32',
      },
    ],
    name: 'selfPermit721',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract Permit',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32',
      },
    ],
    name: 'selfPermitAllowed',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'tributes',
    outputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint96',
        name: 'forId',
        type: 'uint96',
      },
      {
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
      {
        internalType: 'enum Standard',
        name: 'std',
        type: 'uint8',
      },
      {
        internalType: 'uint88',
        name: 'tokenId',
        type: 'uint88',
      },
      {
        internalType: 'uint112',
        name: 'amount',
        type: 'uint112',
      },
      {
        internalType: 'uint112',
        name: 'forAmount',
        type: 'uint112',
      },
      {
        internalType: 'uint32',
        name: 'deadline',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'description',
        type: 'bytes32',
      },
    ],
    name: 'withdrawTribute',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'description',
        type: 'bytes32',
      },
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32',
      },
    ],
    name: 'withdrawTributeBySig',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
] as const
