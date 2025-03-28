import 'dotenv/config'
import { logger } from './scripts/common/helpers/logger'

async function main() {
  logger.info('97-test started')

  const bodyObject = {
    "user_address": "0xE1158d9158D41186994B400Ab833B85284f2E06C",
    "from_token_address": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    "from_chain_id": 8453,
    "amount_in": "0.1234",
    "refund_address": "0xE1158d9158D41186994B400Ab833B85284f2E06C",
    "vault_id": "t6Mh8XAKA-ydhXRTfQmnw",
    "bridge_slippage": 50,
    "swap_slippage": 50,
    "route_type": "output",
    "exclude_ambs": [],
    "exclude_liquidity_providers": [],
    "exclude_dexes": [],
    "exclude_bridges": []
  }

  const body = JSON.stringify([bodyObject])

  try {
    const response = await fetch("https://api.superform.xyz/deposit/calculate/", {
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

    const responseStart = await fetch("https://api.superform.xyz/deposit/start/", {
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
