import React from 'react'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceRyipBusd } from 'state/hooks'
import { Text } from '@unityswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'bignumber.js'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const Block = styled.div`
  margin-bottom: 24px;
`

interface RyipWinningsProps {
  claimAmount: BigNumber
}

const RyipWinnings: React.FC<RyipWinningsProps> = ({ claimAmount }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const ryipAmount = getBalanceNumber(claimAmount)
  const ryipPriceBusd = usePriceRyipBusd()
  const claimAmountBusd = new BigNumber(ryipAmount).multipliedBy(ryipPriceBusd).toNumber()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '76px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <Block>
      <CardValue value={ryipAmount} lineHeight="1.5" />
      {!ryipPriceBusd.eq(0) && <CardBusdValue value={claimAmountBusd} decimals={2} />}
    </Block>
  )
}

export default RyipWinnings
