<script  lang="ts" setup>
import SubjectVue from '@/components/know/Subject.vue';

const subjects = [
  {
    id: 1,
    name: '算法设计初级',
    cover: 'https://cdn.pixabay.com/photo/2022/06/21/16/18/orange-7276122_640.jpg'
  },
  {
    id: 2,
    name: '算法设计初级',
    cover: 'https://cdn.pixabay.com/photo/2022/06/21/16/18/orange-7276122_640.jpg'
  },
  {
    id: 3,
    name: '算法设计初级',
    cover: 'https://cdn.pixabay.com/photo/2022/06/21/16/18/orange-7276122_640.jpg'
  },
  {
    id: 4,
    name: '算法设计初级',
    cover: 'https://cdn.pixabay.com/photo/2022/06/21/16/18/orange-7276122_640.jpg'
  },
  {
    id: 5,
    name: '算法设计初级',
    cover: 'https://cdn.pixabay.com/photo/2022/12/14/13/43/snow-7655439_640.png'
  },
  {
    id: 6,
    name: '算法设计初级',
    cover: 'https://cdn.pixabay.com/photo/2022/06/21/16/18/orange-7276122_640.jpg'
  },

]
</script>

<template>
  <div class="subject-box">
    <div class="hd"> <i class="iconfont icon-terminal"></i> <span>算法设计</span> </div>
    <div class="subjects">
      <SubjectVue v-for="subject in subjects" :subject="subject"></SubjectVue>
    </div>
  </div>
  <div class="subject-box">
    <div class="hd"> <i class="iconfont icon-terminal"></i> <span>算法设计</span> </div>
    <div class="subjects">
      <div class="subject" v-for="subject in subjects">
        <div class="cover"><img :src="subject.cover" alt="">
        </div>
        <div class="name">{{ subject.name }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.subject-box {
  padding: 4px 24px;

  .hd {
    font-size: 20px;

    .iconfont {
      font-size: 24px;
    }
  }

  .subjects {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;

    .subject {
      .cover {
        height: 140px;
        overflow: hidden;
      }

      .name {
        text-align: center;
      }
    }
  }
}
</style>