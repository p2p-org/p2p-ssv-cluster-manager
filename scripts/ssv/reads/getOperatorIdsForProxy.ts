import { logger } from '../../common/helpers/logger'
import { isHolesky, publicClient } from '../../common/helpers/clients'
import { decodeEventLog } from 'viem'
import {
  SSVNetworkAbi,
  SSVNetworkAddresss,
} from '../contracts/SSVNetworkContract'
import { getPubkeysForProxy } from './getPubkeysForProxy'
import { sleep } from '../../common/helpers/sleep'

export async function getOperatorIdsForProxy(proxy: string) {
  logger.info('getOperatorIdsForProxy started for ' + proxy)

  await sleep(2000)

  const logs = await publicClient.getContractEvents({
    address: SSVNetworkAddresss,
    abi: SSVNetworkAbi,
    eventName: 'ValidatorAdded',
    fromBlock: isHolesky ? 1502570n : 1000000n,
    toBlock: 'latest',
    strict: true,
    args: {
      owner: proxy,
    },
  })

  const operatorIds = logs.map(
    (log) =>
      (
        decodeEventLog({
          abi: SSVNetworkAbi,
          data: log.data,
          topics: log.topics,
        }).args as unknown as { operatorIds: bigint[] }
      ).operatorIds,
  )

  logger.info('getOperatorIdsForProxy finished for ' + proxy)

  return operatorIds
}
