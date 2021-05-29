import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'RYIP',
    lpAddresses: {
      97: '0x2c55e8c196eB9F7da49bffe6514863E2709e295A',
      56: '0x0A9Ed1ad9D99bc01b163E9038556fE60ec2151ec',
    },
    token: tokens.unity,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'RYIP-BNB LP',
    lpAddresses: {
      97: '0x0cF1D2E4cdc1F2c1DF7dc2A92ffcDa6212682d7E',
      56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
    },
    token: tokens.ryip,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
]

export default farms
