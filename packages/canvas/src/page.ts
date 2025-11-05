import type { Action, Page } from '@chat-tutor/shared'
import type { ElementActionOptions } from './element'

export type CanvasPageAction = 
  Action<typeof ElementActionOptions.infer>

export type CanvasPageExtends = {
  range: [number, number] // y axis range
  domain: [number, number] // x axis range
}

export type CanvasPage = Page<CanvasPageAction> & CanvasPageExtends
export type Canvas3DPage = Page<CanvasPageAction> & CanvasPageExtends