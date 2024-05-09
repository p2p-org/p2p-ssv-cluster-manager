import { encodeFunctionData } from "viem"
import { P2pSsvProxyFactoryAbi } from "../contracts/P2pSsvProxyFactoryContract"
import { MetaTransaction } from "../../safe/models/MetaTransaction"
import { logger } from "../../common/helpers/logger"
import { SSVTokenAbi } from "../contracts/SSVTokenContract"
import { waitForHashToBeApprovedAndExecute } from "../../safe/waitForHashToBeApprovedAndExecute"
import { ClusterStateApi, toClusterState } from "../models/ClusterStateApi"
import { getClusterStatesToTopUp } from "../reads/getClusterStatesToTopUp"
import { SSVNetworkAbi } from "../contracts/SSVNetworkContract"

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
  if (!process.env.SSV_NETWORK_ADDRESS) {
    throw new Error("No SSV_NETWORK_ADDRESS in ENV")
  }
  if (!process.env.SSV_TOKEN_ADDRESS) {
    throw new Error("No SSV_TOKEN_ADDRESS in ENV")
  }

  const {clusterStatesToTopUp, totalTokensToTopUp} = await getClusterStatesToTopUp()

  if (totalTokensToTopUp === 0n) {
    logger.info('totalTokensToTopUp == 0 No need to top up.')
    logger.info('transferSsvTokensFromFactoryToClusters finished')
    return
  }
  const metaTxs = getMetaTxs(totalTokensToTopUp, clusterStatesToTopUp)

  await waitForHashToBeApprovedAndExecute(metaTxs)

  logger.info('transferSsvTokensFromFactoryToClusters finished')
}

type ClusterStateToTopUp = ClusterStateApi & {tokensToAdd: bigint}

function getMetaTxs(
  totalTokensToTopUp: bigint,
  clusterStatesToTopUp: ClusterStateToTopUp[]
) {

  const metaTxs: MetaTransaction[] = []

  const approveData = encodeFunctionData({
    abi: SSVTokenAbi,
    functionName: "approve",
    args: [process.env.SSV_NETWORK_ADDRESS, totalTokensToTopUp]
  })
  const approveMetaTx = {
    to: process.env.SSV_TOKEN_ADDRESS as `0x${string}`,
    data: approveData
  }
  metaTxs.push(approveMetaTx)

  const transferSsvTokensToGsData = encodeFunctionData({
    abi: P2pSsvProxyFactoryAbi,
    functionName: "transferERC20",
    args: [process.env.SSV_TOKEN_ADDRESS, process.env.SAFE_ADDRESS, totalTokensToTopUp]
  })
  const transferSsvTokensToGsTx = {
    to: process.env.P2P_SSV_PROXY_FACTORY_ADDRESS as `0x${string}`,
    data: transferSsvTokensToGsData
  }
  metaTxs.push(transferSsvTokensToGsTx)

  for (const clusterStateApi of clusterStatesToTopUp) {
    const cluster = toClusterState(clusterStateApi)

    const depositData = encodeFunctionData({
      abi: SSVNetworkAbi,
      functionName: "deposit",
      args: [clusterStateApi.ownerAddress, clusterStateApi.operators, clusterStateApi.tokensToAdd, cluster]
    })
    const depositMetaTx = {
      to: process.env.SSV_NETWORK_ADDRESS as `0x${string}`,
      data: depositData
    }
    metaTxs.push(depositMetaTx)
  }

  return metaTxs
}
