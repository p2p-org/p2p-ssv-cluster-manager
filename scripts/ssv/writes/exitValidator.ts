import { logger } from '../../common/helpers/logger'
import { SSVNetworkAbi } from '../contracts/SSVNetworkContract'
import { sendTx } from '../../common/helpers/sendTx'

export async function exitValidator() {
  logger.log('exitValidator started')

  const publicKey =
    '0x95e3923136465fe4daa40a593c389ddea1b075627a09c388df65ae854b082620d669fb799fd49b19320912d1b2051e07'
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
