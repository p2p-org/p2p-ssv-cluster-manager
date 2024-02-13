import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

async function main() {
    const client = createPublicClient({
        chain: mainnet,
        transport: http(),
    })

    const blockNumber = await client.getBlockNumber()
    console.log(blockNumber)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
