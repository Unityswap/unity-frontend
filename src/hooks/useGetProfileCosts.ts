import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { getProfileContract } from 'utils/contractHelpers'
import makeBatchRequest from 'utils/makeBatchRequest'
import { BIG_ZERO } from 'utils/bigNumber'
import useToast from './useToast'

const useGetProfileCosts = () => {
  const [costs, setCosts] = useState({
    numberRyipToReactivate: BIG_ZERO,
    numberRyipToRegister: BIG_ZERO,
    numberRyipToUpdate: BIG_ZERO,
  })
  const { toastError } = useToast()

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const profileContract = getProfileContract()
        const [numberRyipToReactivate, numberRyipToRegister, numberRyipToUpdate] = await makeBatchRequest([
          profileContract.methods.numberRyipToReactivate().call,
          profileContract.methods.numberRyipToRegister().call,
          profileContract.methods.numberRyipToUpdate().call,
        ])

        setCosts({
          numberRyipToReactivate: new BigNumber(numberRyipToReactivate as string),
          numberRyipToRegister: new BigNumber(numberRyipToRegister as string),
          numberRyipToUpdate: new BigNumber(numberRyipToUpdate as string),
        })
      } catch (error) {
        toastError('Error', 'Could not retrieve RYIP costs for profile')
      }
    }

    fetchCosts()
  }, [setCosts, toastError])

  return costs
}

export default useGetProfileCosts
