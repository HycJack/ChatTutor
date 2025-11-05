import { registerCanvasElementDocument } from "../document"
import { defineElement } from "../renderer"

export interface PointAttributes {
  x: number
  y: number
  name: string
}

export const point = defineElement<PointAttributes>((options) => {
  return (board) => {
    return board.create('point', [options.x, options.y], {
      name: options.name,
    })
  }
})

// ------

registerCanvasElementDocument({
  name: 'point',
  description: 'A point on the canvas',
  attrs: [
    {
      name: 'x',
      description: 'The x coordinate of the point',
      required: true,
    },
    {
      name: 'y',
      description: 'The y coordinate of the point',
      required: true,
    },
    {
      name: 'name',
      description: 'The name of the point, support latex',
      required: true,
    },
  ],
})
