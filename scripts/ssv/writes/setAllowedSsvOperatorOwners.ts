import { logger } from '../../common/helpers/logger'
import { SSVNetworkAbi } from '../contracts/SSVNetworkContract'
import { predictFeeDistributorAddress } from '../reads/predictFeeDistributorAddress'
import { sendTx } from '../../common/helpers/sendTx'
import { P2pSsvProxyFactoryAbi_3_1, P2pSsvProxyFactoryAddress_3_1 } from '../contracts/P2pSsvProxyFactoryContract_3_1'
import { encodeFunctionData } from 'viem'
import { waitForHashToBeApprovedAndExecute } from '../../safe/waitForHashToBeApprovedAndExecute'
import { MetaTransaction } from '../../safe/models/MetaTransaction'

export async function setAllowedSsvOperatorOwners() {
  logger.log('setAllowedSsvOperatorOwners started')

  const calldata = encodeFunctionData({
    abi: P2pSsvProxyFactoryAbi_3_1,
    functionName: 'setAllowedSsvOperatorOwners',
    args: [
      // ['0x1f72FC2585D283DfEcF748cc5d19c014158A7C6f']
      [
        // '0x95b3D923060b7E6444d7C3F0FCb01e6F37F4c418',
        // '0x47659cc5fB8CDC58bD68fEB8C78A8e19549d39C5',
        // '0x9a792B1588882780Bed412796337E0909e51fAB7',
        '0xfeC26f2bC35420b4fcA1203EcDf689a6e2310363'
      ]
    ],
  })

  const metaTxs: MetaTransaction[] = []

  const metaTx = {
    to: P2pSsvProxyFactoryAddress_3_1 as `0x${string}`,
    data: calldata,
  }
  metaTxs.push(metaTx)

  const txHash = await waitForHashToBeApprovedAndExecute(metaTxs)

  logger.log('setAllowedSsvOperatorOwners finished')

  return txHash
}
