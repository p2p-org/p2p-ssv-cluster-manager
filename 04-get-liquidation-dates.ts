import 'dotenv/config'
import { logger } from './scripts/common/helpers/logger'
import { getAllClusterStates } from './scripts/ssv/reads/getAllClusterStates'
import { getDaysToLiquidation } from './scripts/ssv/reads/getDaysToLiquidation'
import process from 'process'

async function main() {
  logger.info('04-get-liquidation-dates')

  const clusterStates = await getAllClusterStates()

  const clusterLiquidationDates = []
  for (const clusterState of clusterStates) {
    const { daysToLiquidation } =
      await getDaysToLiquidation(clusterState)

    clusterLiquidationDates.push({id: clusterState.clusterId, days: daysToLiquidation})
  }

  clusterLiquidationDates.sort((a, b) => Number(a.days - b.days))

  for (const date of clusterLiquidationDates) {
    console.log(date.id + ',' + date.days)
  }

  logger.info('04-get-liquidation-dates')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
