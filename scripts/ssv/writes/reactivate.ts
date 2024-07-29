import { logger } from '../../common/helpers/logger'
import { P2pSsvProxyContractAbi } from '../contracts/P2pSsvProxyContractAbi'
import { sendTx } from '../../common/helpers/sendTx'

export async function liquidate() {
  logger.log('liquidate started')

  const operatorIds = [192, 195, 200, 201]

  const txHash = await sendTx(
    '0x5071e29F49F9B008267D2Ed76D54B32D91695cDe',
    P2pSsvProxyContractAbi,
    'liquidate',
    [
      operatorIds,
      [
        {
          validatorCount: 0,
          networkFeeIndex: 64749941340n,
          index: 77106991716n,
          active: true,
          balance: 5725985024910000000n,
        },
      ],
    ],
  )

  logger.log('liquidate finished')

  return txHash
}
