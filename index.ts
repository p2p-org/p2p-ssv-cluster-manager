import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import {P2pSsvProxyFactoryContract} from "./scripts/ssv/contracts/P2pSsvProxyFactoryContract";

// 1. Check validator status == exited
// 2. Remove validator from SSV
// 3. If cluster empty, withdraw

async function main() {
    const logs = await P2pSsvProxyFactoryContract.getEvents.Transfer()
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
