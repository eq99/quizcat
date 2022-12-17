<script  lang="ts" setup>
import { onMounted, ref } from 'vue';
import Layout from '@/components/chat/Layout.vue';
import OneItem from '@/components/chat/OneItem.vue';
import OneMsg from '@/components/chat/OneMsg.vue';
import { OneChatEditor } from 'xiaui';
import type { OneChat, OneMessage } from '@/types';

// vars
let me = 1;

// states
const onechats = ref<OneChat[]>([]);
const messages = ref<OneMessage[]>([]);
const currentChat = ref(0);

//methods
function loadOneChats() {
  onechats.value = [
    {
      id: 1,
      friendId: 1,
      avatar: "https://api.multiavatar.com/f2d853835.png",
      username: "甜心菜",
      last: "中午吃什么比较好呢"
    },
    {
      id: 2,
      friendId: 2,
      avatar: "https://api.multiavatar.com/f2s853835.png",
      username: "卷心白",
      last: "明天去看电影吧"
    },
  ]
}

function loadCurrentChat(idx: number) {
  currentChat.value = idx;
  loadMessages();
}

function loadMessages() {
  messages.value = [
    {
      userid: 1,
      avatar: "https://api.multiavatar.com/f2d853835.png",
      content: "在吗",
      createdAt: "3小时前"
    },
    {
      userid: 2,
      avatar: "https://api.multiavatar.com/f2d853836.png",
      content: "干嘛",
      createdAt: "3小时前"
    },
    {
      userid: 1,
      avatar: "https://api.multiavatar.com/f2d853835.png",
      content: "我喜欢你好久了",
      createdAt: "3小时前"
    },
    {
      userid: 2,
      avatar: "https://api.multiavatar.com/f2d853836.png",
      content: "你喜欢我哪里",
      createdAt: "3小时前"
    },
    {
      userid: 2,
      avatar: "https://api.multiavatar.com/f2d853836.png",
      content: "我改",
      createdAt: "3小时前"
    },
    {
      userid: 2,
      avatar: "https://api.multiavatar.com/f2d853836.png",
      content: "你是个好人，我不想伤害你",
      createdAt: "3小时前"
    },
  ]
}

function handleSend(msg: string) {
  alert(msg);
}

// life cicles
onMounted(async () => {
  loadOneChats();
  loadMessages();
})
</script>

<template>
  <Layout>
    <template #left>
      <div class="users">
        <OneItem v-for="(chat, idx) in onechats" :onechat="chat" @click="loadCurrentChat(idx)" :data-id="idx"
          :class="{ active: idx == currentChat }">
        </OneItem>
      </div>
    </template>
    <template #right>
      <div class="window">
        <div class="title">{{ "站长" }}</div>
        <div class="chat-list">
          <OneMsg v-for="msg in messages" :msg="msg" :right="me === msg.userid"></OneMsg>
        </div>
        <OneChatEditor @send="handleSend"></OneChatEditor>
      </div>
    </template>
  </Layout>
</template>

<style lang="scss" scoped>
.window {
  .title {
    padding: 8px 16px;
    border-bottom: 1px solid #eee;
  }

  .chat-list {
    padding-top: 4px;
    height: 330px;
    background-color: var(--bg-base1);
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 4px;
    }
  }
}
</style>