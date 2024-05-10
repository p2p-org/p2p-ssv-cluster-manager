export function getSeconds(date: Date) {
  return Math.floor((date as unknown as number) / 1000)
}
