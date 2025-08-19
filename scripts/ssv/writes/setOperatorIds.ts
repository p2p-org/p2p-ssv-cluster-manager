import { logger } from '../../common/helpers/logger'
import { SSVNetworkAbi } from '../contracts/SSVNetworkContract'
import { predictFeeDistributorAddress } from '../reads/predictFeeDistributorAddress'
import { sendTx } from '../../common/helpers/sendTx'
import { P2pSsvProxyFactoryAbi_3_1, P2pSsvProxyFactoryAddress_3_1 } from '../contracts/P2pSsvProxyFactoryContract_3_1'
import { encodeFunctionData } from 'viem'
import { waitForHashToBeApprovedAndExecute } from '../../safe/waitForHashToBeApprovedAndExecute'
import { MetaTransaction } from '../../safe/models/MetaTransaction'

export async function setSsvOperatorIds() {
  logger.log('setSsvOperatorIds started')

  // const txHash = await sendTx(
  //   P2pSsvProxyFactoryAddress_3_1,
  //   P2pSsvProxyFactoryAbi_3_1,
  //   'setSsvOperatorIds',
  //   [[52,
  //     55,
  //     57,
  //     59,
  //     0,0,0,0,0,
  //     0,0,0,0,0,
  //     0,0,0,0,0,
  //     0,0,0,0,0
  //   ], '0x1f72FC2585D283DfEcF748cc5d19c014158A7C6f'],
  // )

  const setSsvOperatorIdsCalldata = encodeFunctionData({
    abi: P2pSsvProxyFactoryAbi_3_1,
    functionName: 'setSsvOperatorIds',
    args: [
      [52,
      55,
      57,
      59,
      0,0,0,0,0,
      0,0,0,0,0,
      0,0,0,0,0,
      0,0,0,0,0
    ], '0x1f72FC2585D283DfEcF748cc5d19c014158A7C6f'],
  })

  const metaTxs: MetaTransaction[] = []

  const metaTx = {
    to: P2pSsvProxyFactoryAddress_3_1 as `0x${string}`,
    data: setSsvOperatorIdsCalldata,
  }
  metaTxs.push(metaTx)

  const txHash = await waitForHashToBeApprovedAndExecute(metaTxs)

  logger.log('setSsvOperatorIds finished')

  return txHash
}
