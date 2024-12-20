import { logger } from '../../common/helpers/logger'
import { SSVNetworkAbi } from '../contracts/SSVNetworkContract'
import { Address } from 'viem'
import { ClusterState } from '../models/ClusterState'
import { sendTx } from '../../common/helpers/sendTx'

export async function bulkExitValidator(
  proxy: string,
  publicKeys: string[],
  operatorIds: (number | bigint)[]
) {
  logger.log(
    'bulkRemoveValidator started for ' + proxy,
    operatorIds.join(',') + ' ' + publicKeys.join('\n'),
  )

  const txHash = await sendTx(
    proxy as Address,
    SSVNetworkAbi,
    'bulkExitValidator',
    [publicKeys, operatorIds],
  )

  logger.log(
    'bulkRemoveValidator finished for ' + proxy,
    operatorIds.join(',') + ' ' + publicKeys.join('\n'),
  )

  return txHash
}
