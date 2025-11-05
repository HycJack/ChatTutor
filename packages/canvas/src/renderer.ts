import { JSXGraph, type Board } from 'jsxgraph'
import type { CanvasPageAction } from './page'
import type { ElementAction } from './element'
import { structures } from './elements'

export type ElementStructor<T extends object = object> = (options: T, getter: ElementGetter) => 
  (board: Board) => unknown
export const defineElement = <T extends object>(constructor: ElementStructor<T>) => constructor
export type ElementPool = Map<string, unknown>
export type ElementGetter = <T = unknown>(id: string) => T
export const elements = new Map<string, ElementStructor>()
export const registerElement = <T extends object>(name: string, constructor: ElementStructor<T>) => {
  elements.set(name, <ElementStructor<object>>constructor)
}

structures.forEach(([name, constructor]) => registerElement(name, constructor))

export const createCanvasRenderer = (id: string) => {
  const board = JSXGraph.initBoard(id, {
    boundingBox: [0, 0, 100, 100],
    grid: true,
  })
  const pool = new Map<string, unknown>()
  const getElement: ElementGetter = <T = unknown>(id: string) => {
    return pool.get(id) as T
  }

  const add = (action: typeof ElementAction.infer) => {
    const element = elements.get(action.options.name)
    if (element) {
      const setup = element(action.options, getElement)
      pool.set(action.options.id, setup(board))
    }
  }

  const load = (actions: CanvasPageAction[]) => {
    for (const action of actions) {
      if (action.type === 'element') add(action)
    }
  }

  return {
    board,
    getElement,
    load,
    add,
  }
}
