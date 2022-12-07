<script  lang="ts" setup>
import { ref } from 'vue';
import Icon from "../Icon.vue";
import EMOJIS, { getEmojiURL } from './emojis';

//vars
const emit = defineEmits<{
  (e: "add", mode: string): void,
}>();

// states
const isExpand = ref(false);

// methos
function handleExpand() {
  isExpand.value = !isExpand.value;
}

function addEmoji(e: MouseEvent) {
  // 事件委托处理添加表情
  emit('add', (e.target as HTMLElement).title);
  isExpand.value = false;
}
</script>

<template>
  <div class="e-wrapper">
    <Icon name="icon-emotion" font-size="24px" color="#666" pointer @click="handleExpand"></Icon>
    <div class="emojis" v-show="isExpand" @click="addEmoji">
      <img class="emoji" v-for="emoji in EMOJIS" :src="getEmojiURL(emoji[1])" :alt="`[${emoji[0]}]`"
        :title="`[${emoji[0]}]`">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.e-wrapper {
  position: relative;
  flex-shrink: 0;
  user-select: none;

  .emojis {
    width: 240px;
    background-color: #fff;
    position: absolute;
    bottom: 100%;
    box-shadow: 0 0 8px #999;
    border-radius: 8px;
    overflow: hidden;
    padding: 12px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .emoji {
      width: 24px;
      height: 24px;
      cursor: pointer;

      padding: 4px;
      border-radius: 4px;
      overflow: hidden;

      &:hover {
        background-color: #eee;
      }
    }
  }
}
</style>