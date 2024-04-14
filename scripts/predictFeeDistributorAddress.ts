import { FeeDistributorFactoryContract } from "./helpers/FeeDistributorFactoryContract"

export async function predictFeeDistributorAddress() {
  const referenceFeeDistributor = '0x78ce038aC24238c59777F5E4023707A23BB72D22'
  const clientConfig = {
    basisPoints: 9000,
    recipient: "0xf304A4229561AEBa13425710acf1F46c9f24f1EB"
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
