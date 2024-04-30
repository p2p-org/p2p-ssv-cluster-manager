import { encodeFunctionData, zeroAddress } from "viem"
import { MultiSendCallOnlyAbi } from "./contracts/MultiSendCallOnlyAbi"

export function getGsTxData(transactions: string) {
  if (!process.env.MULTISEND_CALL_ONLY_ADDRESS) {
    throw new Error("No MULTISEND_CALL_ONLY_ADDRESS in ENV")
  }

  const to = process.env.MULTISEND_CALL_ONLY_ADDRESS
  const value = 0
  const operation = 1 // always DelegateCall for MultiSendCallOnly
  const safeTxGas = 0
  const baseGas = 0
  const gasPrice = 0
  const gasToken = zeroAddress
  const refundReceiver = zeroAddress

  const data = encodeFunctionData({
    abi: MultiSendCallOnlyAbi,
    functionName: 'multiSend',
    args: [transactions]
  })

  return {
    to, value, operation, safeTxGas, baseGas,
    gasPrice, gasToken, refundReceiver, data
  }
}
