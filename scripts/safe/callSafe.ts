import { GnosisSafeAbi, GnosisSafeAddresss } from "./contracts/GnosisSafe"
import { logger } from "../common/helpers/logger"
import { sendTx } from "../common/helpers/sendTx"
import { zeroAddress } from "viem"

export async function callSafe(data: string) {
  logger.log('callSafe started')

  if (!process.env.MULTISEND_CALL_ONLY_ADDRESS) {
    throw new Error("No MULTISEND_CALL_ONLY_ADDRESS in ENV")
  }
  if (!process.env.SAFE_OWNER_ADDRESS_1) {
    throw new Error("No SAFE_OWNER_ADDRESS_1 in ENV")
  }
  if (!process.env.SAFE_OWNER_ADDRESS_2) {
    throw new Error("No SAFE_OWNER_ADDRESS_2 in ENV")
  }

  const to = process.env.MULTISEND_CALL_ONLY_ADDRESS
  const value = 0
  const operation = 1 // always DelegateCall for MultiSendCallOnly
  const safeTxGas = 0
  const baseGas = 0
  const gasPrice = 0
  const gasToken = zeroAddress
  const refundReceiver = zeroAddress
  const signatures = '0x' +
    '000000000000000000000000' +
    process.env.SAFE_OWNER_ADDRESS_1.replace('0x', '') +
    '000000000000000000000000000000000000000000000000000000000000000001' +
    '000000000000000000000000' +
    process.env.SAFE_OWNER_ADDRESS_2.replace('0x', '') +
    '000000000000000000000000000000000000000000000000000000000000000001'

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

