import axios from 'axios'
import { logger } from '../../common/helpers/logger'
import { isHolesky } from '../../common/helpers/clients'

export async function getClusterPubkeysPageFromApi(
  clusterId: string,
  page: number
): Promise<string[]> {
  const args = `hash/${clusterId}?page=${page}&perPage=100`
  logger.info('getClusterPubkeysPageFromApi started for ' + args)

  if (!process.env.BEACON_URL) {
    throw new Error('No BEACON_URL in ENV')
  }

  const result = await axios.get(
    `https://api.ssv.network/api/v4/${isHolesky ? 'holesky' : 'mainnet'}/clusters/` +
      args,
  )

  logger.info('getClusterPubkeysPageFromApi finished for ' + args)
  return (result.data.validators as ValidatorApi[])
    .filter((v: ValidatorApi) => v.is_valid && !v.is_deleted)
    .map(v => '0x' + v.public_key)
}

interface ValidatorApi {
  "status": string,
  "public_key": string,
  "is_valid": boolean,
  "is_deleted": boolean,
  "is_public_key_valid": boolean,
  "is_shares_valid": boolean,
  "is_operators_valid": boolean
}
