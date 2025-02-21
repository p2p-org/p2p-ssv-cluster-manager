import { logger } from '../../common/helpers/logger'
import {
  SSVNetworkViewsAbi,
  SSVNetworkViewsAddresss,
} from '../contracts/SSVNetworkViewsContract'
import { publicClient } from '../../common/helpers/clients'
import { sleep } from '../../common/helpers/sleep'

export async function getIsValidatorRemoved(
  clusterOwner: string,
  pubkey: string,
) {
  logger.info('getIsValidatorRemoved started for ' + pubkey)

  await sleep(3000)

  try {
    const isActive = await publicClient.readContract({
      address: SSVNetworkViewsAddresss,
      abi: SSVNetworkViewsAbi,
      functionName: 'getValidator',
      args: [clusterOwner, pubkey],
    })

    const isRemoved = !isActive

    logger.info('getIsValidatorRemoved finished for ' + pubkey + ' ' + isRemoved)
    return isRemoved
  } catch (error) {
    logger.error('getIsValidatorRemoved failed for ' + pubkey)
    logger.error(error)
    return getIsValidatorRemoved(clusterOwner, pubkey)
  }
}
