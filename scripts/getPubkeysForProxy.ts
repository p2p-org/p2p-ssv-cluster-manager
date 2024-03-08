import {logger} from "./helpers/logger";
import {publicClient} from "./helpers/clients";
import {decodeEventLog} from "viem";
import {SSVNetworkAbi, SSVNetworkAddresss} from "./helpers/SSVNetworkContract";

export async function getPubkeysForProxy(proxy: string) {
    logger.info('getPubkeysForProxy started for ' + proxy)

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

    const pubkeys = logs.map(
        (log) =>
            (decodeEventLog({
                abi: SSVNetworkAbi,
                data: log.data,
                topics: log.topics,
            }).args as unknown as {publicKey: string}).publicKey
    )

    logger.info('getPubkeysForProxy finished for ' + proxy)

    return pubkeys
}
