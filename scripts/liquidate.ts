import { logger } from "./helpers/logger"
import { account, publicClient, walletClient } from "./helpers/clients"
import { BaseError, ContractFunctionRevertedError } from "viem"
import * as console from "console"
import { P2pSsvProxyContractAbi } from "./helpers/P2pSsvProxyContractAbi"

export async function liquidate() {
  logger.log('liquidate started')

  let txHash = ''

  const operatorIds = [192, 195, 200, 201]

  try {
    const { request } = await publicClient.simulateContract({
      address: '0x5071e29F49F9B008267D2Ed76D54B32D91695cDe',
      abi: P2pSsvProxyContractAbi,
      functionName: 'liquidate',
      args: [operatorIds, [
        {
          validatorCount: 0,
          networkFeeIndex: 64749941340n,
          index: 77106991716n,
          active: true,
          balance: 5725985024910000000n
        }
      ]],
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

  logger.log('liquidate finished')

  return txHash
}
