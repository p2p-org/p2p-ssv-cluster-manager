import { logger } from "./logger"
import { account, publicClient, walletClient } from "./clients"
import { Address, BaseError, ContractFunctionRevertedError } from "viem"

export async function sendTx(
  address: Address,
  abi: unknown[],
  functionName: string,
  args: unknown[]
) {
  logger.log('sendTx started for ' + address + ' ' + functionName)

  let txHash = ''

  try {
    const { request } = await publicClient.simulateContract({
      address,
      abi,
      functionName,
      args,
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

  logger.log('sendTx finished for ' + address + ' ' + functionName)

  return txHash
}
