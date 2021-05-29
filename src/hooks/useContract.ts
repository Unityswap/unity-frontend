import { useMemo } from 'react'
import useWeb3 from 'hooks/useWeb3'
import {
  getBep20Contract,
  getRyipContract,
  getPantherFactoryContract,
  getPantherSpecialContract,
  getUnityPantherContract,
  getProfileContract,
  getIfoV1Contract,
  getIfoV2Contract,
  getLotteryContract,
  getLotteryTicketContract,
  getMasterchefContract,
  getPointCenterIfoContract,
  getUnityMakerContract,
  getClaimRefundContract,
  getTradingCompetitionContract,
  getEasterNftContract,
  getErc721Contract,
  getRyipVaultContract,
  getPredictionsContract,
  getChainlinkOracleContract,
  getUnityMakerV2Contract,
} from 'utils/contractHelpers'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoV1Contract = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getIfoV1Contract(address, web3), [address, web3])
}

export const useIfoV2Contract = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getIfoV2Contract(address, web3), [address, web3])
}

export const useERC20 = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getBep20Contract(address, web3), [address, web3])
}

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */
export const useERC721 = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getErc721Contract(address, web3), [address, web3])
}

export const useRyip = () => {
  const web3 = useWeb3()
  return useMemo(() => getRyipContract(web3), [web3])
}

export const usePantherFactory = () => {
  const web3 = useWeb3()
  return useMemo(() => getPantherFactoryContract(web3), [web3])
}

export const useUnityPanthers = () => {
  const web3 = useWeb3()
  return useMemo(() => getUnityPantherContract(web3), [web3])
}

export const useProfile = () => {
  const web3 = useWeb3()
  return useMemo(() => getProfileContract(web3), [web3])
}

export const useLottery = () => {
  const web3 = useWeb3()
  return useMemo(() => getLotteryContract(web3), [web3])
}

export const useLotteryTicket = () => {
  const web3 = useWeb3()
  return useMemo(() => getLotteryTicketContract(web3), [web3])
}

export const useMasterchef = () => {
  const web3 = useWeb3()
  return useMemo(() => getMasterchefContract(web3), [web3])
}

export const useUnityMaker = (id) => {
  const web3 = useWeb3()
  return useMemo(() => getUnityMakerContract(id, web3), [id, web3])
}

export const useUnityMakerV2 = (id) => {
  const web3 = useWeb3()
  return useMemo(() => getUnityMakerV2Contract(id, web3), [id, web3])
}

export const usePointCenterIfoContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getPointCenterIfoContract(web3), [web3])
}

export const usePantherSpecialContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getPantherSpecialContract(web3), [web3])
}

export const useClaimRefundContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getClaimRefundContract(web3), [web3])
}

export const useTradingCompetitionContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getTradingCompetitionContract(web3), [web3])
}

export const useEasterNftContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getEasterNftContract(web3), [web3])
}

export const useRyipVaultContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getRyipVaultContract(web3), [web3])
}

export const usePredictionsContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getPredictionsContract(web3), [web3])
}

export const useChainlinkOracleContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getChainlinkOracleContract(web3), [web3])
}
