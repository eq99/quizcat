<script  lang="ts" setup>
import MarkdownVue from '@/components/know/Markdown.vue';

const markdown = `在本教程中，我们将学习常用的算法，并使用多种编程语言实现它们。

我们将涵盖以下算法：

- 排序算法（如快速排序、冒泡排序）
- 搜索算法（如二分搜索、广度优先搜索）
- 动态规划算法（如最长公共子序列、背包问题）

阅读本教程前，建议先对算法基础有所了解。

1. 排序算法（如快速排序、冒泡排序）
1. 搜索算法（如二分搜索、广度优先搜索）
1. 动态规划算法（如最长公共子序列、背包问题）
`;
</script>

<template>
  <div class="content">
    <MarkdownVue :markdown="markdown"></MarkdownVue>
  </div>
</template>

<style lang="scss" scoped>
.content {
  margin-top: 16px;
}
</style>