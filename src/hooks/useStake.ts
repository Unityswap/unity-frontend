import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync, updateUserStakedBalance, updateUserBalance } from 'state/actions'
import { stake, unityStake, unityStakeBnb } from 'utils/callHelpers'
import { useMasterchef, useUnityMaker } from './useContract'

const useStake = (pid: number) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onStake: handleStake }
}

export const useUnityStake = (unityId: number, isUsingBnb = false) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()
  const unityMakerContract = useUnityMaker(unityId)

  const handleStake = useCallback(
    async (amount: string, decimals: number) => {
      if (unityId === 0) {
        await stake(masterChefContract, 0, amount, account)
      } else if (isUsingBnb) {
        await unityStakeBnb(unityMakerContract, amount, account)
      } else {
        await unityStake(unityMakerContract, amount, decimals, account)
      }
      dispatch(updateUserStakedBalance(unityId, account))
      dispatch(updateUserBalance(unityId, account))
    },
    [account, dispatch, isUsingBnb, masterChefContract, unityMakerContract, unityId],
  )

  return { onStake: handleStake }
}

export default useStake
