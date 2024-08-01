import axios from 'axios'
import { logger } from '../../common/helpers/logger'
import { ClusterStateApi } from '../models/ClusterStateApi'
import { isHolesky } from '../../common/helpers/clients'

export async function getClusterStateFromApi(
  owner: string,
  operators: bigint[],
): Promise<ClusterStateApi> {
  const args = `owner/${owner}/operators/${operators.join(',')}`
  logger.info('getClusterStateFromApi started for ' + args)

  if (!process.env.BEACON_URL) {
    throw new Error('No BEACON_URL in ENV')
  }

  const result = await axios.get(
    `https://api.ssv.network/api/v4/${isHolesky ? 'holesky' : 'mainnet'}/clusters/` +
      args,
  )

  logger.info('getClusterStateFromApi finished for ' + args)
  return result.data.data as ClusterStateApi
}
