import "dotenv/config"
import express, { Request, Response } from 'express'
import { logger } from "./scripts/common/helpers/logger"
import { transferSsvTokensFromFactoryToClusters } from "./scripts/ssv/writes/transferSsvTokensFromFactoryToClusters"
import { logEnv } from "./scripts/common/helpers/logEnv"
import { removeExitedValidatorsFromClusters } from "./scripts/ssv/writes/removeExitedValidatorsFromClusters"
import { withdrawExcessTokensFromClusters } from "./scripts/ssv/writes/withdrawExcessTokensFromClusters"

const app = express()

app.get('/', (req: Request, res: Response) => {
    res.send('p2p-ssv-cluster-manager server')
})

app.get('/01-transfer-ssv-tokens-from-factory-to-clusters', async (req: Request, res: Response) => {
    logger.info('01-transfer-ssv-tokens-from-factory-to-clusters started')
    res.send('01-transfer-ssv-tokens-from-factory-to-clusters started at ' + new Date().toISOString())
    logEnv()
    await transferSsvTokensFromFactoryToClusters()
    logger.info('01-transfer-ssv-tokens-from-factory-to-clusters finished')
})

app.get('/02-remove-exited-validators-from-clusters', async (req: Request, res: Response) => {
    logger.info('02-remove-exited-validators-from-clusters started')
    res.send('02-remove-exited-validators-from-clusters started at ' + new Date().toISOString())
    logEnv()
    await removeExitedValidatorsFromClusters()
    logger.info('02-remove-exited-validators-from-clusters finished')
})

app.get('/03-withdraw-excess-tokens-from-clusters', async (req: Request, res: Response) => {
    logger.info('03-withdraw-excess-tokens-from-clusters started')
    res.send('03-withdraw-excess-tokens-from-clusters started at ' + new Date().toISOString())
    logEnv()
    await withdrawExcessTokensFromClusters()
    logger.info('03-withdraw-excess-tokens-from-clusters finished')
})

app.listen(process.env.PORT, () => logger.info('Server started on port', process.env.PORT))
