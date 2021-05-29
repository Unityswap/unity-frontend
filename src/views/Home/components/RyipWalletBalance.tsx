import React from 'react'
import { Text } from '@unityswap/uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getRyipAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceRyipBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const RyipWalletBalance = () => {
  const { t } = useTranslation()
  const ryipBalance = useTokenBalance(getRyipAddress())
  const ryipPriceBusd = usePriceRyipBusd()
  const busdBalance = new BigNumber(getBalanceNumber(ryipBalance)).multipliedBy(ryipPriceBusd).toNumber()
  const { account } = useWeb3React()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '54px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <>
      <CardValue value={getBalanceNumber(ryipBalance)} decimals={4} fontSize="24px" lineHeight="36px" />
      {!ryipPriceBusd.eq(0) ? <CardBusdValue value={busdBalance} /> : <br />}
    </>
  )
}

export default RyipWalletBalance
