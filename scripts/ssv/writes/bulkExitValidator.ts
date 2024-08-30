import { logger } from '../../common/helpers/logger'
import { SSVNetworkAbi } from '../contracts/SSVNetworkContract'
import { sendTx } from '../../common/helpers/sendTx'
import { getClusterPubkeysPageFromApi } from '../reads/getClusterPubkeysPageFromApi'

export async function bulkExitValidator() {
  logger.log('bulkExitValidator started')

  // const pubkeys1 = await getClusterPubkeysPageFromApi('0x24d5c4ebf2f7f38b9124c332461bd9eb7f3d7910a928178da20d1866eb20e511', 1)
  // const pubkeys2 = await getClusterPubkeysPageFromApi('0x24d5c4ebf2f7f38b9124c332461bd9eb7f3d7910a928178da20d1866eb20e511', 2)

  const publicKeys: string[] = [
    '0x82c6d66b0e9ca1651dd66a1deddcf5e30625067f28710133e2d57008b82a149c2ca894c6f1b0bb686be144827a1d95e1'
  ]
  const operatorIds = [563,564,565,566]

  const txHash = await sendTx(
    '0x30625E850f1Fe84e8F98653d55D4293cB9c7fd45',
    SSVNetworkAbi,
    'bulkExitValidator',
    [publicKeys, operatorIds],
  )

  logger.log('bulkExitValidator finished')

  return txHash
}
