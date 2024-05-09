import { logger } from "../../common/helpers/logger"
import { getAllClusterStates } from "./getAllClusterStates"
import { getExcessTokensToWithdraw } from "./getExcessTokensToWithdraw"

export async function getClusterStatesToWithdraw() {
  logger.info('getClusterStatesToWithdraw started')

  const clusterStates = await getAllClusterStates()

  const clusterStatesToWithdraw = []
  for (const clusterState of clusterStates) {
    const tokensToWithdraw = await getExcessTokensToWithdraw(clusterState)

    if (tokensToWithdraw > 1n) { // > 1 wei
      clusterStatesToWithdraw.push({...clusterState, tokensToWithdraw})
    }
  }

  logger.info('getClusterStatesToWithdraw finished')

  return clusterStatesToWithdraw
}
