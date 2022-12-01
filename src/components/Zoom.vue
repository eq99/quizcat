<script  lang="ts" setup>
import { computed } from '@vue/reactivity';
import { onMounted, ref } from 'vue';

// types
export interface Props {
  smallImg: string,
  bigImg: string,
}

//vars
const props = defineProps<Props>();

//states
const zoomBox = ref<HTMLElement>();
const smallBox = ref<HTMLElement>();
const maskBox = ref<HTMLElement>();
const bigBox = ref<HTMLElement>();


// methods
function handleMoveOnSmall(e: MouseEvent) {
  const width = maskBox.value!.offsetWidth / 2;
  const height = maskBox.value!.offsetHeight / 2;

  const deltaX = Math.min(Math.max(0, e.pageX - zoomBox.value!.offsetLeft - width), smallBox.value!.offsetWidth - maskBox.value!.offsetWidth);
  const deltaY = Math.min(Math.max(0, e.pageY - zoomBox.value!.offsetTop - height), smallBox.value!.offsetHeight - maskBox.value!.offsetHeight)

  maskBox.value!.style.left = deltaX + "px";
  maskBox.value!.style.top = deltaY + "px";

  const rate = bigBox.value!.offsetWidth / maskBox.value!.offsetWidth;

  bigBox.value!.style.backgroundPositionX = -deltaX * rate + "px";
  bigBox.value!.style.backgroundPositionY = -deltaY * rate + "px";
}

function handleMouseEnter() {
  maskBox.value!.style.display = "block";
  bigBox.value!.style.display = "block";

  const rate = bigBox.value!.offsetWidth / maskBox.value!.offsetWidth;
  bigBox.value!.style.backgroundSize = smallBox.value!.offsetWidth * rate + "px";
}

function handleMouseLeave() {
  maskBox.value!.style.display = "none";
  bigBox.value!.style.display = "none";
}

function loadImage() {
  bigBox.value!.style.backgroundImage = `url("${bigBox.value!.dataset.img}")`;
}

onMounted(async () => {
  loadImage();
})
</script>

<template>
  <div class="zoom" ref="zoomBox">
    <div class="small" @mousemove="handleMoveOnSmall" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"
      ref="smallBox">
      <img :src="smallImg" alt="商品图片">
      <div class="mask" ref="maskBox"></div>
    </div>
    <div class="big" ref="bigBox" :data-img="bigImg">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.zoom {
  position: relative;

  .small {
    position: relative;
    width: 300px;
    height: 400px;

    img {
      width: 100%;
    }

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 160px;
      height: 160px;
      background-color: rgb(255, 255, 0, 0.3);
      cursor: move;
      display: none;
    }
  }

  .big {
    position: absolute;
    top: 0;
    left: 301px;
    width: 400px;
    height: 400px;
    overflow: hidden;
    display: none;
    background-repeat: no-repeat;
    // background-size: 750px;
    // background-image: url("//img13.360buyimg.com/n1/s350x467_jfs/t1/218810/22/23762/218396/637f20d4Eb088c1e6/c45ffbf83bdb9059.jpg");
    background-position: 0px 0px;
  }
}
</style>