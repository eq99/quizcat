<script  lang="ts" setup>
import { Carousel, Zoom } from 'xiaui';

const data = [
  {
    href: "",
    imgLink: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/454c1da2c5b64a3f2c07c5a4c01aa9c4.jpg?thumb=1&w=2452&h=920&f=webp&q=90'
  },
  {
    href: '',
    imgLink: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6d90fda69e63bf93ae62120901bafc0e.jpg?thumb=1&w=2452&h=920&f=webp&q=90'
  },
  {
    href: '',
    imgLink: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/dce8b00fb3b4ebecbcf72353bff8a030.jpg?thumb=1&w=2452&h=920&f=webp&q=90'
  },
  {
    href: '',
    imgLink: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b836faf5402e8c14b626507b5c2e0ed5.jpeg?w=2452&h=920'
  }
];
</script>

<template>
  <div class="box">
    <Carousel :data="data" width="900" height="340">
    </Carousel>

    <Zoom small-img="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b836faf5402e8c14b626507b5c2e0ed5.jpeg?w=2452&h=920"
      big-img="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b836faf5402e8c14b626507b5c2e0ed5.jpeg?w=2452&h=920"></Zoom>
  </div>
</template> 

<style lang="scss" scoped>
.box {
  margin-top: 100px;
  margin-left: 30px;
}
</style>