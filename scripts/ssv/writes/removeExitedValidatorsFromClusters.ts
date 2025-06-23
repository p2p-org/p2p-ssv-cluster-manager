import { getIsValidatorExited } from '../reads/getIsValidatorExited'
import { getIsValidatorRemoved } from '../reads/getIsValidatorRemoved'
import { logger } from '../../common/helpers/logger'
import { bulkRemoveValidator } from './bulkRemoveValidator'
import { getProxiesToClustersWithPubkeys } from '../reads/getProxiesToClustersWithPubkeys'
import { getClusterStateFromApi } from '../reads/getClusterStateFromApi'
import { ClusterState } from '../models/ClusterState'
import { toClusterState } from '../models/ClusterStateApi'

export async function removeExitedValidatorsFromClusters() {
  logger.info('removeExitedValidatorsFromClusters started')

  const proxiesToClustersWithPubkeys = await getProxiesToClustersWithPubkeys()
  const proxies = Object.keys(proxiesToClustersWithPubkeys)

  proxies.reverse()

  for (const proxy of proxies) {
    // iterate proxies
    const clusterKeys = Object.keys(proxiesToClustersWithPubkeys[proxy])

    for (const clusterKey of clusterKeys) {
      // iterate clusters
      const pubkeysToRemove: string[] = []

      for (const operatorIdsWithPubkey of proxiesToClustersWithPubkeys[proxy][
        clusterKey
      ]) {
        // iterate pubkeys
        const pubkey = operatorIdsWithPubkey.publicKey

        const isExited = await getIsValidatorExited(pubkey)
        const isRemoved = await getIsValidatorRemoved(proxy, pubkey)

        if (isExited && !isRemoved) {
          pubkeysToRemove.push(pubkey)
        }
      }

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
