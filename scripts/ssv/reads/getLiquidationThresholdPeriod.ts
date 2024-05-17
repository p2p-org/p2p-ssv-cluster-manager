import { logger } from '../../common/helpers/logger'
import { SSVNetworkViewsContract } from '../contracts/SSVNetworkViewsContract'

export async function getLiquidationThresholdPeriod() {
  logger.info('getLiquidationThresholdPeriod started')

  const liquidationThresholdPeriod =
    (await SSVNetworkViewsContract.read.getLiquidationThresholdPeriod()) as bigint

  logger.info('getLiquidationThresholdPeriod finished')

  return liquidationThresholdPeriod
}
