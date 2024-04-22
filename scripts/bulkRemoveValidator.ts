import { logger } from "./helpers/logger"
import { account, publicClient, walletClient } from "./helpers/clients"
import { SSVNetworkAbi } from "./helpers/SSVNetworkContract"
import { Address, BaseError, ContractFunctionRevertedError } from "viem"
import { ClusterState } from "./models/ClusterState"

export async function bulkRemoveValidator(
  proxy: string,
  publicKeys: string[],
  operatorIds: number[],
  cluster: ClusterState
) {
  logger.log('bulkRemoveValidator started')

  let txHash = ''

  try {
    const { request } = await publicClient.simulateContract({
      address: proxy as Address,
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

  logger.log('bulkRemoveValidator finished')

  return txHash
}
