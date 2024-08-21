import axios from 'axios'
import { logger } from '../../common/helpers/logger'
import { sleep } from '../../common/helpers/sleep'

export async function getIsValidatorExited(pubkey: string): Promise<boolean> {
  logger.info('getIsValidatorExited started for ' + pubkey)

  if (!process.env.BEACON_URL) {
    throw new Error('No BEACON_URL in ENV')
  }

  try {
    const result = await axios.get(
      process.env.BEACON_URL! + '/eth/v1/beacon/states/head/validators/' + pubkey,
    )
    const isExited = result.data.data.status === 'withdrawal_done'
    logger.info('getIsValidatorExited finished for ' + pubkey + ' ' + isExited)
    return isExited
  } catch {
    logger.info('Retrying....')
    await sleep(3000)
    return await getIsValidatorExited(pubkey)
  }
}
