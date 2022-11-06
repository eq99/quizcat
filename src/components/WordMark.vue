<script  lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  content: string,
  active: boolean,
}>()

// states
const isActive = ref(props.active);


// methods
function handleMouseEnter() {
  isActive.value = true;
}

function handleMouseLeave() {
  if (!props.active)
    isActive.value = false;
}
</script>

<template>
  <div class="m-wrapper" :class="{ active: isActive }" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="m-box">
      <div class="circle"></div>
      <div class="line"></div>
      <div class="content">{{ content }}</div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.m-wrapper:not(:last-child) {
  margin-right: -30px;
}

.m-wrapper {
  cursor: pointer;

  &.active {
    .m-box {
      transform: translateX(-30px);
    }
  }

  .m-box {
    width: 64px;
    height: 240px;
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: #dcd3b2;
    border-radius: 12px;
    box-sizing: border-box;
    padding-bottom: 8px;

    border: 2px solid #a59564;

    transition: .6s;

    position: relative;


    .circle {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      margin: 16px 0 10px;
      border-radius: 50%;
      background-color: #fff;
    }

    .line {
      position: absolute;
      left: calc(50% - 8px);
      top: 20px;
      width: 40px;
      height: 2px;
      background-color: #e83929;
    }

    .content {
      font-family: "Comic Sans MS";
      // text-transform: uppercase;
      width: 60%;
      // margin-right: 4px;
      writing-mode: vertical-lr;
      font-size: 28px;
      overflow: hidden;
    }
  }
}
</style>