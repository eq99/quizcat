<script  lang="ts" setup>
import { ref } from 'vue';
import Emoji from './Emoji.vue';
import Mention from './Mention.vue';

// states
const text = ref<string>('');

// methods
function handleSend() {
  alert("发送完成");
}

function addEmoji(mode: string) {
  text.value += mode;
}
</script>

<template>
  <div class="chat-editor">
    <div class="tools">
      <Emoji class="tool" @add="addEmoji"></Emoji>
      <Mention class="tool"></Mention>
    </div>
    <div class="input">
      <textarea rows="3" v-model="text"></textarea>
    </div>
    <div class="foot">
      <button class="send-btn" @click="handleSend">发送</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-editor {
  .tools {
    display: flex;
    // border-bottom: 1px solid #eee;

    .tool {
      margin: 0 6px;
    }
  }

  .input {
    display: flex;
    align-items: center;

    textarea {
      padding: 4px 8px;
      line-height: 1.5;
      font-size: 14px;
      flex-grow: 1;
      width: 100%;
      resize: none;
      border-radius: 4px;

      &::-webkit-scrollbar {
        width: 4px;
      }
    }
  }

  .foot {
    display: flex;
    justify-content: flex-end;

    .send-btn {
      background-color: var(--bg-base3);
      color: var(--fg-base1);
      width: 80px;
      padding: 4px 8px;
      cursor: pointer;
      margin-right: 12px;
    }
  }
}
</style>