import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    unityId: 0,
    stakingToken: tokens.ryip,
    earningToken: tokens.ryip,
    contractAddress: {
      97: '0x4a1741d6f3ef89266604193c9e53a9f1a46702d2',
      56: '0x9cac01add4c4bD7a1a7E1EaD4cfd8450E4b19b52',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
  },
  
]

export default pools
