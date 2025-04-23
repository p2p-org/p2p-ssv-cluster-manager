import { logger } from '../../common/helpers/logger'
import {
  P2pSsvProxyFactoryAbi,
  P2pSsvProxyFactoryAddresss,
} from '../contracts/P2pSsvProxyFactoryContract'
import { isHolesky, publicClient } from '../../common/helpers/clients'
import { decodeEventLog } from 'viem'
import { getP2pSsvProxies_3_1 } from './getP2pSsvProxies_3_1'
import { sleep } from '../../common/helpers/sleep'

export async function getP2pSsvProxies() {
  logger.info('getP2pSsvProxies started')

  await sleep(2000)

  const logs = await publicClient.getContractEvents({
    address: P2pSsvProxyFactoryAddresss,
    abi: P2pSsvProxyFactoryAbi,
    eventName: 'P2pSsvProxyFactory__RegistrationCompleted',
    fromBlock: isHolesky ? 1502570n : 1000000n,
    toBlock: 'latest',
    strict: false,
  })

  const proxies = logs.map(
    (log) =>
      (
        decodeEventLog({
          abi: P2pSsvProxyFactoryAbi,
          data: log.data,
          topics: log.topics,
        }).args as unknown as { _proxy: string }
      )._proxy,
  )

  logger.info('getP2pSsvProxies finished')

  const uniqueProxies = new Set(proxies)

  const proxies_3_1 = await getP2pSsvProxies_3_1()
  proxies_3_1.forEach(p => uniqueProxies.add(p))

  return uniqueProxies
}
