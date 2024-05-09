import { logger } from "../../common/helpers/logger"
import { SSVNetworkViewsContract } from "../contracts/SSVNetworkViewsContract"
import { ClusterStateApi, toClusterState } from "../models/ClusterStateApi"

export async function getCurrentClusterBalance(clusterStateApi: ClusterStateApi) {
  logger.info('getCurrentClusterBalance started for ' + clusterStateApi.clusterId)

  const cluster = toClusterState(clusterStateApi)

  try {
    const currentBalance = await SSVNetworkViewsContract.read.getBalance([
      clusterStateApi.ownerAddress,
      clusterStateApi.operators,
      cluster
    ]) as bigint

    logger.info('getCurrentClusterBalance finished for ' + clusterStateApi.clusterId)

    return currentBalance
  } catch (error) {
    if ((error as any)?.message.includes('ClusterIsLiquidated')) {
      logger.info('Cluster ' + clusterStateApi.clusterId + ' is liquidated')
    } else {
      logger.error(error)
    }

    return 0n
  }
}
