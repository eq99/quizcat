<script  lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue';


// types
export interface Props {
  total: number | string,
  pageSize: number | string,
}

// states
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "change", page: number | string): void,
}>();
const currentPage = ref(1);


// computed
const pageCount = computed(() => {
  return Math.ceil(Number(props.total) / Number(props.pageSize))
});

const pages = computed(() => {
  const arr = [];
  if (pageCount.value < 8) {
    for (let i = 0; i < pageCount.value; i++) {
      arr.push(i + 1);
    }
  } else {
    let start = Math.min(Math.max(2, currentPage.value - 2), pageCount.value - 5);

    let end = Math.min(start + 5, pageCount.value);
    for (let i = start; i < end; i++) {
      arr.push(i);
    }
  }

  return arr;
});

const showLessDots = computed(() => {
  return (pageCount.value > 7 && currentPage.value - 1 > 3);
})

const showMoreDots = computed(() => {
  return (pageCount.value > 7 && pageCount.value - currentPage.value > 3);
})

const showFirst = computed(() => {
  return pageCount.value > 7
});

const showLast = computed(() => {
  return pageCount.value > 7
});

// watches
watch(currentPage, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    emit("change", newValue);
  }
})

// methods
function handleClick(e: Event) {
  const page = Number((e.target as HTMLElement).innerText);

  if (isNaN(page) || page === 0) {
    return;
  }

  currentPage.value = page;
}

function handleMore(e: Event) {
  e.stopPropagation();
  if (currentPage.value < pageCount.value) {
    currentPage.value++;
  }
}

function handleLess(e: Event) {
  e.stopPropagation();
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
</script>

<template>
  <div class="pagenate">
    <div class="pages" @click="handleClick">
      <div class="page-item" @click="handleLess"><i class="iconfont icon-arrow-left"></i></div>
      <div class="page-item" v-show="showFirst" :class="{ active: currentPage == 1 }">{{ 1 }}</div>
      <div class="page-item" v-show="showLessDots"><i class="iconfont icon-threedots"></i></div>
      <div class="page-item" v-for="page in pages" :class="{ active: currentPage == page }">{{
          page
      }}
      </div>
      <div class="page-item" v-show="showMoreDots"><i class="iconfont icon-threedots"></i></div>
      <div class="page-item" v-show="showLast" :class="{ active: currentPage == pageCount }">{{ pageCount }}</div>
      <div class="page-item" @click="handleMore"><i class="iconfont icon-arrow-right"></i></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pagenate {
  margin-left: 120px;

  .pages {
    display: flex;
    align-items: center;

    .page-item {
      line-height: 32px;
      font-size: 14px;
      min-width: 28px;
      padding: 0 4px;
      background-color: var(--bg-base1);
      border-radius: 4px;
      cursor: pointer;

      display: flex;
      justify-content: center;
      align-items: center;

      margin-right: 4px;

      &:hover {
        color: var(--fg-primary);
      }

      &.active {
        background-color: var(--bg-primary);
        color: var(--fg-base1);
      }
    }
  }
}
</style>