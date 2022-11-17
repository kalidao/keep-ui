import { Operation } from '~/types'

export const toOp = (op: Operation) => {
  switch (op) {
    case Operation.call:
      return 0
    case Operation.create:
      return 1
    case Operation.delegatecall:
      return 2
  }
}
