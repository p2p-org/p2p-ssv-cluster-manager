import { logger } from '../../common/helpers/logger'
import { SSVNetworkAbi } from '../contracts/SSVNetworkContract'
import { predictFeeDistributorAddress } from '../reads/predictFeeDistributorAddress'
import { sendTx } from '../../common/helpers/sendTx'

export async function setFeeRecipientAddress() {
  logger.log('setFeeRecipientAddress started')

  // const predictedFeeDistributorAddress = await predictFeeDistributorAddress()

  const txHash = await sendTx(
    '0xB5f1c25b24bE33DC3B67274F0AD0B81c3E38606F',
    SSVNetworkAbi,
    'setFeeRecipientAddress',
    ['0x253e9602FF7C5664fA955dAf3242Ce8518dAbd84'],
  )

  logger.log('setFeeRecipientAddress finished')

  return txHash
}
