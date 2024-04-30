import { GnosisSafeContract } from "./contracts/GnosisSafe"
import { logger } from "../common/helpers/logger"
import { getGsTxData } from "./getGsTxData"

export async function getHashToApprove(transactions: string) {
  logger.log('getHashToApprove started')

  const {
    to, value, data,
    operation, safeTxGas, baseGas,
    gasPrice, gasToken,
    refundReceiver
  } = getGsTxData(transactions)

  const _nonce = await GnosisSafeContract.read.nonce()

  logger.log('_nonce: ' + _nonce)

  const hashToApprove = await GnosisSafeContract.read.encodeTransactionData([
    to, value, data, operation, safeTxGas, baseGas, gasPrice, gasToken, refundReceiver, _nonce
  ])

  logger.log('hashToApprove: ' + hashToApprove)

  logger.log('getHashToApprove finished')

  return hashToApprove
}

