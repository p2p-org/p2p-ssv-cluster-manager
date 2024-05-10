import { logger } from "./logger"

export function logEnv() {
  logger.info(process.env.RPC_URL)
  logger.info(process.env.FEE_DISTRIBUTOR_FACTORY)
  logger.info(process.env.P2P_SSV_PROXY_FACTORY_ADDRESS)
  logger.info(process.env.SSV_NETWORK_ADDRESS)
  logger.info(process.env.SSV_NETWORK_VIEWS_ADDRESS)
  logger.info(process.env.SAFE_ADDRESS)
  logger.info(process.env.MULTISEND_CALL_ONLY_ADDRESS)
  logger.info(process.env.SAFE_OWNER_ADDRESS_1)
  logger.info(process.env.SAFE_OWNER_ADDRESS_2)
  logger.info(process.env.SSV_TOKEN_ADDRESS)
  logger.info(process.env.MAX_FEE_PER_GAS_IN_GWEI)
  logger.info(process.env.MAX_PIORITY_FEE_PER_GAS_IN_GWEI)
  logger.info(process.env.PORT)
  logger.info(process.env.BEACON_URL)
  logger.info(process.env.ALLOWED_DAYS_TO_LIQUIDATION)
  logger.info(process.env.ALLOWED_DAYS_TO_LIQUIDATION_FOR_PRIVATE)
}
