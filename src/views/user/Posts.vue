<script setup lang="ts">
import PostVue from '@/components/user/Post.vue';

const posts = [
  {
    id: 1,
    likeNum: 234,
    detail: {
      kind: "article",
      content: "这几天试着做了科目三睡觉这个素材，但感觉做的质量不太行，所以还是不打算发了。不好意思啊各位，可能又要鸽一会了...[保卫萝卜_哭哭]这几天试着做了科目三睡觉这个素材，但感觉做的质量不太行，所以还是不打算发了。不好意思啊各位，可能又要鸽一会了...[保卫萝卜_哭哭]",
      link: ""
    },
    updatedAt: "2022-12-23",
    userid: 1,
    username: "甜心森",
    avatar: "https://api.multiavatar.com/f2d85385.png"
  },
  {
    id: 1,
    likeNum: 155,
    detail: {
      kind: "article",
      content: "hahahha",
      link: ""
    },
    updatedAt: "2022-12-23",
    userid: 1,
    username: "甜心森",
    avatar: "https://api.multiavatar.com/f2d85385.png"
  },
  {
    id: 1,
    likeNum: 252525,
    detail: {
      kind: "article",
      content: "hahahha",
      link: ""
    },
    updatedAt: "2022-12-23",
    userid: 1,
    username: "甜心森",
    avatar: "https://api.multiavatar.com/f2d85385.png"
  },
]
</script>


<template>
  <PostVue v-for="post in posts" :post="post"></PostVue>
</template>

<style lang="scss" scoped>

</style>