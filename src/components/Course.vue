<script  lang="ts" setup>
export interface Props {
  link: string,
  cover: string,
  name: string,
  detail: string
}

//vars
const props = defineProps<Props>();
</script>

<template>
  <a :href="link" class="course" target="_blank">
    <div class="cover"><img :src="cover" alt=""></div>
    <div class="name-wrapper">
      <div class="name s1">{{ name }}</div>
      <div class="detail s2">{{ detail }}</div>
    </div>
  </a>
</template>


<style lang="scss" scoped>
.course {
  display: flex;
  align-items: center;
  background-color: var(--bg-base1);
  margin-bottom: 12px;
  padding: 12px;
  transition: .3s;

  &:hover {
    box-shadow: 2px 4px 8px var(--bg-base2);
    transform: translateY(-4px);

    .name {
      color: var(--fg-primary);
    }
  }

  .cover {
    flex-shrink: 0;
    border-radius: 4px;
    overflow: hidden;
    margin-right: 8px;

    img {
      width: 90px;
      height: 60px;
    }
  }

  .name {
    overflow: hidden;
  }

  .detail {
    font-size: 12px;
    margin-top: 4px;
  }
}
</style>