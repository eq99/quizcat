<script setup lang="ts">
import WordCard from '@/components/WordCard.vue';
import WordHeader from '@/components/WordHeader.vue';
</script>

<template>
    <WordHeader></WordHeader>
    <div class="word-list row">
        <WordCard cover="https://cdn.pixabay.com/photo/2022/10/31/10/18/red-deer-7559423_1280.jpg"></WordCard>
        <WordCard cover="https://cdn.pixabay.com/photo/2022/10/31/17/31/copper-teapots-7560392__480.jpg"></WordCard>
        <WordCard cover="https://cdn.pixabay.com/photo/2022/11/02/10/46/ice-rink-7564565__480.jpg"></WordCard>
        <WordCard cover="https://cdn.pixabay.com/photo/2022/10/31/15/15/dunlins-7560078__480.jpg"></WordCard>
        <WordCard cover="https://cdn.pixabay.com/photo/2022/10/31/14/44/namib-desert-7559993__480.jpg"></WordCard>
        <WordCard cover="https://cdn.pixabay.com/photo/2022/10/21/21/17/interior-7537974__480.jpg"></WordCard>
        <WordCard cover="https://cdn.pixabay.com/photo/2022/08/12/12/07/subway-7381618__480.jpg"></WordCard>
        <WordCard cover="https://cdn.pixabay.com/photo/2022/10/28/18/12/lake-7553642__480.jpg"></WordCard>
    </div>
</template>


<style scoped lang="scss">
.word-list {
    display: flex;
    padding: 32px 64px;
}
</style>