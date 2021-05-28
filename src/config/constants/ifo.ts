import tokens from './tokens'
import farms from './farms'
import { Ifo, Token } from './types'

const ryipBnbLpToken: Token = {
  symbol: farms[1].lpSymbol,
  address: farms[1].lpAddresses,
  decimals: 18,
}

const ifos: Ifo[] = [
  {
    id: 'horizon',
    address: '0x6137B571f7F1E44839ae10310a08be86D1A4D03B',
    isActive: true,
    name: 'Horizon Protocol (HZN)',
    poolBasic: {
      saleAmount: '3,000,000 HZN',
      raiseAmount: '$750,000',
      ryipToBurn: '$375,000',
      distributionRatio: 0.3,
    },
    poolUnlimited: {
      saleAmount: '7,000,000 HZN',
      raiseAmount: '$1,750,000',
      ryipToBurn: '$875,000',
      distributionRatio: 0.7,
    },
    currency: ryipBnbLpToken,
    token: tokens.hzn,
    releaseBlockNumber: 6581111,
    campaignId: '511090000',
    articleUrl: 'https://unityswap.medium.com/horizon-protocol-hzn-ifo-to-be-hosted-on-unityswap-51f79601c9d8',
    tokenOfferingPrice: 0.25,
    isV1: false,
  },
 
]

export default ifos
