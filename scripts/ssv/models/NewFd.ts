export type OldFdType = "manual" | "middleware" | "ssvOld" | "ssvNew"

export interface OldFd {
  "address": string,
  "clientBasisPoints": number,
  "type": OldFdType
}

export interface NewFd {
  "newFeeDistributorAddress": string,
  "clientAddress": string,
  "oldFeeDistributors": OldFd[]
}