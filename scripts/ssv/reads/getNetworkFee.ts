import { logger } from "../../common/helpers/logger"
import { SSVNetworkViewsContract } from "../contracts/SSVNetworkViewsContract"

export async function getNetworkFee() {
  logger.info('getOperatorFee started')

  const networkFee = await SSVNetworkViewsContract.read.getNetworkFee() as bigint

  logger.info('getNetworkFee finished')

  return networkFee
}
