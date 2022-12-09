<script  lang="ts" setup>
import { Avatar, Tooltip, Icon } from 'xiaui';
import Header from '@/components/site/Header.vue';
</script>

<template>
  <Header title="我的消息"></Header>
  <div class="chat container">
    <div class="board">
      <div class="chat-aside">
        <!-- <Avatar link="https://api.multiavatar.com/f2d85385.png" size="32" class="me"></Avatar> -->
        <Tooltip tip="私信" position="left" class="link">
          <Icon name="icon-chat1" font-size="24px" color="green"></Icon>
        </Tooltip>
        <Tooltip tip="群聊" position="left" class="link">
          <Icon name="icon-bxs-chat" font-size="24px" color="#999"></Icon>
        </Tooltip>
        <Tooltip tip="联系人" position="left" class="link">
          <Icon name="icon-friends" font-size="24px" color="#999"></Icon>
        </Tooltip>
        <Tooltip tip="朋友圈" position="left" class="link">
          <Icon name="icon-moments" font-size="24px" color="#999"></Icon>
        </Tooltip>
        <Tooltip tip="设置" position="left" class="settings link">
          <Icon name="icon-settings" font-size="24px" color="#999"></Icon>
        </Tooltip>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat {
  --white: #fff;
  --maxLightGray: #eee;

  .board {
    display: flex;
    background-color: var(--white);
    border-radius: 10px;
    width: 70vw;
    max-width: 1000px;
    min-height: 520px;
    margin: 12px auto;

    .chat-aside {
      width: 60px;
      border-right: 1px solid var(--maxLightGray);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px 0;

      .me {
        margin-bottom: 8px;
      }

      .link {
        cursor: pointer;
      }

      .settings {
        margin-top: auto;
      }
    }

  }

}
</style>