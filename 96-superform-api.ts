import 'dotenv/config'
import { logger } from './scripts/common/helpers/logger'

async function main() {
  logger.info('97-test started')

  const bodyObject = {
    "user_address": "0xB3055eBe6b9c43C86fb684D512123Fd88f8A6f19",
    "from_token_address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "from_chain_id": 10,
    "amount_in": "0.01234",
    "refund_address": "0xB3055eBe6b9c43C86fb684D512123Fd88f8A6f19",
    "vault_id": "FZuZKa74BkF7AlFM7_7lo",
    "bridge_slippage": 500,
    "swap_slippage": 500,
    "route_type": "output",
    "exclude_ambs": [],
    "exclude_liquidity_providers": [],
    "exclude_dexes": [],
    "exclude_bridges": []
  }

  const bodyObject2 = {
    "user_address": "0xB3055eBe6b9c43C86fb684D512123Fd88f8A6f19",
    "from_token_address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "from_chain_id": 10,
    "amount_in": "0.00158",
    "refund_address": "0xB3055eBe6b9c43C86fb684D512123Fd88f8A6f19",
    "vault_id": "OjikeuSNG6Lxbin9k4c3J",
    "bridge_slippage": 500,
    "swap_slippage": 500,
    "route_type": "output",
    "exclude_ambs": [],
    "exclude_liquidity_providers": [],
    "exclude_dexes": [],
    "exclude_bridges": []
  }

  const body = JSON.stringify([bodyObject, bodyObject2])

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
