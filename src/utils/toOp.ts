export const toOp = (op: string) => {
  switch (op) {
    case 'call':
      return 0
    case 'delegatecall':
      return 1
    case 'create':
      return 2
    default:
      return 0
  }
}
