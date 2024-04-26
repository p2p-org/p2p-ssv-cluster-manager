import { logger } from "../../common/helpers/logger"
import { account, publicClient, walletClient } from "../../common/helpers/clients"
import { SSVNetworkAbi, SSVNetworkAddresss } from "../contracts/SSVNetworkContract"
import { BaseError, ContractFunctionRevertedError } from "viem"
import * as console from "console"

export async function exitValidator() {
  logger.log('exitValidator started')

  let txHash = ''

  const publicKey = '0xaf1af4ff38f09d3f0e6bb15637cd69a435b4d56437b07c058ed0e47511cecc6354730739dbd2389ffb112d62927e1a60'
  const operatorIds = [192, 195, 200, 201]

  try {
    const { request } = await publicClient.simulateContract({
      address: '0x5071e29F49F9B008267D2Ed76D54B32D91695cDe',
      abi: SSVNetworkAbi,
      functionName: 'exitValidator',
      args: [publicKey, operatorIds],
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

  logger.log('exitValidator finished')

  return txHash
}
