import { logger } from '../../common/helpers/logger'
import { SSVNetworkAbi } from '../contracts/SSVNetworkContract'
import { sendTx } from '../../common/helpers/sendTx'
import { getClusterPubkeysPageFromApi } from '../reads/getClusterPubkeysPageFromApi'

export async function bulkExitValidator() {
  logger.log('bulkExitValidator started')

  const pubkeys1 = await getClusterPubkeysPageFromApi('0x24d5c4ebf2f7f38b9124c332461bd9eb7f3d7910a928178da20d1866eb20e511', 1)
  const pubkeys2 = await getClusterPubkeysPageFromApi('0x24d5c4ebf2f7f38b9124c332461bd9eb7f3d7910a928178da20d1866eb20e511', 2)

  const publicKeys: string[] = [...pubkeys1, ...pubkeys2].slice(0, 188)
  const operatorIds = [374, 378, 382, 386]

  const txHash = await sendTx(
    '0xc2d42368d94E2D5d82F3b05a06Ec53eBFb81Ce0f',
    SSVNetworkAbi,
    'bulkExitValidator',
    [publicKeys.slice(0, 2), operatorIds],
  )

  logger.log('bulkExitValidator finished')

  return txHash
}
