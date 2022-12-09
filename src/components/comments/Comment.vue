<script  lang="ts" setup>
import { ref } from 'vue';
import { Avatar, Abuse, Report, CommentEditor } from 'xiaui';
import ReplyList from './ReplyList.vue';
import type { Comment } from '@/types';

//vars
const props = defineProps<{
  comment: Comment
}>();

// states
const isEditorShown = ref(false);

// methods
function showEditor() {
  isEditorShown.value = !isEditorShown.value;
}
</script>

<template>
  <div class="comment">
    <Avatar :link="comment.avatar" class="c-avatar"></Avatar>
    <div class="c-main">
      <div class="c-hd">
        <div class="username">{{ comment.username }}</div>
      </div>
      <div class="c-bd">{{ comment.content }}</div>
      <div class="c-ft">
        <div class="time">{{ comment.updatedAt }}</div>
        <div class="action"><i class="iconfont icon-like1"></i><span>{{ comment.likeNum }}</span></div>
        <div class="action" @click="showEditor"><i class="iconfont icon-reply"></i></div>
        <Abuse class="abuse">
          <Report text="拉黑" action=""></Report>
          <Report text="举报" action=""></Report>
        </Abuse>
      </div>
      <component :is="CommentEditor" v-if="isEditorShown"></component>
      <ReplyList comment-id="1"></ReplyList>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.comment {
  display: flex;
  font-size: 14px;
  padding: 16px 16px 16px 0;

  .c-avatar {
    flex-shrink: 0;
    margin-right: 16px;
  }

  .c-main {
    .c-hd {
      .username {
        color: var(--fg-helper);
      }
    }

    .c-bd {
      margin: 8px 0;
    }
  }

  .c-ft {
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