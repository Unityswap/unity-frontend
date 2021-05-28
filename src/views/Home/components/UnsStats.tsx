import React from 'react'
import { Card, CardBody, Heading, Text } from '@unityswap/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getRyipAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'

const StyledRyipStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const RyipStats = () => {
  const { t } = useTranslation()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getRyipAddress()))
  const ryipSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

  return (
    <StyledRyipStats>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {t('Ryip Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{t('Total RYIP Supply')}</Text>
          {ryipSupply && <CardValue fontSize="14px" value={ryipSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">{t('Total RYIP Burned')}</Text>
          <CardValue fontSize="14px" decimals={0} value={burnedBalance} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('New RYIP/block')}</Text>
          <CardValue fontSize="14px" decimals={0} value={20} />
        </Row>
      </CardBody>
    </StyledRyipStats>
  )
}

export default RyipStats
