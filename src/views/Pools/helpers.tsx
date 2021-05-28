import BigNumber from 'bignumber.js'
import { getBalanceNumber, getFullDisplayBalance, getDecimalAmount } from 'utils/formatBalance'

export const convertSharesToRyip = (
  shares: BigNumber,
  ryipPerFullShare: BigNumber,
  decimals = 18,
  decimalsToRound = 3,
) => {
  const sharePriceNumber = getBalanceNumber(ryipPerFullShare, decimals)
  const amountInRyip = new BigNumber(shares.multipliedBy(sharePriceNumber))
  const ryipAsNumberBalance = getBalanceNumber(amountInRyip, decimals)
  const ryipAsBigNumber = getDecimalAmount(new BigNumber(ryipAsNumberBalance), decimals)
  const ryipAsDisplayBalance = getFullDisplayBalance(amountInRyip, decimals, decimalsToRound)
  return { ryipAsNumberBalance, ryipAsBigNumber, ryipAsDisplayBalance }
}

export const convertRyipToShares = (
  ryip: BigNumber,
  ryipPerFullShare: BigNumber,
  decimals = 18,
  decimalsToRound = 3,
) => {
  const sharePriceNumber = getBalanceNumber(ryipPerFullShare, decimals)
  const amountInShares = new BigNumber(ryip.dividedBy(sharePriceNumber))
  const sharesAsNumberBalance = getBalanceNumber(amountInShares, decimals)
  const sharesAsBigNumber = getDecimalAmount(new BigNumber(sharesAsNumberBalance), decimals)
  const sharesAsDisplayBalance = getFullDisplayBalance(amountInShares, decimals, decimalsToRound)
  return { sharesAsNumberBalance, sharesAsBigNumber, sharesAsDisplayBalance }
}
