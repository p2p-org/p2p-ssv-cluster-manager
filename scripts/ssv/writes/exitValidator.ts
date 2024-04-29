import { logger } from "../../common/helpers/logger"
import { SSVNetworkAbi } from "../contracts/SSVNetworkContract"
import { sendTx } from "../../common/helpers/sendTx"

export async function exitValidator() {
  logger.log('exitValidator started')

  const publicKey = '0xaf1af4ff38f09d3f0e6bb15637cd69a435b4d56437b07c058ed0e47511cecc6354730739dbd2389ffb112d62927e1a60'
  const operatorIds = [192, 195, 200, 201]

  const txHash = await sendTx(
    '0x5071e29F49F9B008267D2Ed76D54B32D91695cDe',
    SSVNetworkAbi,
    'exitValidator',
    [publicKey, operatorIds]
  )

  logger.log('exitValidator finished')

  return txHash
}
