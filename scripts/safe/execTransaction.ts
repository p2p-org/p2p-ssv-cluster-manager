import { GnosisSafeAbi, GnosisSafeAddresss } from './contracts/GnosisSafe'
import { logger } from '../common/helpers/logger'
import { sendTx } from '../common/helpers/sendTx'
import { getGsTxData } from './getGsTxData'
import { getGsSignatures } from './getGsSignatures'

export async function execTransaction(transactions: string) {
  logger.log('callSafe started')

  const {
    to,
    value,
    data,
    operation,
    safeTxGas,
    baseGas,
    gasPrice,
    gasToken,
    refundReceiver,
  } = getGsTxData(transactions)

  const signatures = getGsSignatures()

  let txHash = await sendTx(
    GnosisSafeAddresss,
    GnosisSafeAbi,
    'execTransaction',
    [
      to,
      value,
      data,
      operation,
      safeTxGas,
      baseGas,
      gasPrice,
      gasToken,
      refundReceiver,
      signatures,
    ],
  )

  logger.log('callSafe finished')

  return txHash
}
