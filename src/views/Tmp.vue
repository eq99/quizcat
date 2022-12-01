<script  lang="ts" setup>
import MagnifierVue from '@/components/Zoom.vue';

</script>

<template>
  <div class="box">
    <MagnifierVue
      smallImg="//img13.360buyimg.com/n1/s350x467_jfs/t1/218810/22/23762/218396/637f20d4Eb088c1e6/c45ffbf83bdb9059.jpg!cc_350x467.avif"
      bigImg="//img13.360buyimg.com/n1/s750x1000_jfs/t1/218810/22/23762/218396/637f20d4Eb088c1e6/c45ffbf83bdb9059.jpg!cc_750x1000.avif">
    </MagnifierVue>
  </div>
</template>

<style lang="scss" scoped>
.box {
  margin-top: 100px;
  margin-left: 30px;
}
</style>