import { registerCanvasElementDocument } from '../document'

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