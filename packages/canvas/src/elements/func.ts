import { defineElement } from '../renderer'
import { calculate } from './utils'
import { registerCanvasElementDocument } from '../document'

export interface FuncAttributes {
  expression: string
  domain?: [number, number]
}

export const func = defineElement<FuncAttributes>((options) => {
  return (board) => {
    const f = calculate<(x: number) => number>(options.expression)
    return board.create('function', [f, ...(options.domain ?? [])])
  }
})

// ------

registerCanvasElementDocument({
  name: 'func',
  description: 'A function on the canvas',
  attrs: [
    {
      name: 'expression',
      description: 'A javascript function expression string, like `(x) => x * x`',
      required: true,
    },
    {
      name: 'domain',
      description: 'The domain of the function, a number tuple like [min, max]',
      required: false,
    },
  ],
})