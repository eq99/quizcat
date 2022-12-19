<script  lang="ts" setup>
import { onMounted, ref } from 'vue';
import Layout from '@/components/chat/Layout.vue';
import OneItem from '@/components/chat/OneItem.vue';
import OneMsg from '@/components/chat/OneMsg.vue';
import { OneChatEditor } from 'xiaui';
import type { OneChat, OneMessage } from '@/types';
import { useTokenStore } from "@/stores/token";
import { storeToRefs } from 'pinia';
import { getActiveFriends, getOneMessages, sendOneMessage } from '@/apis/chat';
import { getTimeDiff } from "@/lib/";
import { useUserStore } from '@/stores/user';

// vars
const { token } = storeToRefs(useTokenStore());
const { user } = storeToRefs(useUserStore());
const WS_API = import.meta.env.VITE_ONECHAT_WS_API;

// states
const onechats = ref<OneChat[]>([]);
const messages = ref<OneMessage[]>([]);
const currentChat = ref(0);

//methods
async function loadOneChats() {
  onechats.value = await getActiveFriends(token.value?.value || "");

  onechats.value = onechats.value.map(one => {
    return {
      id: one.id,
      avatar: one.avatar,
      name: one.name.length > 15 ? one.name.split("-")[0] : one.name,
      last: "一起来蹦迪"
    };
  });
}

function loadCurrentChat(idx: number) {
  currentChat.value = idx;
  loadMessages(idx);
}

async function loadMessages(idx: number) {
  const friend = onechats.value[idx];
  messages.value = await getOneMessages(token.value?.value || "", friend.id);
  messages.value = messages.value.map(m => {
    return m.fromId === user.value!.id ?
      {
        id: m.id,
        content: m.content,
        fromId: m.fromId,
        toId: m.toId,
        avatar: user.value!.avatar,
        username: user.value!.name,
        createdAt: getTimeDiff(m.createdAt)
      }
      :
      {
        id: m.id,
        content: m.content,
        fromId: m.fromId,
        toId: m.toId,
        avatar: friend.avatar,
        username: friend.name,
        createdAt: getTimeDiff(m.createdAt)
      };
  })
}

function addMyMessage(msg: string, toId: number) {
  messages.value.unshift({
    id: 0,
    content: msg,
    fromId: user.value!.id,
    toId: toId,
    avatar: user.value!.avatar,
    username: user.value!.name,
    createdAt: getTimeDiff(Date.parse((Date() + 8 * 3600000)).toString())
  })
}

async function handleSend(msg: string) {
  const friend = onechats.value[currentChat.value];
  addMyMessage(msg, friend.id);
  await sendOneMessage(token.value?.value || "", friend.id, msg);
}

// life cicles
onMounted(async () => {
  await loadOneChats();
  await loadMessages(0);

  let connection = new WebSocket(WS_API);
  connection.onmessage = (event) => {
    // Vue data binding means you don't need any extra work to
    // update your UI. Just set the `time` and Vue will automatically
    // update the `<h2>`.
    console.log("ws:", event.data);
  }
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
        <div class="title">{{ onechats[currentChat]?.name }}</div>
        <div class="chat-list">
          <OneMsg v-for="msg in messages" :msg="msg" :right="user?.id === msg.fromId"></OneMsg>
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
    // auto scroll to bottom
    // see: https://stackoverflow.com/a/44051405
    display: flex;
    flex-direction: column-reverse;

    &::-webkit-scrollbar {
      width: 4px;
    }
  }
}
</style>