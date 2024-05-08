import { logger } from "../../common/helpers/logger"
import { ClusterStateApi } from "../models/ClusterStateApi"
import { getOperatorFee } from "./getOperatorFee"
import { getNetworkFee } from "./getNetworkFee"
import { getMinimumLiquidationCollateral } from "./getMinimumLiquidationCollateral"
import process from "process"

export async function getDaysToLiquidation(clusterState: ClusterStateApi) {
  logger.info('getDaysToLiquidation started for ' + clusterState.clusterId)

  if (!process.env.ALLOWED_DAYS_TO_LIQUIDATION) {
    throw new Error("No ALLOWED_DAYS_TO_LIQUIDATION in ENV")
  }

  const allowedDaysToLiquidation = BigInt(process.env.ALLOWED_DAYS_TO_LIQUIDATION)

  const {balance, validatorCount, operators} = clusterState

  const minimumLiquidationCollateral = await getMinimumLiquidationCollateral()
  const balanceAfterMinimumLiquidationCollateral = BigInt(balance) - minimumLiquidationCollateral
  const balancePerValidator = balanceAfterMinimumLiquidationCollateral / BigInt(validatorCount)

  let totalFeePerBlock = 0n
  for (const operatorId of operators) {
    const operatorFee = await getOperatorFee(operatorId)
    totalFeePerBlock += operatorFee
  }

  const networkFee = await getNetworkFee()
  totalFeePerBlock += networkFee

  const blocksToLiquidation = balancePerValidator / totalFeePerBlock
  const blocksPerDay = 7200n
  const daysToLiquidation = blocksToLiquidation / blocksPerDay
  logger.info('Days To Liquidation = ' + daysToLiquidation)

  const neededBalancePerValidator = totalFeePerBlock * blocksPerDay * allowedDaysToLiquidation
  const targetBalance = neededBalancePerValidator * BigInt(validatorCount) + minimumLiquidationCollateral
  const tokensToAdd = targetBalance - BigInt(balance)
  logger.info('tokensToAdd = ' + tokensToAdd)

  logger.info('getDaysToLiquidation finished for ' + clusterState.clusterId)

  return {daysToLiquidation, tokensToAdd}
}
