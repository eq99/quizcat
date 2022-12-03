<script  lang="ts" setup>
import { onMounted, ref } from 'vue';

// types
export interface Carousel {
  href: string,
  imgLink: string
}

export interface Props {
  width: string | number,
  height: string | number,
  data: Carousel[],
  delay?: number
}

//vars
const props = withDefaults(defineProps<Props>(), {
  delay: 3000
});

// states
const current = ref(0);
const timer = ref<number | null>(null);


// methods
function goto(indx: number) {
  current.value = indx
}

function goRight() {
  current.value = (current.value + 1) % props.data.length;
}

function goLeft() {
  current.value = (current.value - 1 + props.data.length) % props.data.length;
}

function active(idx: number) {
  return idx === current.value
}

function start() {
  clearTimeout(timer.value as number);
  timer.value = window.setInterval(() => {
    goRight();
  }, props.delay);
}

function stop() {
  window.clearInterval(timer.value as number);
  timer.value = null;
}

onMounted(async () => {
  start();
})
</script>

<template>
  <div class="carousel" :style="{ width: width + 'px', height: height + 'px' }">
    <div class="img-list">
      <div class="img-wrapper" v-for="(item, idx) in data" :class="{ active: active(idx) }" @mouseenter="stop"
        @mouseleave="start">
        <a :href="item.href">
          <img :src="item.imgLink" alt="图片">
        </a>
      </div>
    </div>

    <div class="arrow">
      <div class="left" @click="goLeft"><i class="iconfont icon-arrow-left"></i></div>
      <div class="right" @click="goRight"><i class="iconfont icon-arrow-right"></i></div>
    </div>

    <ul class="circle-list">
      <li class="circle" v-for="idx in data.length" @click="goto(idx - 1)" :class="{ active: idx - 1 === current }">
      </li>
    </ul>
  </div>
</template>


<style lang="scss" scoped>
.carousel {
  position: relative;

  .img-list {
    position: relative;
    height: 100%;

    .img-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      transition: 0.6s ease-in-out;

      &.active {
        opacity: 1;
      }

      img {
        width: 100%;
      }
    }
  }

  .arrow div {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    width: 25px;
    height: 35px;
    line-height: 35px;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;

    text-align: center;
    user-select: none;
    cursor: pointer;

    .iconfont {
      font-size: 20px;
    }
  }

  .arrow div.left {
    left: 0;
    border-top-right-radius: 18px;
    border-bottom-right-radius: 18px;
  }

  .arrow div.right {
    right: 0;
    border-top-left-radius: 18px;
    border-bottom-left-radius: 18px;
  }

  .circle-list {
    display: flex;
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 8;

    .circle {
      margin: 0 5px;
      width: 6px;
      height: 6px;
      border: 2px solid #fff;
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 50%;
      cursor: pointer;

      &.active {
        background-color: rgba(255, 255, 255, 0.4);
      }
    }
  }
}
</style>