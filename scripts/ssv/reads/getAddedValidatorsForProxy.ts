import { logger } from '../../common/helpers/logger'
import { isHolesky, publicClient } from '../../common/helpers/clients'
import { decodeEventLog } from 'viem'
import {
  SSVNetworkAbi,
  SSVNetworkAddresss,
} from '../contracts/SSVNetworkContract'
import { sleep } from '../../common/helpers/sleep'

export async function getAddedValidatorsForProxy(proxy: string) {
  logger.info('getAddedValidatorsForProxy started for ' + proxy)

  await sleep(1200)

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

  const validators = logs.map(
    (log) =>
      decodeEventLog({
        abi: SSVNetworkAbi,
        data: log.data,
        topics: log.topics,
      }).args as unknown as { operatorIds: bigint[]; publicKey: string },
  )

  logger.info('getAddedValidatorsForProxy finished for ' + proxy)

  return validators
}
