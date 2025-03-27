import 'dotenv/config'
import { logger } from './scripts/common/helpers/logger'

async function main() {
  logger.info('97-test started')

  const bodyObject = {
    "bridge_slippage": 5000,
    "filter_swap_routes": false,
    "is_erc20": false,
    "is_part_of_multi_vault": false,
    "need_insurance": true,
    "positive_slippage": 5000,
    "refund_address": "0xE1158d9158D41186994B400Ab833B85284f2E06C",
    "retain_4626": false,
    "route_type": "output",
    "superform_id": "53060340969225753329461353767745054384708953976330005872281754",
    "superpositions_amount_in": "21881",
    "superpositions_chain_id": 8453,
    "swap_slippage": 5000,
    "to_chain_id": 8453,
    "to_token_address": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    "user_address": "0xE1158d9158D41186994B400Ab833B85284f2E06C",
    "vault_id": "zLVQbgScIbXJuSz-NNsK-",
  }

  const body = JSON.stringify([bodyObject])

  try {
    const response = await fetch("https://api.superform.xyz/withdraw/calculate/", {
      "headers": {
        "SF-API-KEY": process.env.SF_API_KEY!,
        "accept": "application/json",
        "content-type": "application/json"
      },
      "body": body,
      "method": "POST"
    });

    if (!response.ok) {
      throw new Error(`Network error: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);


    const bodyStart = JSON.stringify(data)

    const responseStart = await fetch("https://api.superform.xyz/withdraw/start/", {
      "headers": {
        "SF-API-KEY": process.env.SF_API_KEY!,
        "accept": "application/json",
        "content-type": "application/json"
      },
      "body": bodyStart as string,
      "method": "POST"
    });

    if (!responseStart.ok) {
      throw new Error(`Network error: ${responseStart.statusText}`);
    }
    const dataStart = await responseStart.json();
    console.log(dataStart);

  } catch (e) {
    console.error(e);
  }

  logger.info('97-test finished')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
