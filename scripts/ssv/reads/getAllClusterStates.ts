import {logger} from "../../common/helpers/logger";
import { getProxiesWithOperatorIds } from "./getProxiesWithOperatorIds"
import { getClusterStateFromApi } from "./getClusterStateFromApi"
import { ClusterStateApi } from "../models/ClusterStateApi"

export async function getAllClusterStates() {
    logger.log('getAllClusterStates started')

    const clusterStates: ClusterStateApi[] = []
    const proxiesWithOperatorIds = await getProxiesWithOperatorIds()

    for (const proxy of Object.keys(proxiesWithOperatorIds)) {
        for (const clusterOperatorIds of proxiesWithOperatorIds[proxy]) {
            const clusterState = await getClusterStateFromApi(proxy, clusterOperatorIds)
            clusterStates.push(clusterState)
        }
    }

    logger.log('getAllClusterStates finished')

    return clusterStates
}
