import 'dotenv/config'
import { logger } from '../../common/helpers/logger'
import { getP2pSsvProxies } from '../reads/getP2pSsvProxies'
import { MetaTransaction } from '../../safe/models/MetaTransaction'
import { encodeFunctionData } from 'viem'
import { waitForHashToBeApprovedAndExecute } from '../../safe/waitForHashToBeApprovedAndExecute'
import { getProxyClient } from '../reads/getProxyClient'
import { readFileSync } from 'fs'
import { NewFd } from '../models/NewFd'
import { SSVNetworkAbi } from '../contracts/SSVNetworkContract'

export async function setFeeRecipients() {
  logger.info('setFeeRecipients started')

  const proxies = await getP2pSsvProxies()

  const fileContent = readFileSync('ALLFds.json', 'utf-8');
  const fds: NewFd[] = JSON.parse(fileContent);

  const metaTxs: MetaTransaction[] = []

  for (const proxy of proxies) {
    try {
      const client = await getProxyClient(proxy)

      const fd = fds.find(f => f.clientAddress.toLowerCase() === client.toLowerCase())

      if (fd) {
        const newFeeRecipient = fd.newFeeDistributorAddress

        const setFeeRecipientAddressCalldata = encodeFunctionData({
          abi: SSVNetworkAbi,
          functionName: 'setFeeRecipientAddress',
          args: [newFeeRecipient],
        })
        const metaTx = {
          to: proxy as `0x${string}`,
          data: setFeeRecipientAddressCalldata,
        }
        metaTxs.push(metaTx)
      }

    } catch (error) {
      logger.error(error)
    }
  }

  logger.info(metaTxs.length, 'proxies will receive rewards')

  if (metaTxs.length) {
    await waitForHashToBeApprovedAndExecute(metaTxs)
  }

  logger.info('setFeeRecipients finished')
}
