import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'UnitySwap',
  description:
    'The most popular AMM on BSC by user count! Earn RYIP through yield farming or win it in the Lottery, then stake it in Unity Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by UnitySwap), NFTs, and more, on a platform you can trust.',
  image: 'https://unity-swap.finance/images/hero.png',
}

export const customMeta: { [key: string]: PageMeta } = {
  '/': {
    title: 'Home | UnitySwap',
  },
  '/competition': {
    title: 'Trading Battle | UnitySwap',
  },
  '/prediction': {
    title: 'Prediction | UnitySwap',
  },
  '/farms': {
    title: 'Farms | UnitySwap',
  },
  '/pools': {
    title: 'Pools | UnitySwap',
  },
  '/lottery': {
    title: 'Lottery | UnitySwap',
  },
  '/collectibles': {
    title: 'Collectibles | UnitySwap',
  },
  '/ifo': {
    title: 'Initial Farm Offering | UnitySwap',
  },
  '/teams': {
    title: 'Leaderboard | UnitySwap',
  },
  '/profile/tasks': {
    title: 'Task Center | UnitySwap',
  },
  '/profile': {
    title: 'Your Profile | UnitySwap',
  },
}
