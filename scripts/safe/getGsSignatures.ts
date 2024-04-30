export function getGsSignatures() {
  if (!process.env.SAFE_OWNER_ADDRESS_1) {
    throw new Error("No SAFE_OWNER_ADDRESS_1 in ENV")
  }
  if (!process.env.SAFE_OWNER_ADDRESS_2) {
    throw new Error("No SAFE_OWNER_ADDRESS_2 in ENV")
  }

  const signatures = '0x' +
    '000000000000000000000000' +
    process.env.SAFE_OWNER_ADDRESS_1.replace('0x', '') +
    '000000000000000000000000000000000000000000000000000000000000000001' +
    '000000000000000000000000' +
    process.env.SAFE_OWNER_ADDRESS_2.replace('0x', '') +
    '000000000000000000000000000000000000000000000000000000000000000001'

  return signatures
}
