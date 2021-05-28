import pools from 'config/constants/pools'
import { getUnityMakerContract, getUnityMakerV2Contract } from 'utils/contractHelpers'

// Pool 0 is special (ryip pool)
// Pool 78 is a broken pool, not used, and break the tests
const idsToRemove = [0, 78]
const poolsToTest = pools.filter((pool) => !idsToRemove.includes(pool.unityId))

describe('Config pools', () => {
  it.each(pools.map((pool) => pool.unityId))('Pool #%d has an unique unityId', (unityId) => {
    const duplicates = pools.filter((p) => unityId === p.unityId)
    expect(duplicates).toHaveLength(1)
  })
  it.each(pools.map((pool) => [pool.unityId, pool.contractAddress]))(
    'Pool #%d has an unique contract address',
    (unityId, contractAddress) => {
      const duplicates = pools.filter((p) => contractAddress[56] === p.contractAddress[56])
      expect(duplicates).toHaveLength(1)
    },
  )
  it.each(poolsToTest.filter((pool) => pool.earningToken.symbol !== 'BNB'))(
    'Pool %p has the correct earning token',
    async (pool) => {
      const contract = getUnityMakerContract(pool.unityId)
      const rewardTokenAddress = await contract.methods.rewardToken().call()
      expect(rewardTokenAddress.toLowerCase()).toBe(pool.earningToken.address[56].toLowerCase())
    },
  )
  it.each(poolsToTest.filter((pool) => pool.stakingToken.symbol !== 'BNB'))(
    'Pool %p has the correct staking token',
    async (pool) => {
      let stakingTokenAddress = null
      try {
        const contract = getUnityMakerV2Contract(pool.unityId)
        stakingTokenAddress = await contract.methods.stakedToken().call()
      } catch (error) {
        const contract = getUnityMakerContract(pool.unityId)
        stakingTokenAddress = await contract.methods.unity().call()
      }

      expect(stakingTokenAddress.toLowerCase()).toBe(pool.stakingToken.address[56].toLowerCase())
    },
  )
})
