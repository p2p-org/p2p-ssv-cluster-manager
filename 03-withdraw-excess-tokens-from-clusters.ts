import "dotenv/config"
import {logger} from "./scripts/common/helpers/logger";
import { withdrawExcessTokensFromClusters } from "./scripts/ssv/writes/withdrawExcessTokensFromClusters"

async function main() {
    logger.info('03-withdraw-excess-tokens-from-clusters started')

    await withdrawExcessTokensFromClusters()

    logger.info('03-withdraw-excess-tokens-from-clusters finished')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

