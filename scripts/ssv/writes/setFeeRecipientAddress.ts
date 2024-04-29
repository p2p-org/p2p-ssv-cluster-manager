import { logger } from "../../common/helpers/logger"
import { SSVNetworkAbi } from "../contracts/SSVNetworkContract"
import { predictFeeDistributorAddress } from "../reads/predictFeeDistributorAddress"
import { sendTx } from "../../common/helpers/sendTx"

export async function setFeeRecipientAddress() {
  logger.log('setFeeRecipientAddress started')

  const predictedFeeDistributorAddress = await predictFeeDistributorAddress()

  const txHash = await sendTx(
    '0x29984aadadb3927fb8c0cf5a539a282f39066332',
    SSVNetworkAbi,
    'setFeeRecipientAddress',
    [predictedFeeDistributorAddress]
  )

  logger.log('setFeeRecipientAddress finished')

  return txHash
}
