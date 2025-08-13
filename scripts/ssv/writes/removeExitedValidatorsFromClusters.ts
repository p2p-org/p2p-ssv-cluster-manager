import { getIsValidatorExited } from '../reads/getIsValidatorExited'
import { getIsValidatorRemoved } from '../reads/getIsValidatorRemoved'
import { logger } from '../../common/helpers/logger'
import { bulkRemoveValidator } from './bulkRemoveValidator'
import { getProxiesToClustersWithPubkeys } from '../reads/getProxiesToClustersWithPubkeys'
import { getClusterStateFromApi } from '../reads/getClusterStateFromApi'
import { ClusterState } from '../models/ClusterState'
import { toClusterState } from '../models/ClusterStateApi'
import { promises as fs } from "node:fs"
import { EOL } from "node:os"

export async function removeExitedValidatorsFromClusters() {
  logger.info('removeExitedValidatorsFromClusters started')

  let text = "";
  try { text = await fs.readFile("checkedPubkeys.txt", "utf8"); } catch (e: any) {
    if (e.code !== "ENOENT") throw e;
  }
  const pubkeysFromFile = new Set(
    text.split(/\r?\n/).map(norm)
  )
  logger.info('pubkeysFromFile has', pubkeysFromFile.size, 'pubkeys')

  const proxiesToClustersWithPubkeys = await getProxiesToClustersWithPubkeys()
  const proxies = Object.keys(proxiesToClustersWithPubkeys)

  logger.info('Total proxies:', proxies.length)

  proxies.reverse()

  const proxyToStartWith = undefined
  let proxiesToUse = proxies
  if (proxyToStartWith) {
    proxiesToUse = rotateFrom(proxies, proxyToStartWith);
  }

  let i = 0
  for (const proxy of proxiesToUse) {
    i++
    logger.info('Starting proxy #', i, proxy)

    // iterate proxies
    const clusterKeys = Object.keys(proxiesToClustersWithPubkeys[proxy])

    for (const clusterKey of clusterKeys) {
      logger.info('Starting cluster', clusterKey)

      // iterate clusters
      const pubkeysToRemove: string[] = []

      const checkedPubkeys: string[] = []

      for (const operatorIdsWithPubkey of proxiesToClustersWithPubkeys[proxy][
        clusterKey
      ]) {
        // iterate pubkeys
        const pubkey = operatorIdsWithPubkey.publicKey

        if (!pubkeysFromFile.has(pubkey)) {
          const isExited = await getIsValidatorExited(pubkey)
          const isRemoved = await getIsValidatorRemoved(proxy, pubkey)

          if (isExited && !isRemoved) {
            pubkeysToRemove.push(pubkey)
          }
          if (isExited && isRemoved) {
            checkedPubkeys.push(pubkey)
          }
        }
      }

      await fs.appendFile("checkedPubkeys.txt", checkedPubkeys.join(EOL) + EOL);

      logger.info(
        'For ' +
          proxy +
          ' ' +
          clusterKey +
          ' ' +
          pubkeysToRemove.length +
          ' pubkeys to remove',
      )

      if (pubkeysToRemove.length) {
        const operatorIds =
          proxiesToClustersWithPubkeys[proxy][clusterKey][0].operatorIds
        const clusterStateApi = await getClusterStateFromApi(proxy, operatorIds)
        const clusterState: ClusterState = toClusterState(clusterStateApi)

        await bulkRemoveValidator(
          proxy,
          pubkeysToRemove,
          operatorIds,
          clusterState,
        )
      }
    }
  }

  logger.info('removeExitedValidatorsFromClusters finished')
}

function rotateFrom<T>(arr: readonly T[], start: T): T[] {
  const i = arr.indexOf(start);
  if (i === -1) throw new Error("start not in array");
  return [...arr.slice(i), ...arr.slice(0, i)];
}

function norm(s: string) { return s.trim(); } // add .toLowerCase() if needed
