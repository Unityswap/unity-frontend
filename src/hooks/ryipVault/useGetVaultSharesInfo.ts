import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { convertSharesToRyip } from 'views/Pools/helpers'
import { useRyipVaultContract } from 'hooks/useContract'
import makeBatchRequest from 'utils/makeBatchRequest'

const useGetVaultSharesInfo = (lastUpdated?: number) => {
  const ryipVaultContract = useRyipVaultContract()
  const [totalShares, setTotalShares] = useState(null)
  const [totalRyipInVault, setTotalRyipInVault] = useState(null)
  const [pricePerFullShare, setPricePerFullShare] = useState(null)

  useEffect(() => {
    const getTotalShares = async () => {
      const [sharePrice, shares] = await makeBatchRequest([
        ryipVaultContract.methods.getPricePerFullShare().call,
        ryipVaultContract.methods.totalShares().call,
      ])
      const sharePriceAsBigNumber = new BigNumber(sharePrice as string)
      const totalSharesAsBigNumber = new BigNumber(shares as string)
      const totalRyipInVaultEstimate = convertSharesToRyip(totalSharesAsBigNumber, sharePriceAsBigNumber)
      setPricePerFullShare(sharePriceAsBigNumber)
      setTotalShares(totalSharesAsBigNumber)
      setTotalRyipInVault(totalRyipInVaultEstimate.ryipAsBigNumber)
    }
    getTotalShares()
  }, [ryipVaultContract, lastUpdated])

  return { totalShares, totalRyipInVault, pricePerFullShare }
}

export default useGetVaultSharesInfo
