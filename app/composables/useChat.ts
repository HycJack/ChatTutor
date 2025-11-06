import type { Message } from '#shared/types'

export const useChat = () => {
  const messages = ref<Message[]>([])
  const input = ref('')
  const { params } = useRoute()
  const id = params.id as string
  let eventSource: EventSource | null = null

  const send = async () => {
    const i = input.value
    input.value = ''
    if (eventSource) {
      eventSource.close()
      eventSource = null
    }

    messages.value.push({
      type: 'user',
      content: i,
      id: crypto.randomUUID(),
    })
    messages.value.push({
      type: 'assistant',
      content: '',
      id: crypto.randomUUID(),
    })
    
    eventSource = new EventSource(`/api/chat/${id}?input=${i}`)
    
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data.type === 'text') {
          messages.value.at(-1)!.content += data.options.chunk
        } else {
          console.log(data)
        }
      } catch (error) {
        console.error('Failed to parse event data:', error)
      }
    }
    
    eventSource.onerror = (error) => {
      console.error('EventSource error:', error)
      if (eventSource) {
        eventSource.close()
        eventSource = null
      }
    }
    
    eventSource.onopen = () => {
      console.log('EventSource connected')
    }
  }

  const cleanup = () => {
    if (eventSource) {
      eventSource.close()
      eventSource = null
    }
  }

  onUnmounted(() => {
    cleanup()
  })

  return {
    messages,
    input,
    send,
    cleanup,
  }
}