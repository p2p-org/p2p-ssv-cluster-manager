import { logger } from '../../common/helpers/logger'
import { getP2pSsvProxies } from './getP2pSsvProxies'
import { getPubkeysForProxy } from './getPubkeysForProxy'

export async function getProxiesWithPubkeys() {
  logger.log('getProxiesWithPubkeys started')

  const proxies = await getP2pSsvProxies()

  const proxiesWithPubkeys: Record<string, string[]> = {}
  for (const proxy of proxies) {
    const pubkeysForProxy = await getPubkeysForProxy(proxy)
    proxiesWithPubkeys[proxy] = pubkeysForProxy
  }

  logger.log('getProxiesWithPubkeys finished')

  return proxiesWithPubkeys
}
