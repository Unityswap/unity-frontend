/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import poolsConfig from 'config/constants/pools'
import { BIG_ZERO } from 'utils/bigNumber'
import { fetchPoolsBlockLimits, fetchPoolsStakingLimits, fetchPoolsTotalStaking } from './fetchPools'
import {
  fetchPoolsAllowance,
  fetchUserBalances,
  fetchUserStakeBalances,
  fetchUserPendingRewards,
} from './fetchPoolsUser'
import { PoolsState, Pool } from '../types'

const initialState: PoolsState = { data: [...poolsConfig] }

export const PoolsSlice = createSlice({
  name: 'Pools',
  initialState,
  reducers: {
    setPoolsPublicData: (state, action) => {
      const livePoolsData: Pool[] = action.payload
      state.data = state.data.map((pool) => {
        const livePoolData = livePoolsData.find((entry) => entry.unityId === pool.unityId)
        return { ...pool, ...livePoolData }
      })
    },
    setPoolsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((pool) => {
        const userPoolData = userData.find((entry) => entry.unityId === pool.unityId)
        return { ...pool, userData: userPoolData }
      })
    },
    updatePoolsUserData: (state, action) => {
      const { field, value, unityId } = action.payload
      const index = state.data.findIndex((p) => p.unityId === unityId)

      if (index >= 0) {
        state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
      }
    },
  },
})

// Actions
export const { setPoolsPublicData, setPoolsUserData, updatePoolsUserData } = PoolsSlice.actions

// Thunks
export const fetchPoolsPublicDataAsync = () => async (dispatch) => {
  const blockLimits = await fetchPoolsBlockLimits()
  const totalStakings = await fetchPoolsTotalStaking()

  const liveData = poolsConfig.map((pool) => {
    const blockLimit = blockLimits.find((entry) => entry.unityId === pool.unityId)
    const totalStaking = totalStakings.find((entry) => entry.unityId === pool.unityId)

    return {
      ...blockLimit,
      ...totalStaking,
    }
  })

  dispatch(setPoolsPublicData(liveData))
}

export const fetchPoolsStakingLimitsAsync = () => async (dispatch, getState) => {
  const poolsWithStakingLimit = getState()
    .pools.data.filter(({ stakingLimit }) => stakingLimit !== null && stakingLimit !== undefined)
    .map((pool) => pool.unityId)

  const stakingLimits = await fetchPoolsStakingLimits(poolsWithStakingLimit)

  const stakingLimitData = poolsConfig.map((pool) => {
    if (poolsWithStakingLimit.includes(pool.unityId)) {
      return { unityId: pool.unityId }
    }
    const stakingLimit = stakingLimits[pool.unityId] || BIG_ZERO
    return {
      unityId: pool.unityId,
      stakingLimit: stakingLimit.toJSON(),
    }
  })

  dispatch(setPoolsPublicData(stakingLimitData))
}

export const fetchPoolsUserDataAsync = (account) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  const stakingTokenBalances = await fetchUserBalances(account)
  const stakedBalances = await fetchUserStakeBalances(account)
  const pendingRewards = await fetchUserPendingRewards(account)

  const userData = poolsConfig.map((pool) => ({
    unityId: pool.unityId,
    allowance: allowances[pool.unityId],
    stakingTokenBalance: stakingTokenBalances[pool.unityId],
    stakedBalance: stakedBalances[pool.unityId],
    pendingReward: pendingRewards[pool.unityId],
  }))

  dispatch(setPoolsUserData(userData))
}

export const updateUserAllowance = (unityId: number, account: string) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  dispatch(updatePoolsUserData({ unityId, field: 'allowance', value: allowances[unityId] }))
}

export const updateUserBalance = (unityId: number, account: string) => async (dispatch) => {
  const tokenBalances = await fetchUserBalances(account)
  dispatch(updatePoolsUserData({ unityId, field: 'stakingTokenBalance', value: tokenBalances[unityId] }))
}

export const updateUserStakedBalance = (unityId: number, account: string) => async (dispatch) => {
  const stakedBalances = await fetchUserStakeBalances(account)
  dispatch(updatePoolsUserData({ unityId, field: 'stakedBalance', value: stakedBalances[unityId] }))
}

export const updateUserPendingReward = (unityId: number, account: string) => async (dispatch) => {
  const pendingRewards = await fetchUserPendingRewards(account)
  dispatch(updatePoolsUserData({ unityId, field: 'pendingReward', value: pendingRewards[unityId] }))
}

export default PoolsSlice.reducer
