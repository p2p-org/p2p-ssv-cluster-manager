import { logger } from "../../common/helpers/logger"
import { SSVNetworkAbi } from "../contracts/SSVNetworkContract"
import { Address } from "viem"
import { ClusterState } from "../../models/ClusterState"
import { sendTx } from "../../common/helpers/sendTx"

export async function bulkRemoveValidator(
  proxy: string,
  publicKeys: string[],
  operatorIds: number[],
  cluster: ClusterState
) {
  logger.log('bulkRemoveValidator started')

  const txHash = await sendTx(
    proxy as Address,
    SSVNetworkAbi,
    'bulkRemoveValidator',
    [publicKeys, operatorIds, cluster]
  )

  logger.log('bulkRemoveValidator finished')

  return txHash
}
