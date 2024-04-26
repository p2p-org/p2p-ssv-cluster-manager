import { getProxiesWithPubkeys } from "../reads/getProxiesWithPubkeys"
import { getIsValidatorExited } from "../reads/getIsValidatorExited"
import { getIsValidatorRemoved } from "../reads/getIsValidatorRemoved"
import { logger } from "../../common/helpers/logger"
import { bulkRemoveValidator } from "./bulkRemoveValidator"

export async function removeExitedValidatorsFromClusters() {
  const proxiesWithPubkeys = await getProxiesWithPubkeys()
  const proxies = Object.keys(proxiesWithPubkeys)

  for (const proxy of proxies) {
    const pubkeysToRemove: string[] = []

    for (const pubkey of proxiesWithPubkeys[proxy]) {
      const isExited = await getIsValidatorExited(pubkey)
      const isRemoved = await getIsValidatorRemoved(proxy, pubkey)

      if (isExited && !isRemoved) {
        pubkeysToRemove.push(pubkey)
      }
    }

    logger.info('For ' + proxy + ' ' + pubkeysToRemove.length + ' pubkeys to remove')

    if (pubkeysToRemove.length) {
      const cluster = {
        validatorCount: 0,
        networkFeeIndex: 0n,
        index: 0n,
        active: false,
        balance: 0n
      }
      // TODO!!!

      await bulkRemoveValidator(pubkeysToRemove, [], cluster)
    }
  }
}
