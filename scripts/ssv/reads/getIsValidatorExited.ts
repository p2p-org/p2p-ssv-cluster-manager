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
    if (result.data.code && result.data.code == 404) {
      return false
    }

    const isExited = result.data.data.status === 'withdrawal_done'
    logger.info('getIsValidatorExited finished for ' + pubkey + ' ' + isExited)
    return isExited
  } catch (error) {
    logger.error('getIsValidatorExited failed for ' + pubkey, error)
    // @ts-ignore
    if (error?.response?.data?.code === 404) {
      return false
    }

    logger.info('Retrying....')
    await sleep(3000)
    return await getIsValidatorExited(pubkey)
  }
}
