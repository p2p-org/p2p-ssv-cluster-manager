import { FeeDistributorFactoryContract } from "./helpers/FeeDistributorFactoryContract"

export async function predictFeeDistributorAddress() {
  const referenceFeeDistributor = '0x78ce038aC24238c59777F5E4023707A23BB72D22'
  const clientConfig = {
    basisPoints: 9200,
    recipient: "0x971561f9ab29acbd6d1dc7b17f0bb6c386ad311b"
  }
  const referrerConfig = {
    basisPoints: 0,
    recipient: '0x0000000000000000000000000000000000000000'
  }

  const predictedFeeDistributorAddress = await FeeDistributorFactoryContract.read.predictFeeDistributorAddress([
    referenceFeeDistributor,
    clientConfig,
    referrerConfig
  ])

  return predictedFeeDistributorAddress
}
