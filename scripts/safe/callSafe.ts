
import { BaseError, ContractFunctionRevertedError } from "viem"
import * as console from "console"
import { GnosisSafeAbi, GnosisSafeAddresss } from "./contracts/GnosisSafe"
import { logger } from "../common/helpers/logger"
import { account, publicClient, walletClient } from "../common/helpers/clients"

export async function callSafe() {
  logger.log('callSafe started')

  let txHash = ''

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

  try {
    const { request } = await publicClient.simulateContract({
      address: GnosisSafeAddresss,
      abi: GnosisSafeAbi,
      functionName: 'execTransaction',
      args: [
        to, value, data, operation, safeTxGas, baseGas,
        gasPrice, gasToken, refundReceiver, signatures
      ],
      account
    })

    txHash = await walletClient.writeContract(request)

    console.log(txHash)
  } catch (err) {
    logger.error(err)

    if (err instanceof BaseError) {
      const revertError = err.walk(err => err instanceof ContractFunctionRevertedError)
      if (revertError instanceof ContractFunctionRevertedError) {
        const errorName = revertError.data?.errorName ?? ''

        logger.error(errorName)
      }
    }
  }

  logger.log('callSafe finished')

  return txHash
}
