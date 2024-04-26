import { logger } from "../../common/helpers/logger"
import { account, publicClient, walletClient } from "../../common/helpers/clients"
import { SSVNetworkAbi, SSVNetworkAddresss } from "../contracts/SSVNetworkContract"
import { BaseError, ContractFunctionRevertedError } from "viem"
import * as console from "console"
import { predictFeeDistributorAddress } from "../reads/predictFeeDistributorAddress"

export async function setFeeRecipientAddress() {
  logger.log('setFeeRecipientAddress started')

  let txHash = ''

  const predictedFeeDistributorAddress = await predictFeeDistributorAddress()

  try {
    const { request } = await publicClient.simulateContract({
      address: '0x29984aadadb3927fb8c0cf5a539a282f39066332',
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
