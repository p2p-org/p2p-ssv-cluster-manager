import { ClusterState } from "./ClusterState"

export interface ClusterStateApi extends ClusterState {
  "id": number,
  "clusterId": string,
  "network": string,
  "version": string,
  "ownerAddress": string,
  "operators": number[],
  "blockNumber": number,
  "createdAt": string,
  "updatedAt": string
}
