import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync, updateUserBalance, updateUserPendingReward } from 'state/actions'
import { unityhHarvest, unityhHarvestBnb, harvest } from 'utils/callHelpers'
import { useMasterchef, useUnityMaker } from './useContract'

export const useHarvest = (farmPid: number) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterChefContract, farmPid, account)
    dispatch(fetchFarmUserDataAsync(account))
    return txHash
  }, [account, dispatch, farmPid, masterChefContract])

  return { onReward: handleHarvest }
}

export const useAllHarvest = (farmPids: number[]) => {
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    const harvestPromises = farmPids.reduce((accum, pid) => {
      return [...accum, harvest(masterChefContract, pid, account)]
    }, [])

    return Promise.all(harvestPromises)
  }, [account, farmPids, masterChefContract])

  return { onReward: handleHarvest }
}

export const useUnityHarvest = (unityId, isUsingBnb = false) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const unityMakerContract = useUnityMaker(unityId)
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    if (unityId === 0) {
      await harvest(masterChefContract, 0, account)
    } else if (isUsingBnb) {
      await unityhHarvestBnb(unityMakerContract, account)
    } else {
      await unityhHarvest(unityMakerContract, account)
    }
    dispatch(updateUserPendingReward(unityId, account))
    dispatch(updateUserBalance(unityId, account))
  }, [account, dispatch, isUsingBnb, masterChefContract, unityMakerContract, unityId])

  return { onReward: handleHarvest }
}
