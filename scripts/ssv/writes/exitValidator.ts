import { logger } from '../../common/helpers/logger'
import { SSVNetworkAbi } from '../contracts/SSVNetworkContract'
import { sendTx } from '../../common/helpers/sendTx'

export async function exitValidator() {
  logger.log('exitValidator started')

  const publicKey =
    '0xb9634a73f8cae79e8f8e9758b76c1777d6f2bfbd851e7845b7a4adbf69cca4338adda1ff03360692a2a29b144a498e7f'
  const operatorIds = [374, 378, 382, 386]

  const txHash = await sendTx(
    '0xc2d42368d94E2D5d82F3b05a06Ec53eBFb81Ce0f',
    SSVNetworkAbi,
    'exitValidator',
    [publicKey, operatorIds],
  )

  logger.log('exitValidator finished')

  return txHash
}
