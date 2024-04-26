import { FeeDistributorFactoryContract } from "../contracts/FeeDistributorFactoryContract"

export async function predictFeeDistributorAddress() {
  const referenceFeeDistributor = '0x78ce038aC24238c59777F5E4023707A23BB72D22'
  const clientConfig = {
    basisPoints: 9000,
    recipient: "0x62a90760c7ce5CBaDbb64188ad075e9A52518D41"
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
