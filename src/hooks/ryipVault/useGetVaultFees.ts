import { useEffect, useState } from 'react'
import { useRyipVaultContract } from 'hooks/useContract'
import makeBatchRequest from 'utils/makeBatchRequest'

export interface VaultFees {
  performanceFee: string
  callFee: string
  withdrawalFee: string
  withdrawalFeePeriod: string
}

const useGetVaultFees = () => {
  const ryipVaultContract = useRyipVaultContract()
  const [fees, setFees] = useState({
    performanceFee: null,
    callFee: null,
    withdrawalFee: null,
    withdrawalFeePeriod: null,
  })

  useEffect(() => {
    const getFees = async () => {
      const [contractPerformanceFee, contractWithdrawalFeeTimePeriod, contractCallFee, contractWithdrawalFee] =
        await makeBatchRequest([
          ryipVaultContract.methods.performanceFee().call,
          ryipVaultContract.methods.withdrawFeePeriod().call,
          ryipVaultContract.methods.callFee().call,
          ryipVaultContract.methods.withdrawFee().call,
        ])

      setFees({
        performanceFee: contractPerformanceFee as string,
        callFee: contractCallFee as string,
        withdrawalFee: contractWithdrawalFee as string,
        withdrawalFeePeriod: contractWithdrawalFeeTimePeriod as string,
      })
    }

    getFees()
  }, [ryipVaultContract])

  return fees
}

export default useGetVaultFees
