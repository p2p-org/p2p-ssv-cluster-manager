import { logger } from '../common/helpers/logger'
import { encodeMultiSend } from './multisend'
import { getHashToApprove } from './getHashToApprove'
import { publicClient } from '../common/helpers/clients'
import process from 'process'
import { GnosisSafeAbi } from './contracts/GnosisSafe'
import { execTransaction } from './execTransaction'
import { MetaTransaction } from './models/MetaTransaction'

export async function waitForHashToBeApprovedAndExecute(
  metaTxs: MetaTransaction[],
) {
  logger.info(
    'waitForHashToBeApprovedAndExecute started for ' +
      metaTxs.length +
      ' metaTxs',
  )

  const txsForMultiSend = encodeMultiSend(metaTxs)

  const hashToApprove = await getHashToApprove(txsForMultiSend)

  const promise = new Promise((resolve, reject) => {
    const unwatch = publicClient.watchContractEvent({
      address: process.env.SAFE_ADDRESS as `0x${string}`,
      abi: GnosisSafeAbi,
      eventName: 'ApproveHash',
      args: [hashToApprove, process.env.SAFE_OWNER_ADDRESS_2],
      onError: async (error) => {
        logger.info('Error occurred while waiting for hash to be approved')
        logger.error(error)
        unwatch()
        reject()
      },
      onLogs: async () => {
        try {
          logger.info('Hash got approved. Executing GS tx started')
          const txHash = await execTransaction(txsForMultiSend)
          logger.info('Executing GS tx finished')
          unwatch()
          resolve(txHash)
        } catch (error) {
          logger.info('Error occurred while executing GS tx')
          logger.error(error)
          reject()
        }
      },
    })
  })

  logger.info(
    'waitForHashToBeApprovedAndExecute finished for ' +
      metaTxs.length +
      ' metaTxs',
  )

  return promise
}
