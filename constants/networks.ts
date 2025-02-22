export const ACTIVE_NETWORKS = {
  mainnet: {
    chihuahua: 'chihuahua-1',
    comdex: 'comdex-1',
    injective: 'injective-1',
    juno: 'juno-1',
    migaloo: 'migaloo-1',
    terra: 'phoenix-1',
    sei: 'pacific-1',
    'terra-classic': 'columbus-5',
  },
  testnet: {
    comdex: 'comdex-test2',
    injective: 'injective-888',
    juno: 'uni-6',
    narwhal: 'narwhal-1',
    terra: 'pisco-1',
    sei: 'atlantic-1',
    'terra-classic': 'rebel-2',
  },
}

export const ACTIVE_NETWORKS_WALLET_NAMES = {
  mainnet: [
    'chihuahua',
    'comdex',
    'injective',
    'juno',
    'migaloo',
    'terra2',
    'sei',
    'terra'],
  testnet: [
    'injectivetestnet',
    'junotestnet',
    'migalootestnet',
    'terra2testnet',
    'seitestnet',
  ],
}

export const WALLET_CHAIN_NAMES_BY_CHAIN_ID = {
  'chihuahua-1': 'chihuahua',
  'comdex-1': 'comdex',
  'injective-1': 'injective',
  'juno-1': 'juno',
  'migaloo-1': 'migaloo',
  'phoenix-1': 'terra2',
  'pacific-1': 'sei',
  'columbus-5': 'terra',
  'comdex-test2': 'comdex',
  'injective-888': 'injectivetestnet',
  'uni-6': 'junotestnet',
  'narwhal-1': 'migalootestnet',
  'pisco-1': 'terra2testnet',
  'atlantic-1': 'seitestnet',
  'rebel-2': 'terra',
}

export const ACTIVE_BONDING_NETWORKS = [
  'chihuahua-1',
  'juno-1',
  'migaloo-1',
  'narwhal-1',
  'phoenix-1',
  'pacific-1',
  'columbus-5',
]
export const ACTIVE_INCENTIVE_NETWORKS = [
  'chihuahua-1',
  'juno-1',
  'migaloo-1',
  'narwhal-1',
  'phoenix-1',
  'pacific-1',
  'columbus-5',
]

export const MAINNET_TESTNET_CHAIN_ID_MAP = {
  'migaloo-1': 'narwhal-1',
  'narwhal-1': 'migaloo-1',
  'phoenix-1': 'pisco-1',
  'pisco-1': 'phoenix-1',
  'pacific-1': 'sei-devnet-1',
  'columbus-5': 'rebel-2',
}

export const WALLET_CHAIN_NAME_MAINNET_TESTNET_MAP = {
  migaloo: 'migalootestnet',
  migalootestnet: 'migaloo',
  terra2: 'terra2testnet',
  terra2testnet: 'terra2',
  sei: 'seitestnet',
  seitestnet: 'sei',
  juno: 'junotestnet',
  junotestnet: 'juno',
  terra: 'terra',
  injective: 'injectivetestnet',
  injectivetestnet: 'injective',
}

export const NETWORK_MAP = {
  mainnet: 'testnet',
  testnet: 'mainnet',
}

export enum ChainId { terrac = 'columbus-5', terra = 'phoenix-1', migaloo= 'migaloo-1', juno= 'juno-1', sei= 'pacific-1', comdex= 'comdex-1', injective= 'injective-1', chihuahua= 'chihuahua-1', narwhal= 'narwhal-1', pisco= 'pisco-1' }
