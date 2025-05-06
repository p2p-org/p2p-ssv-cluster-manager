import 'dotenv/config'
import { logger } from '../../common/helpers/logger'
import { getP2pSsvProxies } from '../reads/getP2pSsvProxies'
import { MetaTransaction } from '../../safe/models/MetaTransaction'
import { encodeFunctionData } from 'viem'
import { CumulativeMerkleDropAbi } from '../contracts/CumulativeMerkleDropContract'
import { waitForHashToBeApprovedAndExecute } from '../../safe/waitForHashToBeApprovedAndExecute'
import { getMerkleInfo } from '../reads/getMerkleInfo'

export async function claimMainnetIncentives() {
  logger.info('claimMainnetIncentives started')

  const proxies = await getP2pSsvProxies()

  const metaTxs: MetaTransaction[] = []

  for (const proxy of proxies) {
    try {
      const { cumulativeAmount, expectedMerkleRoot, merkleProof } = getMerkleInfo(proxy)

      const calldata = encodeFunctionData({
        abi: CumulativeMerkleDropAbi,
        functionName: 'claim',
        args: [proxy, cumulativeAmount, expectedMerkleRoot, merkleProof],
      })
      const metaTx = {
        to: proxy as `0x${string}`,
        data: calldata,
      }
      metaTxs.push(metaTx)
    } catch (error) {
      logger.error(error)
    }
  }

  logger.info(metaTxs.length, 'proxies will receive rewards')

  if (metaTxs.length) {
    await waitForHashToBeApprovedAndExecute(metaTxs)
  }

  logger.info('claimMainnetIncentives finished')
}
