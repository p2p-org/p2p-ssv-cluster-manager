import { logger } from "../../common/helpers/logger"
import { SSVNetworkAbi } from "../contracts/SSVNetworkContract"
import { Address } from "viem"
import { ClusterState } from "../models/ClusterState"
import { sendTx } from "../../common/helpers/sendTx"

export async function bulkRemoveValidator(
  proxy: string,
  publicKeys: string[],
  operatorIds: (number | bigint)[],
  cluster: ClusterState
) {
  logger.log('bulkRemoveValidator started for ' + proxy, operatorIds.join(',') + ' ' + publicKeys.join('\n'))

  const txHash = await sendTx(
    proxy as Address,
    SSVNetworkAbi,
    'bulkRemoveValidator',
    [publicKeys, operatorIds, cluster]
  )

  logger.log('bulkRemoveValidator finished for ' + proxy, operatorIds.join(',') + ' ' + publicKeys.join('\n'))

  return txHash
}
