import { logger } from "./helpers/logger"
import { account, publicClient, walletClient } from "./helpers/clients"
import { SSVNetworkAbi, SSVNetworkAddresss } from "./helpers/SSVNetworkContract"
import { BaseError, ContractFunctionRevertedError } from "viem"
import * as console from "console"
import { predictFeeDistributorAddress } from "./predictFeeDistributorAddress"

export async function setFeeRecipientAddress() {
  logger.log('setFeeRecipientAddress started')

  let txHash = ''

  const predictedFeeDistributorAddress = await predictFeeDistributorAddress()

  try {
    const { request } = await publicClient.simulateContract({
      address: '0x944991724cFA9E218f73bA03608913dA9a21F9b7',
      abi: SSVNetworkAbi,
      functionName: 'setFeeRecipientAddress',
      args: [predictedFeeDistributorAddress],
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

  logger.log('setFeeRecipientAddress finished')

  return txHash
}
