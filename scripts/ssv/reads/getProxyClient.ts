import { logger } from '../../common/helpers/logger'
import { getContract } from 'viem'
import { publicClient, walletClient } from '../../common/helpers/clients'
import { P2pSsvProxyContractAbi } from '../contracts/P2pSsvProxyContractAbi'

export async function getProxyClient(proxy: string) {
  logger.info('getProxyClient started for', proxy)

  const P2pSsvProxyContract = getContract({
    address: proxy as '0x',
    abi: P2pSsvProxyContractAbi,
    client: {
      public: publicClient,
      wallet: walletClient,
    },
  })

  const client =
    (await P2pSsvProxyContract.read.getClient()) as string

  logger.info('getProxyClient finished for', proxy)

  return client
}
