import { GnosisSafeContract } from './contracts/GnosisSafe'
import { logger } from '../common/helpers/logger'
import { getGsTxData } from './getGsTxData'
import { sleep } from '../common/helpers/sleep'

export async function getHashToApprove(transactions: string) {
  try {
    logger.log('getHashToApprove started')

    const {
      to,
      value,
      data,
      operation,
      safeTxGas,
      baseGas,
      gasPrice,
      gasToken,
      refundReceiver,
    } = getGsTxData(transactions)

    const _nonce = await GnosisSafeContract.read.nonce()

    logger.log('_nonce: ' + _nonce)

    const hashToApprove = (await GnosisSafeContract.read.getTransactionHash([
      to,
      value,
      data,
      operation,
      safeTxGas,
      baseGas,
      gasPrice,
      gasToken,
      refundReceiver,
      _nonce,
    ])) as string

    logger.log('getHashToApprove finished')

    logger.log(
      'Now please send "approveHash" tx with hashToApprove = ' +
      hashToApprove +
      ' to ' +
      process.env.SAFE_ADDRESS +
      ' from ' +
      process.env.SAFE_OWNER_ADDRESS_2,
    )

    return hashToApprove
  } catch (error) {
    logger.error(error)
    await sleep(5000)
    return await getHashToApprove(transactions)
  }
}
