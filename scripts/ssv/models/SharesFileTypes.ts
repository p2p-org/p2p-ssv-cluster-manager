
// ---- Primitive aliases (brands) ----
type Hex = `0x${string}`;
type AddressHex = Hex;               // 0x-prefixed, 20 bytes (not enforced here)
type PubkeyHex = Hex;                // 0x-prefixed, 48/96 bytes etc. (not enforced)
type BlobHex = Hex;                  // large hex blobs
type Base64Pem = string;             // base64-encoded PEM content

// ---- Core types ----
export interface SharesFile {
  version: "v1.1.0";                // literal from the sample (widen to string if needed)
  createdAt: string;                 // ISO 8601 string
  shares: ShareEntry[];
}

export interface ShareEntry {
  data: ShareData;
  payload: SharePayload;
}

export interface ShareData {
  ownerNonce: number;
  ownerAddress: AddressHex;
  publicKey: PubkeyHex;
  operators: OperatorEntry[];
}

export interface OperatorEntry {
  id: number;
  operatorKey: Base64Pem;           // base64 of an RSA PUBLIC KEY PEM
}

export interface SharePayload {
  sharesData: BlobHex;              // big hex blob
  publicKey: PubkeyHex;             // should match data.publicKey
  operatorIds: number[];            // should correspond to data.operators[].id
}

export interface FeeRecipient {
  basisPoints: number
  recipient: string
}
