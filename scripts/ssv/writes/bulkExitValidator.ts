import { logger } from '../../common/helpers/logger'
import { SSVNetworkAbi } from '../contracts/SSVNetworkContract'
import { sendTx } from '../../common/helpers/sendTx'
import { getClusterPubkeysPageFromApi } from '../reads/getClusterPubkeysPageFromApi'

export async function bulkExitValidator() {
  logger.log('bulkExitValidator started')

  // const pubkeys1 = await getClusterPubkeysPageFromApi('0x24d5c4ebf2f7f38b9124c332461bd9eb7f3d7910a928178da20d1866eb20e511', 1)
  // const pubkeys2 = await getClusterPubkeysPageFromApi('0x24d5c4ebf2f7f38b9124c332461bd9eb7f3d7910a928178da20d1866eb20e511', 2)

  const publicKeys: string[] = [
    '0x8ca3d330ac49a3d36b6e09cd52018cccdef9170d5600432853e71188aff4b864ff5b28fa0f9caa8b66a41bd28832946c',
    '0xb616285121b8014bac8f4278323d1687cac7f11f70955aebceee8d438165e1a7d88e1b4a3319248e7b078f6706bed762',
    '0x967eabc8109045669935c2c9276913d7664dbd568c8a889d54a368936249549c96b29c9ceebaed4541d54405142141c5',
    '0x8b44c442d278877db4469ce2ffd6cc388d5a72663264aafc223242f23379fb34aa939eccc2670f2c5f13467b962d621b',
    '0x8feed632d9b82f72e3a771ab1c1590c0310cbe3b0e892e5b2799dd6139d9ce96ed87f5b94e6f66511b1bc0b0374846ae',
    '0xb57ff7abe74348f3ceaa4e4f1bd4e419090ad88d20223d9e4aff41984f45bdd9502afd87cb7f794fe4c738b526c6d18b',
    '0x93e049e8020a07d6a592fd492383017e4e85143a089cbd4e23ac216a435a87b60195a7b3d6a05d2b85000ba85bbbe157',
    '0x8e41cc51072ff655782d8c03a5f132ceee14e777b1033bbad2702949a19520a423ac3b5381820a5faf6f6a8f4fab0c59',
    '0x803216c628a665a2206b33f3763499f03fec21b8da337b395fe6bef672067b890485aa906de6b4294ab2e13227b61c07',
    '0x89415143a487a26a4854657a642b17bbcc1c1753cd805e330b90dfb23675f937d064d374dcc6b10be289c765f4785bbd'
  ]
  const operatorIds = [198,211,214,220]

  const txHash = await sendTx(
    '0x5ed8b5b1Bcac0ADB3205A779A70B7E6cc285C2Bb',
    SSVNetworkAbi,
    'bulkExitValidator',
    [publicKeys, operatorIds],
  )

  logger.log('bulkExitValidator finished')

  return txHash
}
