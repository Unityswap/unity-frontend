import { usePriceRyipBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const totalRyip = getBalanceNumber(totalRewards)
  const ryipPriceBusd = usePriceRyipBusd()

  return totalRyip * ryipPriceBusd.toNumber()
}

export default useLotteryTotalPrizesUsd
