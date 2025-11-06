import { registerCanvasElementDocument } from '../document'

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