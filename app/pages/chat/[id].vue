<script setup lang="ts">
const { messages, input, send } = useChat()

const { input: initialInput } = useRoute().query as { input: string }
input.value = initialInput
send()
</script>

<template>
  <div class="flex flex-row w-full h-full">
    <div class="flex h-full w-full p-5 items-center justify-center">Content</div>
    <div class="flex flex-col h-screen max-h-screen bg-gray-200 w-150 p-3 shadow-lg">
      <Chat :messages="messages" v-model:input="input" @keydown.enter="send" />
    </div>
  </div>
</template>