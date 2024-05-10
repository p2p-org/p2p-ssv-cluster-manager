import 'dotenv/config'
import { logger } from './scripts/common/helpers/logger'
import { transferSsvTokensFromFactoryToClusters } from './scripts/ssv/writes/transferSsvTokensFromFactoryToClusters'

async function main() {
  logger.info('01-transfer-ssv-tokens-from-factory-to-clusters started')

  await transferSsvTokensFromFactoryToClusters()

  logger.info('01-transfer-ssv-tokens-from-factory-to-clusters finished')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
