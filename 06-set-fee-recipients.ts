import 'dotenv/config'
import { logger } from './scripts/common/helpers/logger'
import process from 'process'
import { claimMainnetIncentives } from './scripts/ssv/writes/claimMainnetIncentives'
import { setFeeRecipients } from './scripts/ssv/writes/setFeeRecipients'

async function main() {
  logger.info('06-set-fee-recipients started')

  await setFeeRecipients()

  logger.info('06-set-fee-recipients finished')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
