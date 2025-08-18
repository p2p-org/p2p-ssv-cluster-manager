import { FeeRecipient } from '../models/SharesFileTypes'
import {
  P2pSsvProxyFactoryContract_3_1
} from '../contracts/P2pSsvProxyFactoryContract_3_1'

export async function predictP2pSsvProxyAddress_3_1(clientConfig: FeeRecipient, referrerConfig: FeeRecipient) {
  const predicted =
    await P2pSsvProxyFactoryContract_3_1.read.predictP2pSsvProxyAddress([
      clientConfig,
      referrerConfig,
    ])

  return predicted
}
