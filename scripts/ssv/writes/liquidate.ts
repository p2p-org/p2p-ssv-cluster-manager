import { logger } from '../../common/helpers/logger'
import { P2pSsvProxyContractAbi } from '../contracts/P2pSsvProxyContractAbi'
import { sendTx } from '../../common/helpers/sendTx'

export async function liquidate() {
  logger.log('liquidate started')

  const operatorIds = [
    350,
    354,
    357,
    365
  ]

  const txHash = await sendTx(
    '0x29CadA9320a4D068D1F4651b9AC0AA10745317ff',
    P2pSsvProxyContractAbi,
    'liquidate',
    [
      operatorIds,
      [
        {
          validatorCount: 0,
          networkFeeIndex: 98920382919n,
          index: 363708005928n,
          active: true,
          balance: 13022762241070000000n,
        },
      ],
    ],
  )

  logger.log('liquidate finished')

  return txHash
}
