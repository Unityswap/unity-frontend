import React from 'react'
import BigNumber from 'bignumber.js'
import { TooltipText, useTooltip } from '@unityswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { convertSharesToRyip } from '../../helpers'

interface RecentRyipProfitBalanceProps {
  ryipAtLastUserAction: BigNumber
  userShares: BigNumber
  pricePerFullShare: BigNumber
}

const RecentRyipProfitBalance: React.FC<RecentRyipProfitBalanceProps> = ({
  ryipAtLastUserAction,
  userShares,
  pricePerFullShare,
}) => {
  const currentSharesAsRyip = convertSharesToRyip(userShares, pricePerFullShare)
  const ryipProfit = currentSharesAsRyip.ryipAsBigNumber.minus(ryipAtLastUserAction)
  const ryipToDisplay = ryipProfit.gte(0) ? getFullDisplayBalance(ryipProfit, 18, 5) : '0'

  const { t } = useTranslation()

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Your estimated earnings since last manual stake or unstake:'),
    { placement: 'bottom-end' },
  )

  return (
    <>
      {tooltipVisible && tooltip}
      <TooltipText ref={targetRef} small>
        {ryipToDisplay}
      </TooltipText>
    </>
  )
}

export default RecentRyipProfitBalance
