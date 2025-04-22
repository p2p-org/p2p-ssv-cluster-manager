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
    "refund_address": "0xF507E7e0C892e9104071C847F99bA946250aD293",
    "retain_4626": false,
    "route_type": "output",
    "superform_id": "62771017356190754913478451444852273738203985736479809223259",
    "superpositions_amount_in": "12302129221656038",
    "superpositions_chain_id": 10,
    "swap_slippage": 5000,
    "to_chain_id": 10,
    "to_token_address": "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
    "user_address": "0xF507E7e0C892e9104071C847F99bA946250aD293",
    "vault_id": "W1wJLZDxXwbebTIhv03cE",
  }

  const bodyObject2 = {
    "bridge_slippage": 5000,
    "filter_swap_routes": false,
    "is_erc20": false,
    "is_part_of_multi_vault": false,
    "need_insurance": true,
    "positive_slippage": 5000,
    "refund_address": "0xF507E7e0C892e9104071C847F99bA946250aD293",
    "retain_4626": false,
    "route_type": "output",
    "superform_id": "62771017356379199835532377802369906037722899472923496568460",
    "superpositions_amount_in": "823640643503",
    "superpositions_chain_id": 10,
    "swap_slippage": 5000,
    "to_chain_id": 10,
    "to_token_address": "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
    "user_address": "0xF507E7e0C892e9104071C847F99bA946250aD293",
    "vault_id": "PmqSgkenJy9a1xfwNSMDo",
  }

  const body = JSON.stringify([bodyObject, bodyObject2])

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
