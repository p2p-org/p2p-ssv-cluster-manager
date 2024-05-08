import { logger } from "../../common/helpers/logger"
import process from "process"
import { getAllClusterStates } from "./getAllClusterStates"
import { getDaysToLiquidation } from "./getDaysToLiquidation"

export async function getClusterStatesToTopUp() {
  logger.info('getClusterStatesToTopUp started')

  if (!process.env.ALLOWED_DAYS_TO_LIQUIDATION) {
    throw new Error("No ALLOWED_DAYS_TO_LIQUIDATION in ENV")
  }

  const clusterStates = await getAllClusterStates()

  const clusterStatesToTopUp = []
  let totalTokensToTopUp = 0n
  for (const clusterState of clusterStates) {
    const {daysToLiquidation, tokensToAdd} = await getDaysToLiquidation(clusterState)
    const allowedDaysToLiquidation = BigInt(process.env.ALLOWED_DAYS_TO_LIQUIDATION)

    if (daysToLiquidation < allowedDaysToLiquidation) {
      clusterStatesToTopUp.push({...clusterState, tokensToAdd})
      totalTokensToTopUp += tokensToAdd
    }
  }

  logger.info('getClusterStatesToTopUp finished')

  return {
    clusterStatesToTopUp,
    totalTokensToTopUp
  }
}
