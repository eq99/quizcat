import { defineStore } from 'pinia';
import type { Book } from "@/types";
import { getBookById } from '@/apis/book';

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