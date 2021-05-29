import React from 'react'
import BigNumber from 'bignumber.js'
import { Flex, Text } from '@unityswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import RecentRyipProfitBalance from './RecentRyipProfitBalance'

interface RecentRyipProfitRowProps {
  ryipAtLastUserAction: BigNumber
  userShares: BigNumber
  pricePerFullShare: BigNumber
}

const RecentRyipProfitCountdownRow: React.FC<RecentRyipProfitRowProps> = ({
  ryipAtLastUserAction,
  userShares,
  pricePerFullShare,
}) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const shouldDisplayRyipProfit =
    account && ryipAtLastUserAction && ryipAtLastUserAction.gt(0) && userShares && userShares.gt(0)

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontSize="14px">{t('Recent RYIP profit:')}</Text>
      {shouldDisplayRyipProfit && (
        <RecentRyipProfitBalance
          ryipAtLastUserAction={ryipAtLastUserAction}
          userShares={userShares}
          pricePerFullShare={pricePerFullShare}
        />
      )}
    </Flex>
  )
}

export default RecentRyipProfitCountdownRow
