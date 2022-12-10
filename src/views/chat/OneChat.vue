<script  lang="ts" setup>
import Layout from '@/components/chat/Layout.vue';
import UserItem from '@/components/chat/UserItem.vue';
import OneMsg from '@/components/chat/OneMsg.vue';
import { ChatEditor } from 'xiaui';
</script>

<template>
  <Layout>
    <template #left>
      <div class="users">
        <UserItem class="active"></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
        <UserItem></UserItem>
      </div>
    </template>
    <template #right>
      <div class="window">
        <div class="title">{{ "站长" }}</div>
        <div class="chat-list">
          <OneMsg></OneMsg>
          <OneMsg right></OneMsg>
          <OneMsg></OneMsg>
          <OneMsg></OneMsg>
          <OneMsg></OneMsg>
          <OneMsg right></OneMsg>
          <OneMsg></OneMsg>
          <OneMsg></OneMsg>
          <OneMsg></OneMsg>
          <OneMsg right></OneMsg>
        </div>
        <ChatEditor></ChatEditor>
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