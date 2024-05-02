import { logger } from "../../common/helpers/logger"
import { ClusterStateApi } from "../models/ClusterStateApi"
import { getOperatorFee } from "./getOperatorFee"
import { getNetworkFee } from "./getNetworkFee"
import { getMinimumLiquidationCollateral } from "./getMinimumLiquidationCollateral"

export async function getDaysToLiquidation(clusterState: ClusterStateApi) {
  logger.info('getDaysToLiquidation started for ' + clusterState.clusterId)

  const {balance, validatorCount, operators} = clusterState

  const minimumLiquidationCollateral = await getMinimumLiquidationCollateral()

  const balanceAfterMinimumLiquidationCollateral = balance - minimumLiquidationCollateral

  const balancePerValidator = balanceAfterMinimumLiquidationCollateral / BigInt(validatorCount)

  let totalFeePerBlock = 0n
  for (const operatorId of operators) {
    const operatorFee = await getOperatorFee(operatorId)
    totalFeePerBlock += operatorFee
  }

  const networkFee = await getNetworkFee()
  totalFeePerBlock += networkFee

  const runwayInBlocks = balancePerValidator / totalFeePerBlock

  const blocksPerDay = 7200n

  const runwayInDays = runwayInBlocks / blocksPerDay

  logger.info('Days To Liquidation = ' + runwayInDays)

  logger.info('getDaysToLiquidation finished for ' + clusterState.clusterId)

  return runwayInDays
}
