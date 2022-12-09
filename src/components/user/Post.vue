<!-- 用户动态组件 -->
<script  lang="ts" setup>
import { ref } from "vue";
import { Abuse, Report, Avatar, CommentEditor } from 'xiaui';
import PostArticle from "@/components/PostArticle.vue";
import CommentList from "@/components/comments/CommentList.vue";
import { formatTime } from '@/lib';
import type { Post, PostDetail } from '@/types';

// vars
const props = defineProps<{
  post: Post
}>();

const comp = new Map(); // register components here
comp.set("article", PostArticle);

// states
const isCommentsLoaded = ref(false);

// methods
function selectComponent(detail: PostDetail) {
  return comp.get(detail.kind);
}

function loadComments() {
  isCommentsLoaded.value = !isCommentsLoaded.value;
}
</script>

<template>
  <div class="s-card">
    <div class="left">
      <Avatar :link="post.avatar"></Avatar>
    </div>
    <div class="right grow">
      <div class="s-hd">
        <div class="row">
          <div class="username">{{ post.username }}</div>
          <Abuse>
            <Report text="拉黑" action=""></Report>
            <Report text="举报" action=""></Report>
          </Abuse>
        </div>
        <div class="row">
          <div class="time">{{ formatTime(post.updatedAt) }}</div>
        </div>
      </div>
      <div class="s-body">
        <component :is="selectComponent(post.detail)" :detail="post.detail"></component>
      </div>
      <div class="s-actions">
        <div class="action"><i class="iconfont icon-like1"></i>{{ post.likeNum }}</div>
        <div class="action" @click="loadComments"><i class="iconfont icon-reply"></i>{{ 2342 }}</div>
        <div class="action"><i class="iconfont icon-fenxiang"></i>{{ 2345 }}</div>
      </div>
    </div>
  </div>

  <div class="comment" v-if="isCommentsLoaded">
    <CommentEditor></CommentEditor>
    <component :is="CommentList" article-id="11"></component>
  </div>
</template>

<style lang="scss" scoped>
.s-card {
  margin: 12px 0;
  box-sizing: border-box;
  padding: 16px 24px 12px 12px;
  background-color: var(--bg-base1);

  display: flex;

  .right {
    margin-left: 8px;

    .username {
      margin-bottom: 4px;

      &:hover {
        color: var(--fg-helper);
      }
    }

    .time {
      font-size: 12px;
      color: var(--fg-base2);
    }

    .s-body {
      margin: 12px 0;
      width: 80%;
    }

    .s-actions {
      display: flex;

      .action {
        cursor: pointer;
        display: flex;
        align-items: center;
        user-select: none;

        .iconfont {
          font-size: 24px;
          margin-right: 4px;
        }

        &:not(:last-child) {
          margin-right: 40px;
        }

        &:hover {
          color: var(--fg-primary);
        }
      }
    }
  }
}
</style>