import { defineStore } from 'pinia';
import type { Book, Chapter, Exercise } from "@/types";
import { getBookById, getChapters, getExercises } from '@/apis/book';
import { sortChaptersByNextId } from '@/lib';
import type { UpdateChapterForm } from '@/types';

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
        },
        storeUpdateChapter(form: UpdateChapterForm) {
            const chapter = this.chapters.find(c => c.id = form.id);
            if (chapter) {
                for (const [key, value] of Object.entries(form)) {
                    if (value) {
                        chapter[key] = value;
                    }
                }
            }
        }
    }
})

export const useChapterEditStore = defineStore("chapter-edit", {
    state: () => ({
        content: "",
        name: "",
        part: "",
    }),
    actions: {
        setChapterData(name: string, part: string, content: string,) {
            this.name = name;
            this.part = part;
            this.content = content;
        },
    }
});


export const useExerciseStore = defineStore("exercise", {
    state: () => ({
        exercises: [] as Exercise[]
    }),
    actions: {
        async fetchExercises(bookId: number | string) {
            this.exercises = await getExercises(bookId);
        }
    }
})