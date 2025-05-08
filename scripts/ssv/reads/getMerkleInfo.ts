import { readFileSync } from 'fs';

type MerkleEntry = {
  address: string;
  amount: string;
  proof: string[];
};

type MerkleTree = {
  root: string;
  data: MerkleEntry[];
};

type MerkleInfo = {
  cumulativeAmount: string;
  expectedMerkleRoot: string;
  merkleProof: string[];
};

if (!process.env.MERKLE_TREE_PATH) {
  throw new Error('No MERKLE_TREE_PATH in ENV')
}

export function getMerkleInfo(proxy: string): MerkleInfo {
  const fileContent = readFileSync(process.env.MERKLE_TREE_PATH!, 'utf-8');
  const merkleTree: MerkleTree = JSON.parse(fileContent);

  const entry = merkleTree.data.find(
    (item) => item.address.toLowerCase() === proxy.toLowerCase()
  );

  if (!entry) {
    throw new Error(`Address ${proxy} not found in merkle data.`);
  }

  return {
    cumulativeAmount: entry.amount,
    expectedMerkleRoot: merkleTree.root,
    merkleProof: entry.proof,
  };
}