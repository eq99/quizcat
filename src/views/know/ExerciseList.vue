<script  lang="ts" setup>
import { useExerciseStore, useManagerStore } from '@/stores/book';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// vars
const route = useRoute();
const exerciseStore = useExerciseStore();
const { fetchExercises } = exerciseStore;
const managerStore = useManagerStore();
const { exercises } = storeToRefs(exerciseStore);
const { isManager } = managerStore;


// computed
const bookId = computed(() => {
  return Number(route.params.bookId);
})

// life cicles
fetchExercises(route.params.bookId as string);
</script>

<template>
  <div class="exs">
    <RouterLink :to="`/book/${bookId}/exs/0/edit?type=create`" v-if="exercises.length===0 && isManager(bookId)">
      <n-button>添加练习</n-button>
    </RouterLink>

    <div class="ex-item" v-for="(ex, idx) in exercises">
      <div class="left">
        {{ idx + 1 }}
      </div>
      <div class="right">
        <div class="hd">
          <RouterLink :to="`/book/1/exs/${ex.id}`" class="name">{{ ex.title }}</RouterLink>
        </div>
        <div class="bd">
          <div class="tags">
            <div class="tag" v-for="tag in ex.tags.split(':')">{{ tag }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.exs {
  margin-top: 16px;

  .ex-item {
    display: flex;
    background-color: #fff;
    margin-bottom: 12px;
    padding: 8px 12px;

    .left {
      flex-shrink: 0;
      font-size: 32px;
      margin-right: 16px;
    }

    .right {
      flex: 1;

      .hd {
        .name {
          font-size: 16px;
        }
      }

      .bd {
        display: flex;
        margin-top: 8px;

        .tag {
          display: inline-block;
          font-size: 12px;
          padding: 4px;
          height: 18px;
          line-height: 18px;
          border-radius: 4px;
          background-color: rgba(0, 150, 94, .1);
          margin-right: 4px;
        }

        .meta {
          margin-left: auto;
        }
      }
    }
  }
}
</style>