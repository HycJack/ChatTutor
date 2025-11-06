export type UserMessage = {
  type: 'user'
  content: string
}
export type AssistantMessage = {
  type: 'assistant'
  content: string
}
export type Message = (UserMessage | AssistantMessage) & { id: string }