import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { BIG_ZERO } from 'utils/bigNumber'
import { useRyipVaultContract } from 'hooks/useContract'

const useGetVaultUserInfo = (lastUpdated?: number) => {
  const { account } = useWeb3React()
  const ryipVaultContract = useRyipVaultContract()
  const [userInfo, setUserInfo] = useState({
    shares: BIG_ZERO,
    ryipAtLastUserAction: BIG_ZERO,
    lastDepositedTime: '',
    lastUserActionTime: '',
  })

  useEffect(() => {
    //   user-specific vault contract fetches
    const fetchUserVaultInfo = async () => {
      const userContractInfo = await ryipVaultContract.methods.userInfo(account).call()
      setUserInfo({
        shares: new BigNumber(userContractInfo.shares),
        ryipAtLastUserAction: new BigNumber(userContractInfo.ryipAtLastUserAction),
        lastDepositedTime: userContractInfo.lastDepositedTime,
        lastUserActionTime: userContractInfo.lastUserActionTime,
      })
    }

    if (account) {
      fetchUserVaultInfo()
    }
  }, [account, ryipVaultContract, lastUpdated])

  return userInfo
}

export default useGetVaultUserInfo
