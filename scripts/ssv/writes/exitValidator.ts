import { logger } from '../../common/helpers/logger'
import { SSVNetworkAbi } from '../contracts/SSVNetworkContract'
import { sendTx } from '../../common/helpers/sendTx'

export async function exitValidator() {
  logger.log('exitValidator started')

  const publicKey =
    '0xa3aec4006338aa6cddb2eb96de7bc685bf60848fe8bd78ea9979b2e227e53364ada842282a55c1bb9058b7f522e5ebfa'
  const operatorIds = [192, 195, 200, 201]

  const txHash = await sendTx(
    '0x944991724cFA9E218f73bA03608913dA9a21F9b7',
    SSVNetworkAbi,
    'exitValidator',
    [publicKey, operatorIds],
  )

  logger.log('exitValidator finished')

  return txHash
}
