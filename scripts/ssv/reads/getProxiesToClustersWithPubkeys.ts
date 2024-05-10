import { logger } from '../../common/helpers/logger'
import { getP2pSsvProxies } from './getP2pSsvProxies'
import { getAddedValidatorsForProxy } from './getAddedValidatorsForProxy'

export async function getProxiesToClustersWithPubkeys() {
  logger.log('getProxiesToClustersWithPubkeys started')

  const proxies = await getP2pSsvProxies()

  const proxiesToClustersWithPubkeys: ProxyToClusterMap = {}

  const proxiesToOperatorIdsWithPubkeys: ProxyToOperatorMap = {}
  for (const proxy of proxies) {
    proxiesToOperatorIdsWithPubkeys[proxy] =
      await getAddedValidatorsForProxy(proxy)
  }

  for (const [proxy, operators] of Object.entries(
    proxiesToOperatorIdsWithPubkeys,
  )) {
    const clusterMap: Record<string, OperatorIdWithPubkey[]> = {}

    for (const { operatorIds, publicKey } of operators) {
      const key = operatorIds.join(',')

      if (!clusterMap[key]) {
        clusterMap[key] = []
      }

      clusterMap[key].push({ operatorIds, publicKey })
    }

    proxiesToClustersWithPubkeys[proxy] = clusterMap
  }

  logger.log('getProxiesToClustersWithPubkeys finished')

  return proxiesToClustersWithPubkeys
}

type OperatorIdWithPubkey = {
  operatorIds: bigint[]
  publicKey: string
}

type ProxyToOperatorMap = Record<string, OperatorIdWithPubkey[]>
type ProxyToClusterMap = Record<string, Record<string, OperatorIdWithPubkey[]>>
