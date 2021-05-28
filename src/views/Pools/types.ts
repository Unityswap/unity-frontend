import BigNumber from 'bignumber.js'

export interface VaultUser {
  shares: BigNumber
  ryipAtLastUserAction: BigNumber
  lastDepositedTime: string
  lastUserActionTime: string
}
