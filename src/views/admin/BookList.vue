<script  lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { Book } from '@/types';
import { getBooks } from '@/services/book'

// data
const page = ref(1);
const perPage = ref(20);
const books = ref<Book[]>([]);

// methods
function handlePage(page: number) {
  // alert(page);
}

// lifes
onMounted(async () => {
  getBooks(page.value, perPage.value).then(res => {
    books.value = res.data;
  });
})
</script>

<template>
  <n-table striped>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Cover</th>
        <th>Hard</th>
        <th>Operation</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="book in books" :key="book.id">
        <td>{{ book.id }}</td>
        <td>{{ book.name }}</td>
        <td> <n-image width="100" :src="book.cover" /></td>
        <td>{{ book.hard }}</td>
        <td>删除</td>
      </tr>
    </tbody>
  </n-table>
  <div class="paginate-box">
    <n-pagination v-model:page="page" :page-size="perPage" :page-count="100" @update:page="handlePage" />
  </div>
</template>

<style lang="scss" scoped>
.paginate-box {
  margin: 24px 0;
  display: flex;
  justify-content: center;
}
</style>