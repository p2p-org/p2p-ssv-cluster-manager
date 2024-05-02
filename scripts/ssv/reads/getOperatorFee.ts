import { logger } from "../../common/helpers/logger"
import { SSVNetworkViewsContract } from "../contracts/SSVNetworkViewsContract"

export async function getOperatorFee(operatorId: number | bigint) {
  logger.info('getOperatorFee started for ' + operatorId)

  const operatorFee = await SSVNetworkViewsContract.read.getOperatorFee([
    operatorId
  ]) as bigint

  logger.info('getOperatorFee finished for ' + operatorId)

  return operatorFee
}
