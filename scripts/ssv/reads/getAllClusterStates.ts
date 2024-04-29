import {logger} from "../../common/helpers/logger";
import { getProxiesWithOperatorIds } from "./getProxiesWithOperatorIds"
import { getClusterIdFromApi } from "./getClusterIdFromApi"

export async function getAllClusterStates() {
    logger.log('getAllClusterStates started')

    const clusterStates = []
    const proxiesWithOperatorIds = await getProxiesWithOperatorIds()

    for (const proxy of Object.keys(proxiesWithOperatorIds)) {
        for (const clusterOperatorIds of proxiesWithOperatorIds[proxy]) {
            const clusterId = await getClusterIdFromApi(proxy, clusterOperatorIds)
            clusterStates.push(clusterId)
        }
    }

    logger.log('getAllClusterStates finished')

    return clusterStates
}
