<script  lang="ts" setup>
import { ref, type Prop } from 'vue';
import { Abuse, Report, Avatar, CommentEditor } from 'xiaui';
import type { Reply } from '@/types';

// types
export interface Props {
  reply: Reply,
}

// vars
const props = defineProps<Props>();

// states
const isEditorShown = ref(false);

// methods
function showEditor() {
  isEditorShown.value = !isEditorShown.value;
}
</script>

<template>
  <div class="reply">
    <Avatar size="32" :link="reply.avatar" class="r-avatar"></Avatar>
    <div class="r-main">
      <div class="r-hd">
        <a href="" class="username">{{ reply.username }}</a>回复 <a href="/user/2" class="link">@萝卜头</a> {{ reply.content
        }}
      </div>
      <div class="r-bd"></div>
      <div class="r-ft">
        <div class="time">{{ reply.updatedAt }}</div>
        <div class="action"><i class="iconfont icon-like1"></i><span>{{ reply.likeNum }}</span></div>
        <div class="action" @click="showEditor"><i class="iconfont icon-reply"></i></div>
        <Abuse class="abuse">
          <Report text="拉黑" action=""></Report>
          <Report text="举报" action=""></Report>
        </Abuse>
      </div>
    </div>
  </div>
  <component :is="CommentEditor" v-if="isEditorShown"></component>
</template>

<style lang="scss" scoped>
.reply {
  display: flex;
  font-size: 14px;
  padding: 16px 16px 16px 0;

  .r-avatar {
    flex-shrink: 0;
    margin-right: 8px;
  }

  .r-main {
    .r-hd {
      .username {
        color: var(--fg-helper);
      }

      .link {
        color: var(--fg-helper);
      }
    }

    .r-bd {
      margin: 8px 0;
    }
  }

  .r-ft {
    display: flex;
    align-items: center;

    .time {
      font-size: 12px;
      color: var(--fg-base3);
      margin-right: 16px;
    }

    .action {
      margin-right: 28px;

      .iconfont {
        margin-right: 8px;
        cursor: pointer;

        &:hover {
          color: var(--fg-primary);
        }
      }
    }

    .abuse {
      z-index: 2;
    }
  }
}
</style>