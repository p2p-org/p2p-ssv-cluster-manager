import {logger} from "../../common/helpers/logger";
import {publicClient} from "../../common/helpers/clients";
import {decodeEventLog} from "viem";
import {SSVNetworkAbi, SSVNetworkAddresss} from "../contracts/SSVNetworkContract";

export async function getOperatorIdsForProxy(proxy: string) {
    logger.info('getOperatorIdsForProxy started for ' + proxy)

    const logs = await publicClient.getContractEvents({
        address: SSVNetworkAddresss,
        abi: SSVNetworkAbi,
        eventName: 'ValidatorAdded',
        fromBlock: 10000000n,
        toBlock: 'latest',
        strict: true,
        args: {
            owner: proxy
        }
    })

    const operatorIds = logs.map(
        (log) =>
            (decodeEventLog({
                abi: SSVNetworkAbi,
                data: log.data,
                topics: log.topics,
            }).args as unknown as {operatorIds: bigint[]}).operatorIds
    )

    logger.info('getOperatorIdsForProxy finished for ' + proxy)

    return operatorIds
}
