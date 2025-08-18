import { GnosisSafeAbi, GnosisSafeAddresss } from './contracts/GnosisSafe'
import { logger } from '../common/helpers/logger'
import { sendTx } from '../common/helpers/sendTx'
import { getGsTxData } from './getGsTxData'
import { getGsSignatures } from './getGsSignatures'
import { MetaTransaction } from './models/MetaTransaction'
import { encodeMultiSend } from './multisend'

export async function execTransactionWithThreshold1(metaTxs: MetaTransaction[]) {
  logger.log('execTransactionWithThreshold1 started')

  const txsForMultiSend = encodeMultiSend(metaTxs)

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
  } = getGsTxData(txsForMultiSend)

  if (!process.env.SAFE_OWNER_ADDRESS_1) {
    throw new Error('No SAFE_OWNER_ADDRESS_1 in ENV')
  }

  const signatures =
    '0x' +
    '000000000000000000000000' +
    process.env.SAFE_OWNER_ADDRESS_1.replace('0x', '') +
    '000000000000000000000000000000000000000000000000000000000000000001'

  let txHash = await sendTx(
    GnosisSafeAddresss,
    GnosisSafeAbi,
    'execTransaction',
    [
      to,
      value,
      data,
      operation,
      safeTxGas,
      baseGas,
      gasPrice,
      gasToken,
      refundReceiver,
      signatures,
    ],
  )

  logger.log('execTransactionWithThreshold1 finished')

  return txHash
}
