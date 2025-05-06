import 'dotenv/config'
import { logger } from './scripts/common/helpers/logger'
import process from 'process'
import { claimMainnetIncentives } from './scripts/ssv/writes/claimMainnetIncentives'

async function main() {
  logger.info('05-claim-mainnet-incentives started')

  await claimMainnetIncentives()

  logger.info('05-claim-mainnet-incentives finished')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
