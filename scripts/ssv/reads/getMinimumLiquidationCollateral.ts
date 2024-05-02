import { logger } from "../../common/helpers/logger"
import { SSVNetworkViewsContract } from "../contracts/SSVNetworkViewsContract"

export async function getMinimumLiquidationCollateral() {
  logger.info('getMinimumLiquidationCollateral started')

  const minimumLiquidationCollateral = await SSVNetworkViewsContract.read.getMinimumLiquidationCollateral() as bigint

  logger.info('getMinimumLiquidationCollateral finished')

  return minimumLiquidationCollateral
}
