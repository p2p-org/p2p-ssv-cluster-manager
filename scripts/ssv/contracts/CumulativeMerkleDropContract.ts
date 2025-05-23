import { getContract } from 'viem'
import { publicClient, walletClient } from '../../common/helpers/clients'

export const CumulativeMerkleDropAbi = [{"inputs":[{"internalType":"address","name":"token_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"oldMerkleRoot","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"newMerkleRoot","type":"bytes32"}],"name":"MerkelRootUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"cumulativeAmount","type":"uint256"},{"internalType":"bytes32","name":"expectedMerkleRoot","type":"bytes32"},{"internalType":"bytes32[]","name":"merkleProof","type":"bytes32[]"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"cumulativeClaimed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"merkleRoot","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"merkleRoot_","type":"bytes32"}],"name":"setMerkleRoot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]

if (!process.env.CUMULATIVE_MERKLE_DROP) {
  throw new Error('No CUMULATIVE_MERKLE_DROP in ENV')
}

export const CumulativeMerkleDropAddresss = process.env
  .CUMULATIVE_MERKLE_DROP as `0x${string}`

export const CumulativeMerkleDropContract = getContract({
  address: CumulativeMerkleDropAddresss,
  abi: CumulativeMerkleDropAbi,
  client: {
    public: publicClient,
    wallet: walletClient,
  },
})
