import BigNumber from 'bignumber.js'
import { getRyipAddress } from 'utils/addressHelpers'
import useTokenBalance from './useTokenBalance'

/**
 * A hook to check if a wallet's RYIP balance is at least the amount passed in
 */
const useHasRyipBalance = (minimumBalance: BigNumber) => {
  const ryipBalance = useTokenBalance(getRyipAddress())
  return ryipBalance.gte(minimumBalance)
}

export default useHasRyipBalance
