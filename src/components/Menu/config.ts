import { MenuEntry } from '@unityswap/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://exchange.unity-swap.finance/#/swap',
      },
      {
        label: 'Liquidity',
        href: 'https://exchange.unity-swap.finance/#/pool',
      },
      {
        label: 'LP Migration',
        href: 'https://v1exchange.unity-swap.finance/#/migrate',
      },
      {
        label: 'V1 Liquidity (Old)',
        href: 'https://v1exchange.unity-swap.finance/#/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: 'Prediction',
    icon: 'PredictionsIcon',
    href: '/prediction',
    status: {
      text: 'BETA',
      color: 'warning',
    },
  },
  {
    label: 'Lottery',
    icon: 'TicketIcon',
    href: '/lottery',
  },
  {
    label: 'Collectibles',
    icon: 'NftIcon',
    href: '/collectibles',
  },
  {
    label: 'Team Battle',
    icon: 'TeamBattleIcon',
    href: '/competition',
  },
  {
    label: 'Teams & Profile',
    icon: 'GroupsIcon',
    items: [
      {
        label: 'Leaderboard',
        href: '/teams',
      },
      {
        label: 'Task Center',
        href: '/profile/tasks',
      },
      {
        label: 'Your Profile',
        href: '/profile',
      },
    ],
  },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: 'https://unityswap.info',
      },
      {
        label: 'Tokens',
        href: 'https://unityswap.info/tokens',
      },
      {
        label: 'Pairs',
        href: 'https://unityswap.info/pairs',
      },
      {
        label: 'Accounts',
        href: 'https://unityswap.info/accounts',
      },
    ],
  },
  {
    label: 'IFO',
    icon: 'IfoIcon',
    href: '/ifo',
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Contact',
        href: 'https://docs.unity-swap.finance/contact-us',
      },
      {
        label: 'Voting',
        href: 'https://voting.unity-swap.finance',
      },
      {
        label: 'Github',
        href: 'https://github.com/unityswap',
      },
      {
        label: 'Docs',
        href: 'https://docs.unity-swap.finance',
      },
      {
        label: 'Blog',
        href: 'https://unityswap.medium.com',
      },
      {
        label: 'Merch',
        href: 'https://unityswap.creator-spring.com/',
      },
    ],
  },
]

export default config
