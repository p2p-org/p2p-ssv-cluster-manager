import { logger } from '../../common/helpers/logger'
import { P2pSsvProxyContractAbi } from '../contracts/P2pSsvProxyContractAbi'
import { sendTx } from '../../common/helpers/sendTx'

export async function reactivate() {
  logger.log('reactivate started')

  const operatorIds = [563n, 564n, 565n, 566n]

  const txHash = await sendTx(
    '0x996F80A9e6D2743643787CD94714430E86F77A46',
    P2pSsvProxyContractAbi,
    'reactivate',
    [
      50000000000000000000n,
      operatorIds,
      [
        {
          validatorCount: 29,
          networkFeeIndex: 0n,
          index: 0n,
          active: false,
          balance: 0n,
        },
      ],
    ],
  )

  logger.log('reactivate finished')

  return txHash
}
