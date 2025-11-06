<script setup lang="ts">
import { MarkdownRender } from 'vue-renderer-markdown'
import type { Message } from '#shared/types'

defineProps<{
  messages: Message[]
}>()

const input = defineModel<string>('input', { required: true })
</script>

<template>
  <div class="flex flex-col size-full">
    <div class="w-full h-full flex flex-col gap-2 overflow-y-auto">
      <div
        v-for="message in messages"
        :key="message.id"
        class="text-gray-600 px-2 markdown"
        :class="{
          'border-gray-300 border border-rounded-lg': message.type === 'user',
        }"
      >
        <ClientOnly>
          <MarkdownRender :content="message.content" />
        </ClientOnly>
      </div>
    </div>
    <div class="w-full h-50">
      <PromptArea v-model:input="input" />
    </div>
  </div>
</template>
