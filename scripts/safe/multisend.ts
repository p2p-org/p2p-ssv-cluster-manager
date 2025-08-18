import { MetaTransaction } from './models/MetaTransaction'
import { encodePacked, toBytes } from 'viem'

const encodeMetaTransaction = (tx: MetaTransaction): string => {
  const data = toBytes(tx.data)
  const encoded = encodePacked(
    ['uint8', 'address', 'uint256', 'uint256', 'bytes'],
    [
      0, // always CALL
      tx.to,
      tx.value || 0n,
      BigInt(data.length),
      tx.data,
    ],
  )
  return encoded.slice(2)
}

export const encodeMultiSend = (txs: MetaTransaction[]): string => {
  return '0x' + txs.map((tx) => encodeMetaTransaction(tx)).join('')
}
