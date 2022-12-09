<script lang="ts" setup>
import HeaderVue from '@/components/site/Header.vue';
import SchoolVue from '@/components/School.vue';
import CourseVue from '@/components/Course.vue';

const langs = [
  {
    link: "https://learnenglish.britishcouncil.org/grammar",
    name: "英语语法",
    detail: "一步步提升自己的语法知识",
    cover: 'https://pic.imgdb.cn/item/6383767416f2c2beb13355ed.jpg',
  },
]

const frontend = [
  {
    link: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
    name: "网页设计基础",
    detail: "HTML 搭建结构，CSS 美化页面",
    cover: 'https://pic.imgdb.cn/item/63837c9b16f2c2beb13e044b.png',
  },
  {
    link: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
    name: "JavaScript ",
    detail: "系统学习 JavaScript",
    cover: 'https://pic.imgdb.cn/item/63837ef716f2c2beb14bee94.png',
  },
]

const computers = [
  {
    link: 'https://sarabander.github.io/sicp/html/index.xhtml',
    name: '理解计算机程序',
    detail: '编程到底是怎么一回事呢？',
    cover: 'https://pic.imgdb.cn/item/6383510116f2c2beb1efb86a.jpg'
  },
  {
    link: 'http://rcore-os.cn/rCore-Tutorial-Book-v3/index.html',
    name: '动手写操作系统',
    detail: '真不敢相信自己也能写出操作系统',
    cover: 'https://pic.imgdb.cn/item/6383790216f2c2beb137336a.png'
  },
  {
    link: 'https://craftinginterpreters.com/contents.html',
    name: '编译原理',
    detail: '编程语言哪里怎么设计出来的呢？',
    cover: 'https://pic.imgdb.cn/item/6383004e16f2c2beb170c48e.png'
  },
  {
    link: 'https://hansimov.gitbook.io/csapp',
    name: '计算机体系结构',
    detail: '计算机是如何工作的呢',
    cover: 'https://pic.imgdb.cn/item/638351fd16f2c2beb1f254fe.jpg'
  },
  {
    link: 'https://oi-wiki.org/',
    name: '算法与数据结构',
    detail: '会算法是才能写出改变世界的代码哦',
    cover: 'https://pic.imgdb.cn/item/6383573c16f2c2beb1fe5191.jpg'
  },
]

const math = [
  {
    link: 'https://ximera.osu.edu/mooculus',
    name: '微积分通关',
    detail: '微积分三部曲',
    cover: 'https://pic.imgdb.cn/item/63835ff516f2c2beb10ae5c6.jpg'
  },
  {
    link: 'http://immersivemath.com/ila/index.html', //https://docs.irudder.me/document/Linear-algebra-docs/#/
    name: '线性代数',
    detail: '看得见的线性代数学习方法',
    cover: 'https://pic.imgdb.cn/item/6383646d16f2c2beb1149406.jpg'
  },
  {
    link: 'https://seeing-theory.brown.edu/index.html',
    name: '概率论与统计学',
    detail: '通过网页交互操作学概率论',
    cover: 'https://pic.imgdb.cn/item/63836c7916f2c2beb12190d4.jpg'
  },
]
</script>

<template>

  <HeaderVue name="喵学堂" homenav="/schools"></HeaderVue>

  <SchoolVue icon="icon-language" name="外语外语">
    <CourseVue v-for="course in langs" :link="course.link" :cover="course.cover" :name="course.name"
      :detail="course.detail"></CourseVue>
  </SchoolVue>

  <SchoolVue icon="icon-HTML-fill" name="前端工程师">
    <CourseVue v-for="course in frontend" :link="course.link" :cover="course.cover" :name="course.name"
      :detail="course.detail"></CourseVue>
  </SchoolVue>


  <SchoolVue icon="icon-Code" name="硬核计算机">
    <CourseVue v-for="course in computers" :link="course.link" :cover="course.cover" :name="course.name"
      :detail="course.detail"></CourseVue>
  </SchoolVue>

  <SchoolVue icon="icon-math-compass" name="大学数学">
    <CourseVue v-for="course in math" :link="course.link" :cover="course.cover" :name="course.name"
      :detail="course.detail"></CourseVue>
  </SchoolVue>
</template>