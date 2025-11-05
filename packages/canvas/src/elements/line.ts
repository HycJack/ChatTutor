import { defineElement } from '../renderer'
import { registerCanvasElementDocument } from '../document'

export interface LineAttributes {
  from: [number, number]
  to: [number, number]
}

export const line = defineElement<LineAttributes>((options) => {
  return (board) => {
    return board.create('line', [options.from, options.to])
  }
})

// ------

registerCanvasElementDocument({
  name: 'line',
  description: 'A line on the canvas',
  attrs: [
    {
      name: 'from',
      description: 'The start point of the line, a number tuple like [x, y]',
      required: true,
    },
    {
      name: 'to',
      description: 'The end point of the line, a number tuple like [x, y]',
      required: true,
    },
  ],
})