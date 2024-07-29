import 'dotenv/config'
import { logger } from './scripts/common/helpers/logger'
import { getIsValidatorExited } from './scripts/ssv/reads/getIsValidatorExited'
import { getIsValidatorRemoved } from './scripts/ssv/reads/getIsValidatorRemoved'
import { exitValidator } from './scripts/ssv/writes/exitValidator'
import { reactivate } from './scripts/ssv/writes/reactivate'
import { setFeeRecipientAddress } from './scripts/ssv/writes/setFeeRecipientAddress'
import { removeExitedValidatorsFromClusters } from './scripts/ssv/writes/removeExitedValidatorsFromClusters'
import { transferSsvTokensFromFactoryToClusters } from './scripts/ssv/writes/transferSsvTokensFromFactoryToClusters'

async function main() {
  logger.info('97-test started')

  await reactivate()

  logger.info('97-test finished')
}

async function test_exitValidator() {
  await exitValidator()
}

async function test_removeExitedValidatorsFromClusters() {
  await removeExitedValidatorsFromClusters()
}

async function test_setFeeRecipientAddress() {
  const txHash = await setFeeRecipientAddress()
}

async function test_getIsValidatorExited() {
  const isExited = await getIsValidatorExited(
    '0xb8591e4016dc4aa56c72516c91c281154cde46f9fb2316c4c2e2d23870c907eca6a559227679a99ac2753b1bf8a9d6f2',
  )
}

async function test_getIsValidatorRemoved() {
  const isRemoved = await getIsValidatorRemoved(
    '0x293f1c1daaf99a13a92ebe76bccd2bedf9289906',
    '0xa555ce9c4aa8d3755aca8cd15aadbac671628e3600e35d4f7d8ba46bb5b133ac2b95cf8d2f02f911b6422e8efbc0b1cc',
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
