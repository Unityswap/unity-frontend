import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from 'utils/web3'
import { poolsConfig } from 'config/constants'
import { PoolCategory } from 'config/constants/types'

// Addresses
import {
  getAddress,
  getUnityProfileAddress,
  getUnityPanthersAddress,
  getPantherFactoryAddress,
  getPantherSpecialAddress,
  getRyipAddress,
  getLotteryAddress,
  getLotteryTicketAddress,
  getMasterChefAddress,
  getPointCenterIfoAddress,
  getClaimRefundAddress,
  getTradingCompetitionAddress,
  getEasterNftAddress,
  getRyipVaultAddress,
  getPredictionsAddress,
  getChainlinkOracleAddress,
} from 'utils/addressHelpers'

// ABI
import profileABI from 'config/abi/unityProfile.json'
import unityPanthersAbi from 'config/abi/unityPanthers.json'
import pantherFactoryAbi from 'config/abi/pantherFactory.json'
import pantherSpecialAbi from 'config/abi/pantherSpecial.json'
import bep20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import lpTokenAbi from 'config/abi/lpToken.json'
import ryipAbi from 'config/abi/ryip.json'
import ifoV1Abi from 'config/abi/ifoV1.json'
import ifoV2Abi from 'config/abi/ifoV2.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import lotteryAbi from 'config/abi/lottery.json'
import lotteryTicketAbi from 'config/abi/lotteryNft.json'
import masterChef from 'config/abi/masterchef.json'
import unityMaker from 'config/abi/unityMaker.json'
import unityMakerV2 from 'config/abi/unityMakerV2.json'
import unityMakerBnb from 'config/abi/unityMakerBnb.json'
import claimRefundAbi from 'config/abi/claimRefund.json'
import tradingCompetitionAbi from 'config/abi/tradingCompetition.json'
import easterNftAbi from 'config/abi/easterNft.json'
import ryipVaultAbi from 'config/abi/ryipVault.json'
import predictionsAbi from 'config/abi/predictions.json'
import chainlinkOracleAbi from 'config/abi/chainlinkOracle.json'

const getContract = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? web3NoAccount
  return new _web3.eth.Contract(abi as unknown as AbiItem, address)
}

export const getBep20Contract = (address: string, web3?: Web3) => {
  return getContract(bep20Abi, address, web3)
}
export const getErc721Contract = (address: string, web3?: Web3) => {
  return getContract(erc721Abi, address, web3)
}
export const getLpContract = (address: string, web3?: Web3) => {
  return getContract(lpTokenAbi, address, web3)
}
export const getIfoV1Contract = (address: string, web3?: Web3) => {
  return getContract(ifoV1Abi, address, web3)
}
export const getIfoV2Contract = (address: string, web3?: Web3) => {
  return getContract(ifoV2Abi, address, web3)
}
export const getUnityMakerContract = (id: number, web3?: Web3) => {
  const config = poolsConfig.find((pool) => pool.unityId === id)
  const abi = config.poolCategory === PoolCategory.BINANCE ? unityMakerBnb : unityMaker
  return getContract(abi, getAddress(config.contractAddress), web3)
}
export const getUnityMakerV2Contract = (id: number, web3?: Web3) => {
  const config = poolsConfig.find((pool) => pool.unityId === id)
  return getContract(unityMakerV2, getAddress(config.contractAddress), web3)
}
export const getPointCenterIfoContract = (web3?: Web3) => {
  return getContract(pointCenterIfo, getPointCenterIfoAddress(), web3)
}
export const getRyipContract = (web3?: Web3) => {
  return getContract(ryipAbi, getRyipAddress(), web3)
}
export const getProfileContract = (web3?: Web3) => {
  return getContract(profileABI, getUnityProfileAddress(), web3)
}
export const getUnityPantherContract = (web3?: Web3) => {
  return getContract(unityPanthersAbi, getUnityPanthersAddress(), web3)
}
export const getPantherFactoryContract = (web3?: Web3) => {
  return getContract(pantherFactoryAbi, getPantherFactoryAddress(), web3)
}
export const getPantherSpecialContract = (web3?: Web3) => {
  return getContract(pantherSpecialAbi, getPantherSpecialAddress(), web3)
}
export const getLotteryContract = (web3?: Web3) => {
  return getContract(lotteryAbi, getLotteryAddress(), web3)
}
export const getLotteryTicketContract = (web3?: Web3) => {
  return getContract(lotteryTicketAbi, getLotteryTicketAddress(), web3)
}
export const getMasterchefContract = (web3?: Web3) => {
  return getContract(masterChef, getMasterChefAddress(), web3)
}
export const getClaimRefundContract = (web3?: Web3) => {
  return getContract(claimRefundAbi, getClaimRefundAddress(), web3)
}
export const getTradingCompetitionContract = (web3?: Web3) => {
  return getContract(tradingCompetitionAbi, getTradingCompetitionAddress(), web3)
}
export const getEasterNftContract = (web3?: Web3) => {
  return getContract(easterNftAbi, getEasterNftAddress(), web3)
}
export const getRyipVaultContract = (web3?: Web3) => {
  return getContract(ryipVaultAbi, getRyipVaultAddress(), web3)
}
export const getPredictionsContract = (web3?: Web3) => {
  return getContract(predictionsAbi, getPredictionsAddress(), web3)
}
export const getChainlinkOracleContract = (web3?: Web3) => {
  return getContract(chainlinkOracleAbi, getChainlinkOracleAddress(), web3)
}
