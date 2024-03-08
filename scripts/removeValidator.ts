import { logger } from "./helpers/logger"
import { account, publicClient, walletClient } from "./helpers/clients"
import { SSVNetworkAbi, SSVNetworkAddresss } from "./helpers/SSVNetworkContract"
import { BaseError, ContractFunctionRevertedError } from "viem"

export async function removeValidator() {
  logger.log('removeValidator started')

  let txHash = ''

  const publicKeys = []
  const operatorIds = []
  const cluster = {}

  try {
    const { request } = await publicClient.simulateContract({
      address: SSVNetworkAddresss,
      abi: SSVNetworkAbi,
      functionName: 'bulkRemoveValidator',
      args: [publicKeys, operatorIds, cluster],
      account
    })

    txHash = await walletClient.writeContract(request)
  } catch (err) {
    logger.error(err)

    if (err instanceof BaseError) {
      const revertError = err.walk(err => err instanceof ContractFunctionRevertedError)
      if (revertError instanceof ContractFunctionRevertedError) {
        const errorName = revertError.data?.errorName ?? ''

        logger.error(errorName)
      }
    }
  }

  logger.log('removeValidator finished')

  return txHash
}
