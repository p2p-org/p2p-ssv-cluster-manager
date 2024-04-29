import { GnosisSafeAbi, GnosisSafeAddresss } from "./contracts/GnosisSafe"
import { logger } from "../common/helpers/logger"
import { sendTx } from "../common/helpers/sendTx"

export async function callSafe() {
  logger.log('callSafe started')

  const to = ''
  const value = ''
  const data = ''
  const operation = ''
  const safeTxGas = ''
  const baseGas = ''
  const gasPrice = ''
  const gasToken = ''
  const refundReceiver = ''
  const signatures = ''

  let txHash = await sendTx(
    GnosisSafeAddresss,
    GnosisSafeAbi,
    'execTransaction',
    [
    to, value, data, operation, safeTxGas, baseGas,
    gasPrice, gasToken, refundReceiver, signatures
  ])

  logger.log('callSafe finished')

  return txHash
}
