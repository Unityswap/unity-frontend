import React, { useEffect, useState } from 'react'
import { PromiEvent } from 'web3-core'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { usePantherSpecialContract } from 'hooks/useContract'
import NftCard, { NftCardProps } from './index'

const PantherSpecialCard: React.FC<NftCardProps> = ({ nft, ...props }) => {
  const [isClaimable, setIsClaimable] = useState(false)
  const { account } = useWeb3React()
  const pantherSpecialContract = usePantherSpecialContract()
  const { variationId } = nft

  const handleClaim = (): PromiEvent<Contract> => {
    return pantherSpecialContract.methods.mintNFT(variationId).send({ from: account })
  }

  useEffect(() => {
    const fetchClaimStatus = async () => {
      const canClaimSingle = await pantherSpecialContract.methods.canClaimSingle(account, variationId).call()
      setIsClaimable(canClaimSingle)
    }

    if (account) {
      fetchClaimStatus()
    }
  }, [account, variationId, pantherSpecialContract, setIsClaimable])

  return <NftCard nft={nft} {...props} canClaim={isClaimable} onClaim={handleClaim} />
}

export default PantherSpecialCard
