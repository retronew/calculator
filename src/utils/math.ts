import {
  addDependencies,
  create,
  divideDependencies,
  formatDependencies,
  largerDependencies,
  multiplyDependencies,
  smallerEqDependencies,
  subtractDependencies,
} from 'mathjs'

const config = {
  number: 'number' as const, // Use JavaScript's number type
  precision: 64, // Use high precision for calculations
}

// Create just the functions we need
export const { add, subtract, multiply, divide, larger, smallerEq, format } = create({
  addDependencies,
  subtractDependencies,
  multiplyDependencies,
  divideDependencies,
  largerDependencies,
  smallerEqDependencies,
  formatDependencies,
}, config)

export default {
  add,
  subtract,
  multiply,
  divide,
  larger,
  smallerEq,
  format,
}
