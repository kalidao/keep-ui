export const toOp = (op: string): number => {
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

export const toOpString = (op: number): string => {
  switch (op) {
    case 0:
      return 'call'
    case 1:
      return 'delegatecall'
    case 2:
      return 'create'
    default:
      return 'call'
  }
}
