import { logger } from '../../common/helpers/logger'
import { getP2pSsvProxies } from './getP2pSsvProxies'
import { getOperatorIdsForProxy } from './getOperatorIdsForProxy'

export async function getProxiesWithOperatorIds() {
  logger.log('getProxiesWithOperatorIds started')

  const proxies = await getP2pSsvProxies()

  const proxiesWithOperatorIds: Record<string, bigint[][]> = {}
  for (const proxy of proxies) {
    const operatorIdsForProxy = await getOperatorIdsForProxy(proxy)

    proxiesWithOperatorIds[proxy] = uniqueArrays(operatorIdsForProxy)
  }

  logger.log('getProxiesWithOperatorIds finished')

  return proxiesWithOperatorIds
}

function arraysEqual(arr1: bigint[], arr2: bigint[]) {
  if (arr1.length !== arr2.length) return false
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false
  }
  return true
}

function uniqueArrays(arrays: bigint[][]) {
  const unique: bigint[][] = []
  arrays.forEach((arr: bigint[]) => {
    if (!unique.some((u: bigint[]) => arraysEqual(u, arr))) {
      unique.push(arr)
    }
  })
  return unique
}
