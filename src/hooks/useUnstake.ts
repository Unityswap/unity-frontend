import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import {
  fetchFarmUserDataAsync,
  updateUserStakedBalance,
  updateUserBalance,
  updateUserPendingReward,
} from 'state/actions'
import { unstake, unityUnstake, unityEmergencyUnstake } from 'utils/callHelpers'
import { useMasterchef, useUnityMaker } from './useContract'

const useUnstake = (pid: number) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export const useUnityUnstake = (unityId, enableEmergencyWithdraw = false) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()
  const unityMakerContract = useUnityMaker(unityId)

  const handleUnstake = useCallback(
    async (amount: string, decimals: number) => {
      if (unityId === 0) {
        const txHash = await unstake(masterChefContract, 0, amount, account)
        console.info(txHash)
      } else if (enableEmergencyWithdraw) {
        const txHash = await unityEmergencyUnstake(unityMakerContract, account)
        console.info(txHash)
      } else {
        const txHash = await unityUnstake(unityMakerContract, amount, decimals, account)
        console.info(txHash)
      }
      dispatch(updateUserStakedBalance(unityId, account))
      dispatch(updateUserBalance(unityId, account))
      dispatch(updateUserPendingReward(unityId, account))
    },
    [account, dispatch, enableEmergencyWithdraw, masterChefContract, unityMakerContract, unityId],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
