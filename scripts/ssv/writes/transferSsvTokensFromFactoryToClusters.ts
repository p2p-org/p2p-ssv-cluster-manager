import { encodeFunctionData, parseEther } from "viem"
import { P2pSsvProxyFactoryAbi } from "../contracts/P2pSsvProxyFactoryContract"
import { MetaTransaction } from "../../safe/models/MetaTransaction"
import process from "process"
import { encodeMultiSend } from "../../safe/multisend"
import { execTransaction } from "../../safe/execTransaction"
import { logger } from "../../common/helpers/logger"
import { publicClient } from "../../common/helpers/clients"
import { getHashToApprove } from "../../safe/getHashToApprove"
import { GnosisSafeAbi } from "../../safe/contracts/GnosisSafe"

export async function transferSsvTokensFromFactoryToClusters() {
  logger.info('transferSsvTokensFromFactoryToClusters started')

  if (!process.env.P2P_SSV_PROXY_FACTORY_ADDRESS) {
    throw new Error("No P2P_SSV_PROXY_FACTORY_ADDRESS in ENV")
  }
  if (!process.env.SAFE_ADDRESS) {
    throw new Error("No SAFE_ADDRESS in ENV")
  }
  if (!process.env.SAFE_OWNER_ADDRESS_2) {
    throw new Error("No SAFE_OWNER_ADDRESS_2 in ENV")
  }

  /*

  1. Fetch all clusters
  2. For each cluster:
  3. Get liquidation date
  4. If liquidation date is closer than a month from now:
  5. Calculate the required token amount to have enough for a month

  Do this as 1 exec tx (first approve hash, then listen to the approval and then excute)
  6. Withdraw tokens from factory to safe (once for all clusters), if not enough - throw an error
  7. Deposit tokens to clusters from safe

   */


  const data1 = encodeFunctionData({
    abi: P2pSsvProxyFactoryAbi,
    functionName: 'setMaxSsvTokenAmountPerValidator',
    args: [parseEther("42")]
  })
  const data2 = encodeFunctionData({
    abi: P2pSsvProxyFactoryAbi,
    functionName: 'setAllowedSelectorsForOperator',
    args: [['0x6a761202', '0x12345678']]
  })

  const metaTxs: MetaTransaction[] = [
    {
      to: process.env.P2P_SSV_PROXY_FACTORY_ADDRESS as `0x${string}`,
      data: data1
    },
    {
      to: process.env.P2P_SSV_PROXY_FACTORY_ADDRESS as `0x${string}`,
      data: data2
    }
  ]

  const txsForMultiSend = encodeMultiSend(metaTxs)

  const hashToApprove = await getHashToApprove(txsForMultiSend)

  const unwatch = publicClient.watchContractEvent({
    address: process.env.SAFE_ADDRESS as `0x${string}`,
    abi: GnosisSafeAbi,
    eventName: 'ApproveHash',
    args: [hashToApprove, process.env.SAFE_OWNER_ADDRESS_2],
    onError: async (error) => {
      logger.error(error)
      unwatch()
      logger.info('transferSsvTokensFromFactoryToClusters finished')
    },
    onLogs: async (logs) => {
      try {
        await execTransaction(txsForMultiSend)
        unwatch()
        logger.info('transferSsvTokensFromFactoryToClusters finished')
      } catch (error) {
        logger.error(error)
      }
    }
  })
}
