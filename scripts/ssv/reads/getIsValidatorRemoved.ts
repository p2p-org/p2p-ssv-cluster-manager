import { logger } from '../../common/helpers/logger'
import {
  SSVNetworkViewsAbi,
  SSVNetworkViewsAddresss,
} from '../contracts/SSVNetworkViewsContract'
import { publicClient } from '../../common/helpers/clients'

export async function getIsValidatorRemoved(
  clusterOwner: string,
  pubkey: string,
) {
  logger.info('getIsValidatorRemoved started for ' + pubkey)

  const isActive = await publicClient.readContract({
    address: SSVNetworkViewsAddresss,
    abi: SSVNetworkViewsAbi,
    functionName: 'getValidator',
    args: [clusterOwner, pubkey],
  })

  const isRemoved = !isActive

  logger.info('getIsValidatorRemoved finished for ' + pubkey + ' ' + isRemoved)
  return isRemoved
}
