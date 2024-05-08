import {logger} from "../../common/helpers/logger";
import {
    P2pSsvProxyFactoryAbi,
    P2pSsvProxyFactoryAddresss
} from "../contracts/P2pSsvProxyFactoryContract";
import { isHolesky, publicClient } from "../../common/helpers/clients"
import {decodeEventLog} from "viem";

export async function getP2pSsvProxies() {
    logger.info('getP2pSsvProxies started')

    const logs = await publicClient.getContractEvents({
        address: P2pSsvProxyFactoryAddresss,
        abi: P2pSsvProxyFactoryAbi,
        eventName: 'P2pSsvProxyFactory__RegistrationCompleted',
        fromBlock: isHolesky ? 1502570n : 1000000n,
        toBlock: 'latest',
        strict: false
    })

    const proxies = logs.map(
        (log) =>
            (decodeEventLog({
                abi: P2pSsvProxyFactoryAbi,
                data: log.data,
                topics: log.topics,
            }).args as unknown as {_proxy: string})._proxy
    )

    logger.info('getP2pSsvProxies finished')

    const uniqueProxies = new Set(proxies)

    return uniqueProxies
}
