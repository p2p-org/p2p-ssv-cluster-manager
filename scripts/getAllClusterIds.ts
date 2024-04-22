import {logger} from "./helpers/logger";
import {getP2pSsvProxies} from "./getP2pSsvProxies";
import {getPubkeysForProxy} from "./getPubkeysForProxy";
import { getOperatorIdsForProxy } from "./getOperatorIdsForProxy"
import { getProxiesWithOperatorIds } from "./getProxiesWithOperatorIds"
import { getClusterIdFromApi } from "./getClusterIdFromApi"

export async function getAllClusterIds() {
    logger.log('getAllClusterIds started')

    const clusterIds = []
    const proxiesWithOperatorIds = await getProxiesWithOperatorIds()

    for (const proxy of Object.keys(proxiesWithOperatorIds)) {
        for (const clusterOperatorIds of proxiesWithOperatorIds[proxy]) {
            const clusterId = await getClusterIdFromApi(proxy, clusterOperatorIds)
            clusterIds.push(clusterId)
        }
    }

    logger.log('getAllClusterIds finished')

    return clusterIds
}
