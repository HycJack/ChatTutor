import { registerCanvasElementDocument } from '../document'

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