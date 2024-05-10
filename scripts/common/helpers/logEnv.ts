import { logger } from './logger'

export function logEnv() {
  logger.info('RPC_URL', process.env.RPC_URL)
  logger.info('FEE_DISTRIBUTOR_FACTORY', process.env.FEE_DISTRIBUTOR_FACTORY)
  logger.info('P2P_SSV_PROXY_FACTORY_ADDRESS', process.env.P2P_SSV_PROXY_FACTORY_ADDRESS)
  logger.info('SSV_NETWORK_ADDRESS', process.env.SSV_NETWORK_ADDRESS)
  logger.info('SSV_NETWORK_VIEWS_ADDRESS', process.env.SSV_NETWORK_VIEWS_ADDRESS)
  logger.info('SAFE_ADDRESS', process.env.SAFE_ADDRESS)
  logger.info('MULTISEND_CALL_ONLY_ADDRESS', process.env.MULTISEND_CALL_ONLY_ADDRESS)
  logger.info('SAFE_OWNER_ADDRESS_1', process.env.SAFE_OWNER_ADDRESS_1)
  logger.info('SAFE_OWNER_ADDRESS_2', process.env.SAFE_OWNER_ADDRESS_2)
  logger.info('SSV_TOKEN_ADDRESS', process.env.SSV_TOKEN_ADDRESS)
  logger.info('MAX_FEE_PER_GAS_IN_GWEI', process.env.MAX_FEE_PER_GAS_IN_GWEI)
  logger.info('MAX_PIORITY_FEE_PER_GAS_IN_GWEI', process.env.MAX_PIORITY_FEE_PER_GAS_IN_GWEI)
  logger.info('PORT', process.env.PORT)
  logger.info('BEACON_URL', process.env.BEACON_URL)
  logger.info('ALLOWED_DAYS_TO_LIQUIDATION', process.env.ALLOWED_DAYS_TO_LIQUIDATION)
  logger.info('ALLOWED_DAYS_TO_LIQUIDATION_FOR_PRIVATE', process.env.ALLOWED_DAYS_TO_LIQUIDATION_FOR_PRIVATE)
  logger.info('PRIVATE_KEY length', process.env.PRIVATE_KEY?.length)
}
