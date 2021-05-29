import { Nft, NftSource, NftType } from './types'

export const IPFS_GATEWAY = 'https://gateway.pinata.cloud'

export const nftSources: NftSource = {
  [NftType.UNITY]: {
    address: {
      56: '0xDFaD0456d930fB1df44e531386eBEf650bE4Dfc0',
      97: '0x60935F36e4631F73f0f407e68642144e07aC7f5E',
    },
    identifierKey: 'image',
  },
  [NftType.MIXIE]: {
    address: {
      56: '0xa251b5EAa9E67F2Bc8b33F33e20E91552Bf85566',
      97: '',
    },
    identifierKey: 'image',
  },
}

const Nfts: Nft[] = [
  {
    name: 'Mixie v1',
    description: 'Stories were told, and songs were sung, about Chef Mixie’s unitys and her big Unity gun.',
    images: {
      lg: 'mixie-1-lg.png',
      md: 'mixie-1-md.png',
      sm: 'mixie-1-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmQiRpr7ZMkzV7qbqVaUZ1LiuHTTdpWmapUhaY6ZGmVLQ4/001-Chef-Mixie.png',
    },
    sortOrder: 999,
    identifier: '001-Chef-Mixie',
    type: NftType.MIXIE,
    variationId: 1,
  },
  
]

export default Nfts
