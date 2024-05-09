import { ClusterState } from "./ClusterState"

export interface ClusterStateApi extends ClusterState {
  id: number
  clusterId: string
  network: string
  version: string
  ownerAddress: string
  operators: number[]
  blockNumber: number
  createdAt: string
  updatedAt: string
}

export function toClusterState(clusterStateApi: ClusterStateApi): ClusterState {
  const clusterState = {
    validatorCount: clusterStateApi.validatorCount,
    networkFeeIndex: clusterStateApi.networkFeeIndex,
    index: clusterStateApi.index,
    active: clusterStateApi.active,
    balance: clusterStateApi.balance
  }

  return clusterState
}
