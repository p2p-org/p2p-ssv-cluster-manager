import { encodeFunctionData } from 'viem'
import { MetaTransaction } from '../../safe/models/MetaTransaction'
import { logger } from '../../common/helpers/logger'
import { waitForHashToBeApprovedAndExecute } from '../../safe/waitForHashToBeApprovedAndExecute'
import { ClusterStateApi, toClusterState } from '../models/ClusterStateApi'
import { getClusterStatesToWithdraw } from '../reads/getClusterStatesToWithdraw'
import { P2pSsvProxyContractAbi } from '../contracts/P2pSsvProxyContractAbi'

export async function withdrawExcessTokensFromClusters() {
  logger.info('withdrawExcessTokensFromClusters started')

  if (!process.env.P2P_SSV_PROXY_FACTORY_ADDRESS) {
    throw new Error('No P2P_SSV_PROXY_FACTORY_ADDRESS in ENV')
  }
  if (!process.env.SAFE_ADDRESS) {
    throw new Error('No SAFE_ADDRESS in ENV')
  }
  if (!process.env.SAFE_OWNER_ADDRESS_2) {
    throw new Error('No SAFE_OWNER_ADDRESS_2 in ENV')
  }
  if (!process.env.SSV_NETWORK_ADDRESS) {
    throw new Error('No SSV_NETWORK_ADDRESS in ENV')
  }
  if (!process.env.SSV_TOKEN_ADDRESS) {
    throw new Error('No SSV_TOKEN_ADDRESS in ENV')
  }

  const clusterStatesToWithdraw = await getClusterStatesToWithdraw()

  if (!clusterStatesToWithdraw.length) {
    logger.info('No clusters to withdraw.')
    logger.info('withdrawExcessTokensFromClusters finished')
    return
  }
  const metaTxs = getMetaTxs(clusterStatesToWithdraw)

  await waitForHashToBeApprovedAndExecute(metaTxs)

  logger.info('withdrawExcessTokensFromClusters finished')
}

type ClusterStateToWithdraw = ClusterStateApi & { tokensToWithdraw: bigint }

function getMetaTxs(clusterStatesToWithdraw: ClusterStateToWithdraw[]) {
  const metaTxs: MetaTransaction[] = []

  for (const clusterStateApi of clusterStatesToWithdraw) {
    const cluster = toClusterState(clusterStateApi)

    const withdrawFromSSVData = encodeFunctionData({
      abi: P2pSsvProxyContractAbi,
      functionName: 'withdrawFromSSV',
      args: [
        clusterStateApi.tokensToWithdraw,
        clusterStateApi.operators,
        [cluster],
      ],
    })
    const withdrawFromSSVMetaTx = {
      to: clusterStateApi.ownerAddress as `0x${string}`,
      data: withdrawFromSSVData,
    }
    metaTxs.push(withdrawFromSSVMetaTx)

    const withdrawSSVTokensData = encodeFunctionData({
      abi: P2pSsvProxyContractAbi,
      functionName: 'withdrawSSVTokens',
      args: [
        process.env.P2P_SSV_PROXY_FACTORY_ADDRESS,
        clusterStateApi.tokensToWithdraw,
      ],
    })
    const withdrawSSVTokensMetaTx = {
      to: clusterStateApi.ownerAddress as `0x${string}`,
      data: withdrawSSVTokensData,
    }
    metaTxs.push(withdrawSSVTokensMetaTx)
  }

  return metaTxs
}
