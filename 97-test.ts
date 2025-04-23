import 'dotenv/config'
import { logger } from './scripts/common/helpers/logger'
import { getIsValidatorExited } from './scripts/ssv/reads/getIsValidatorExited'
import { getIsValidatorRemoved } from './scripts/ssv/reads/getIsValidatorRemoved'
import { exitValidator } from './scripts/ssv/writes/exitValidator'
import { reactivate } from './scripts/ssv/writes/reactivate'
import { setFeeRecipientAddress } from './scripts/ssv/writes/setFeeRecipientAddress'
import { removeExitedValidatorsFromClusters } from './scripts/ssv/writes/removeExitedValidatorsFromClusters'
import { transferSsvTokensFromFactoryToClusters } from './scripts/ssv/writes/transferSsvTokensFromFactoryToClusters'
import { liquidate } from './scripts/ssv/writes/liquidate'
import { bulkExitValidator } from './scripts/ssv/writes/bulkExitValidator'
import * as fs from 'fs';
import { sleep } from './scripts/common/helpers/sleep'

async function main() {
  logger.info('97-test started')

  const bodyObject = {
    "user_address": "0x588ede4403DF0082C5ab245b35F0f79EB2d8033a",
    "from_token_address": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    "from_chain_id": 8453,
    "amount_in": "0.1234",
    "refund_address": "0x588ede4403DF0082C5ab245b35F0f79EB2d8033a",
    "vault_id": "zLVQbgScIbXJuSz-NNsK-",
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
    const response = await fetch("https://www.superform.xyz/api/proxy/deposit/calculate/", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "baggage": "sentry-environment=vercel-production,sentry-release=bcd1eda97254e481d83baf59effb69f6fdf42f1c,sentry-public_key=6aa5bce833b4df8633220da58027f399,sentry-trace_id=e8c00714171e40eb963a3e23c1f81bc1",
        "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
        "content-type": "application/json",
        "priority": "u=1, i",
        "response-content-type": "application/json",
        "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sentry-trace": "e8c00714171e40eb963a3e23c1f81bc1-b8a1279fdc78b3ac",
        "sf-jwt": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImQ0MWNhYmY3LWQ2NGUtNDZiNy04ZGIwLTBhODNkY2JkMGVhNiJ9.eyJraWQiOiJkNDFjYWJmNy1kNjRlLTQ2YjctOGRiMC0wYTgzZGNiZDBlYTYiLCJhdWQiOiJodHRwczovL3d3dy5zdXBlcmZvcm0ueHl6IiwiaXNzIjoiYXBwLmR5bmFtaWNhdXRoLmNvbS9mYjlmNjVkNi1hOGM0LTRmNTktOGJlMy1jNWEzNGEwMWNhYTUiLCJzdWIiOiI0NTZkYTJhYy0yMjBhLTQ4YWYtODE1My0zZDAxZTU3ODAwMzEiLCJzaWQiOiI5OTVhMDk1Mi1jZTVjLTRlNjgtODRjNS01MGQwNTBlZWNlMTIiLCJlbnZpcm9ubWVudF9pZCI6ImZiOWY2NWQ2LWE4YzQtNGY1OS04YmUzLWM1YTM0YTAxY2FhNSIsImxpc3RzIjpbXSwibWlzc2luZ19maWVsZHMiOltdLCJ2ZXJpZmllZF9jcmVkZW50aWFscyI6W3siYWRkcmVzcyI6IjB4NTg4ZWRlNDQwM0RGMDA4MkM1YWIyNDViMzVGMGY3OUVCMmQ4MDMzYSIsImNoYWluIjoiZWlwMTU1IiwiaWQiOiI4MTFlZGU4YS04YmU4LTQ5ZDgtOWMwOC1mMTc1ZDA1NTljZWQiLCJuYW1lX3NlcnZpY2UiOnt9LCJwdWJsaWNfaWRlbnRpZmllciI6IjB4NTg4ZWRlNDQwM0RGMDA4MkM1YWIyNDViMzVGMGY3OUVCMmQ4MDMzYSIsIndhbGxldF9uYW1lIjoibWV0YW1hc2siLCJ3YWxsZXRfcHJvdmlkZXIiOiJicm93c2VyRXh0ZW5zaW9uIiwiZm9ybWF0IjoiYmxvY2tjaGFpbiIsImxhc3RTZWxlY3RlZEF0IjoiMjAyNS0wMy0xMFQxMzowOTo0OC4yMDNaIiwic2lnbkluRW5hYmxlZCI6dHJ1ZX1dLCJsYXN0X3ZlcmlmaWVkX2NyZWRlbnRpYWxfaWQiOiI4MTFlZGU4YS04YmU4LTQ5ZDgtOWMwOC1mMTc1ZDA1NTljZWQiLCJmaXJzdF92aXNpdCI6IjIwMjUtMDMtMTBUMTM6MDk6NDcuMDUyWiIsImxhc3RfdmlzaXQiOiIyMDI1LTAzLTEwVDEzOjA5OjQ3LjA1MloiLCJuZXdfdXNlciI6dHJ1ZSwibWV0YWRhdGEiOnt9LCJ2ZXJpZmllZENyZWRlbnRpYWxzSGFzaGVzIjp7ImJsb2NrY2hhaW4iOiIzY2QxNjAwZTcwOWMxMDM0ZDI1YmU1NTI1MTJjOWRmYSJ9LCJpYXQiOjE3NDE2MTIxODgsImV4cCI6MTc0MTY5ODU4OH0.TDeHMLFaLBzl3x06_rB2S9kxjSfHlho-C_5TxNz-uLigIqB81jskolVU4Z92Oy9p38W9tdOSvaDEtHvEe61JC9sMAVZPvu8Y6d3yY8FGaPqtoG3p5R8OZTWu8IJdqPusb-1bTxVnKIyMvVnVaU5ziirSpyTwxtTxHhTMp1_U4Sz3hft-Djrz5W6d-EvT9-xUHOaz3gH43zlb2n4VnccrbFT_27QrtKEhdXLd9fhMWRN0SOtNoZQR9nmtkviykhSebfV1tugQEjxd41zT1t9oeU03l9vzmlEUWCUGpYATxRbFEZkFlHy4_LOQ4GNcYEvfkiXCIac9VCwnsdZgLEUnc0w9jOQWQdVlVC8e2ewfujA0CQ9YS1F9wxrUQxPIhkBhnNGtXNWaCa_KYBTNS43mZiiRepkYm5dD9ZFZvdOehysnv5LR3rasxo4T88Fc_gLWi7c4n7LI27rCoYYqHXhgwTC8fQo3sj8wE-Uacf6N-8sD2aFMS5r54ExITgt4Zn4rm19BIaoJqaUk1awDTuZ5E5-2Jc8sdf85TPnBcZ_iN3sVaPKK2Jh2GdcPOA6OrDgiiuiZoKu66sl4IJWnSA94nKmi4TMQEiZFch9B1lfZR5-dYYbODtZdlF92OxP7zbS5TNXo2RtL46W_F_c7gRB_RieXon3itom0q_3bEcS8NVw",
        "cookie": "spdl_pid=SY6ickgjUPEkOf8nB50WiCgxSmdJD9p1; superform-app-main-spindl=false; superform-app-main-leftMenuToggle=false; superform-app-main-app-toast-seen=%22%22; superform-app-main-us-bar-restriction-seen=true; superform-app-main-app-alert-seen=%22%22; superform-app-main-sorting-Protocols={%22field%22:%22tvl%22%2C%22direction%22:%22DESC%22}; superform-app-main-hide-unauthenticated-protocols=true; _ga=GA1.1.573972420.1735899481; _ga_HPGYH52DKM=GS1.1.1739795744.1.1.1739796513.0.0.0; _ga_8YD3DLXPBP=GS1.1.1741590358.10.1.1741590368.0.0.0; intercom-id-bgvkgos8=8ae555ff-e353-436e-91bc-f93a18a1e562; intercom-session-bgvkgos8=; intercom-device-id-bgvkgos8=054f5cce-e31c-4303-8426-0d7cae31510b; superform-app-main-spindl-attributed=true; superform-app-main-sorting-AccountVaults={%22field%22:%22created_at%22%2C%22direction%22:%22DESC%22}; superform-app-main-sorting-Portfolio={%22field%22:%22superposition_usd_value%22%2C%22direction%22:%22DESC%22}",
        "Referer": "https://www.superform.xyz/explore/",
        "Referrer-Policy": "origin-when-cross-origin"
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

    const responseStart = await fetch("https://www.superform.xyz/api/proxy/deposit/start/", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "baggage": "sentry-environment=vercel-production,sentry-release=bcd1eda97254e481d83baf59effb69f6fdf42f1c,sentry-public_key=6aa5bce833b4df8633220da58027f399,sentry-trace_id=e8c00714171e40eb963a3e23c1f81bc1",
        "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
        "content-type": "application/json",
        "priority": "u=1, i",
        "response-content-type": "application/json",
        "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sentry-trace": "e8c00714171e40eb963a3e23c1f81bc1-b8a1279fdc78b3ac",
        "sf-jwt": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImQ0MWNhYmY3LWQ2NGUtNDZiNy04ZGIwLTBhODNkY2JkMGVhNiJ9.eyJraWQiOiJkNDFjYWJmNy1kNjRlLTQ2YjctOGRiMC0wYTgzZGNiZDBlYTYiLCJhdWQiOiJodHRwczovL3d3dy5zdXBlcmZvcm0ueHl6IiwiaXNzIjoiYXBwLmR5bmFtaWNhdXRoLmNvbS9mYjlmNjVkNi1hOGM0LTRmNTktOGJlMy1jNWEzNGEwMWNhYTUiLCJzdWIiOiI0NTZkYTJhYy0yMjBhLTQ4YWYtODE1My0zZDAxZTU3ODAwMzEiLCJzaWQiOiI5OTVhMDk1Mi1jZTVjLTRlNjgtODRjNS01MGQwNTBlZWNlMTIiLCJlbnZpcm9ubWVudF9pZCI6ImZiOWY2NWQ2LWE4YzQtNGY1OS04YmUzLWM1YTM0YTAxY2FhNSIsImxpc3RzIjpbXSwibWlzc2luZ19maWVsZHMiOltdLCJ2ZXJpZmllZF9jcmVkZW50aWFscyI6W3siYWRkcmVzcyI6IjB4NTg4ZWRlNDQwM0RGMDA4MkM1YWIyNDViMzVGMGY3OUVCMmQ4MDMzYSIsImNoYWluIjoiZWlwMTU1IiwiaWQiOiI4MTFlZGU4YS04YmU4LTQ5ZDgtOWMwOC1mMTc1ZDA1NTljZWQiLCJuYW1lX3NlcnZpY2UiOnt9LCJwdWJsaWNfaWRlbnRpZmllciI6IjB4NTg4ZWRlNDQwM0RGMDA4MkM1YWIyNDViMzVGMGY3OUVCMmQ4MDMzYSIsIndhbGxldF9uYW1lIjoibWV0YW1hc2siLCJ3YWxsZXRfcHJvdmlkZXIiOiJicm93c2VyRXh0ZW5zaW9uIiwiZm9ybWF0IjoiYmxvY2tjaGFpbiIsImxhc3RTZWxlY3RlZEF0IjoiMjAyNS0wMy0xMFQxMzowOTo0OC4yMDNaIiwic2lnbkluRW5hYmxlZCI6dHJ1ZX1dLCJsYXN0X3ZlcmlmaWVkX2NyZWRlbnRpYWxfaWQiOiI4MTFlZGU4YS04YmU4LTQ5ZDgtOWMwOC1mMTc1ZDA1NTljZWQiLCJmaXJzdF92aXNpdCI6IjIwMjUtMDMtMTBUMTM6MDk6NDcuMDUyWiIsImxhc3RfdmlzaXQiOiIyMDI1LTAzLTEwVDEzOjA5OjQ3LjA1MloiLCJuZXdfdXNlciI6dHJ1ZSwibWV0YWRhdGEiOnt9LCJ2ZXJpZmllZENyZWRlbnRpYWxzSGFzaGVzIjp7ImJsb2NrY2hhaW4iOiIzY2QxNjAwZTcwOWMxMDM0ZDI1YmU1NTI1MTJjOWRmYSJ9LCJpYXQiOjE3NDE2MTIxODgsImV4cCI6MTc0MTY5ODU4OH0.TDeHMLFaLBzl3x06_rB2S9kxjSfHlho-C_5TxNz-uLigIqB81jskolVU4Z92Oy9p38W9tdOSvaDEtHvEe61JC9sMAVZPvu8Y6d3yY8FGaPqtoG3p5R8OZTWu8IJdqPusb-1bTxVnKIyMvVnVaU5ziirSpyTwxtTxHhTMp1_U4Sz3hft-Djrz5W6d-EvT9-xUHOaz3gH43zlb2n4VnccrbFT_27QrtKEhdXLd9fhMWRN0SOtNoZQR9nmtkviykhSebfV1tugQEjxd41zT1t9oeU03l9vzmlEUWCUGpYATxRbFEZkFlHy4_LOQ4GNcYEvfkiXCIac9VCwnsdZgLEUnc0w9jOQWQdVlVC8e2ewfujA0CQ9YS1F9wxrUQxPIhkBhnNGtXNWaCa_KYBTNS43mZiiRepkYm5dD9ZFZvdOehysnv5LR3rasxo4T88Fc_gLWi7c4n7LI27rCoYYqHXhgwTC8fQo3sj8wE-Uacf6N-8sD2aFMS5r54ExITgt4Zn4rm19BIaoJqaUk1awDTuZ5E5-2Jc8sdf85TPnBcZ_iN3sVaPKK2Jh2GdcPOA6OrDgiiuiZoKu66sl4IJWnSA94nKmi4TMQEiZFch9B1lfZR5-dYYbODtZdlF92OxP7zbS5TNXo2RtL46W_F_c7gRB_RieXon3itom0q_3bEcS8NVw",
        "cookie": "spdl_pid=SY6ickgjUPEkOf8nB50WiCgxSmdJD9p1; superform-app-main-spindl=false; superform-app-main-leftMenuToggle=false; superform-app-main-app-toast-seen=%22%22; superform-app-main-us-bar-restriction-seen=true; superform-app-main-app-alert-seen=%22%22; superform-app-main-sorting-Protocols={%22field%22:%22tvl%22%2C%22direction%22:%22DESC%22}; superform-app-main-hide-unauthenticated-protocols=true; _ga=GA1.1.573972420.1735899481; _ga_HPGYH52DKM=GS1.1.1739795744.1.1.1739796513.0.0.0; _ga_8YD3DLXPBP=GS1.1.1741590358.10.1.1741590368.0.0.0; intercom-id-bgvkgos8=8ae555ff-e353-436e-91bc-f93a18a1e562; intercom-session-bgvkgos8=; intercom-device-id-bgvkgos8=054f5cce-e31c-4303-8426-0d7cae31510b; superform-app-main-spindl-attributed=true; superform-app-main-sorting-AccountVaults={%22field%22:%22created_at%22%2C%22direction%22:%22DESC%22}; superform-app-main-sorting-Portfolio={%22field%22:%22superposition_usd_value%22%2C%22direction%22:%22DESC%22}",
        "Referer": "https://www.superform.xyz/explore/",
        "Referrer-Policy": "origin-when-cross-origin"
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

async function test_exitValidator() {
  await exitValidator()
}

async function test_removeExitedValidatorsFromClusters() {
  await removeExitedValidatorsFromClusters()
}

async function test_setFeeRecipientAddress() {
  const txHash = await setFeeRecipientAddress()
}

async function test_getIsValidatorExited() {
  const isExited = await getIsValidatorExited(
    '0xb8591e4016dc4aa56c72516c91c281154cde46f9fb2316c4c2e2d23870c907eca6a559227679a99ac2753b1bf8a9d6f2',
  )
}

async function test_getIsValidatorRemoved() {
  const isRemoved = await getIsValidatorRemoved(
    '0x293f1c1daaf99a13a92ebe76bccd2bedf9289906',
    '0xa555ce9c4aa8d3755aca8cd15aadbac671628e3600e35d4f7d8ba46bb5b133ac2b95cf8d2f02f911b6422e8efbc0b1cc',
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
