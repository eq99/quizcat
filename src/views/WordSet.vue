<script setup lang="ts">
import WordCard from '@/components/WordCard.vue';
import WordHeader from '@/components/WordHeader.vue';
import { getWordSets } from '@/apis/words';
import { onMounted, reactive } from 'vue';
import type { WordSet } from "@/types";

// types
interface State {
    wordSets: WordSet[],
}

// state
const state: State = reactive({
    wordSets: [],
})

// life cicle
onMounted(async () => {
    state.wordSets = await getWordSets();
});
</script>

<template>
    <WordHeader></WordHeader>
    <div class="word-list row">
        <WordCard v-for="wordset in state.wordSets" :key="wordset.id" :setid="wordset.id" :cover="wordset.cover"
            :title="wordset.title">
        </WordCard>
    </div>
</template>


<style scoped lang="scss">
.word-list {
    display: flex;
    padding: 32px 64px;
}
</style>