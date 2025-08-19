import { logger } from '../../common/helpers/logger'
import { SSVNetworkAbi } from '../contracts/SSVNetworkContract'
import { predictFeeDistributorAddress } from '../reads/predictFeeDistributorAddress'
import { sendTx } from '../../common/helpers/sendTx'
import { P2pSsvProxyFactoryAbi_3_1 } from '../contracts/P2pSsvProxyFactoryContract_3_1'

export async function transferOwnership() {
  logger.log('transferOwnership started')

  const txHash = await sendTx(
    '0x1f72FC2585D283DfEcF748cc5d19c014158A7C6f',
    P2pSsvProxyFactoryAbi_3_1,
    'transferOwnership',
    ['0xCbf5aA4606202161D879929a0C1AE694c644a45E'],
  )

  logger.log('transferOwnership finished')

  return txHash
}
