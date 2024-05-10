import 'dotenv/config'
import { logger } from './scripts/common/helpers/logger'
import { removeExitedValidatorsFromClusters } from './scripts/ssv/writes/removeExitedValidatorsFromClusters'

async function main() {
  logger.info('02-remove-exited-validators-from-clusters started')

  await removeExitedValidatorsFromClusters()

  logger.info('02-remove-exited-validators-from-clusters finished')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
