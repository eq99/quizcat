import { defineStore } from 'pinia';
import type { Book, Chapter } from "@/types";
import { getBookById, getChapters } from '@/apis/book';
import { sortChaptersByNextId } from '@/lib';

export const useBookStore = defineStore("book", {
    state: () => ({
        book: null as (Book | null)
    }),
    getters: {

    },
    actions: {
        async fetchBook(id: number | string) {
            this.book = await getBookById(id);
        }
    }
})

export const useChapterStore = defineStore("chapter", {
    state: () => ({
        chapters: [] as Chapter[]
    }),
    getters: {
        getChapterById(state) {
            return (chapterId: number) => state.chapters.find((c) => c.id === chapterId);
        }
    },
    actions: {
        async fetchChapters(bookId: number | string) {
            this.chapters = sortChaptersByNextId(await getChapters(bookId));
        }
    }
})