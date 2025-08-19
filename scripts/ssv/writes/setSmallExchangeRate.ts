import { logger } from '../../common/helpers/logger'
import { SSVNetworkAbi } from '../contracts/SSVNetworkContract'
import { predictFeeDistributorAddress } from '../reads/predictFeeDistributorAddress'
import { sendTx } from '../../common/helpers/sendTx'
import { P2pSsvProxyFactoryAbi_3_1 } from '../contracts/P2pSsvProxyFactoryContract_3_1'

export async function setSmallExchangeRate() {
  logger.log('setSmallExchangeRate started')

  const txHash = await sendTx(
    '0x1f72FC2585D283DfEcF748cc5d19c014158A7C6f',
    P2pSsvProxyFactoryAbi_3_1,
    'setSsvPerEthExchangeRateDividedByWei',
    [1000000000000n],
  )

  logger.log('setSmallExchangeRate finished')

  return txHash
}
