import { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { useGetApiPrice } from 'state/hooks'
import { useRyipVaultContract } from 'hooks/useContract'
import useRefresh from 'hooks/useRefresh'
import makeBatchRequest from 'utils/makeBatchRequest'
import { getRyipAddress } from 'utils/addressHelpers'

const useGetVaultBountyInfo = () => {
  const { fastRefresh } = useRefresh()
  const ryipVaultContract = useRyipVaultContract()
  const [estimatedDollarBountyReward, setEstimatedDollarBountyReward] = useState(null)
  const [estimatedRyipBountyReward, setEstimatedRyipBountyReward] = useState(null)
  const [totalPendingRyipHarvest, setTotalPendingRyipHarvest] = useState(null)

  const ryipPrice = useGetApiPrice(getRyipAddress())

  useEffect(() => {
    const fetchRewards = async () => {
      const [estimatedClaimableRyipReward, pendingTotalRyipHarvest] = await makeBatchRequest([
        ryipVaultContract.methods.calculateHarvestRyipRewards().call,
        ryipVaultContract.methods.calculateTotalPendingRyipRewards().call,
      ])
      if (ryipPrice) {
        const dollarValueOfClaimableReward = new BigNumber(estimatedClaimableRyipReward as string).multipliedBy(
          ryipPrice,
        )
        setEstimatedDollarBountyReward(dollarValueOfClaimableReward)
      }
      setEstimatedRyipBountyReward(new BigNumber(estimatedClaimableRyipReward as string))
      setTotalPendingRyipHarvest(new BigNumber(pendingTotalRyipHarvest as string))
    }
    fetchRewards()
  }, [ryipVaultContract, ryipPrice, fastRefresh])

  return { estimatedRyipBountyReward, estimatedDollarBountyReward, totalPendingRyipHarvest }
}

export default useGetVaultBountyInfo
