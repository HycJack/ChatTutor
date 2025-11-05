import { PageType, type Page } from '@chat-tutor/shared'
import type { Tool } from 'xsai'
import { tool } from 'xsai'
import { type } from 'arktype'
import type { CanvasPage } from '@chat-tutor/canvas'

export const getPageTools = async (pages: Page[]) => {
  const checkExist = (id: string) => {
    if (pages.find(page => page.id === id)) {
      return {
        success: false,
        message: 'Page already exists',
      }
    }
  }
  const createCanvas = tool({
    name: 'create_canvas',
    description: 'Create a new canvas page',
    parameters: type({
      id: 'string',
      title: 'string',
      range: type.number.array().describe('Range (y axis) of the coordinate system, a number tuple like [min, max]'),
      domain: type.number.array().describe('Domain (x axis) of the coordinate system, a number tuple like [min, max]'),
    }),
    execute: async ({ id, title, range, domain }) => {
      const result = checkExist(id)
      if (result) {
        return result
      }
      pages.push({
        id,
        title,
        type: PageType.CANVAS,
        steps: [],
        range: range as [number, number],
        domain: domain as [number, number],
      } as CanvasPage)
      return {
        success: true,
        message: 'Page created successfully',
        page: id,
      }
    }
  })

  return await Promise.all([createCanvas]) as Tool[]
}