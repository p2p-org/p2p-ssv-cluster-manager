import axios from "axios";
import {logger} from "../../common/helpers/logger";
import { isHolesky } from "../../common/helpers/clients"

export async function getClusterIdFromApi(owner: string, operators: bigint[]): Promise<string> {
    const args = `owner/${owner}/operators/${operators.join(',')}`
    logger.info('getClusterFromApi started for ' + args)

    if (!process.env.BEACON_URL) {
        throw new Error("No BEACON_URL in ENV")
    }

    const result = await axios.get(
      `https://api.ssv.network/api/v4/${isHolesky ? 'holesky' : 'mainnet'}/clusters/` + args
    )

    logger.info('getClusterFromApi finished for ' + args)
    return result.data.cluster.clusterId
}

