import {logger} from "./helpers/logger";
import {SSVNetworkViewsAbi, SSVNetworkViewsAddresss} from "./helpers/SSVNetworkViewsContract";
import {publicClient} from "./helpers/clients";

export async function getIsValidatorRemoved(clusterOwner: string, pubkey: string) {
    logger.info('getIsValidatorRemoved started for ' + pubkey)

    const isRemoved = await publicClient.readContract({
        address: SSVNetworkViewsAddresss,
        abi: SSVNetworkViewsAbi,
        functionName: 'getValidator',
        args: [clusterOwner, pubkey]
    })

    logger.info('getIsValidatorRemoved finished for ' + pubkey + ' ' + isRemoved)
    return isRemoved
}

