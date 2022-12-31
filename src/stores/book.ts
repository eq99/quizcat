import { defineStore } from 'pinia';
import type {
    Book,
    Chapter,
    Exercise,
    UpdateChapterForm,
    Manager,
    UpdateBookForm,
    UpdateExerciseForm
} from "@/types";

import { getBookById, getChapters, getExercises, getManagers } from '@/apis/book';
import { sortChaptersByNextId } from '@/lib';
import { useUserStore } from "@/stores/user";

export const useBookStore = defineStore("book", {
    state: () => ({
        book: null as (Book | null)
    }),
    actions: {
        async fetchBook(id: number | string) {
            this.book = await getBookById(id);
        },
        storeUpdateBook(form: UpdateBookForm) {
            if (this.book) {
                for (const [k, v] of Object.entries(form)) {
                    if (v) {
                        (this.book[k as keyof Book] as string) = (v as string);
                    }
                }
            }

        }
    }
});

export const useManagerStore = defineStore("manager", {
    state: () => ({
        managers: [] as Manager[]
    }),
    actions: {
        async fetchManagers(bookId: number | string) {
            this.managers = await getManagers(bookId);
        },
        isManager(bookId: number): boolean {
            const { user } = useUserStore();

            if (!user) {
                return false;
            }

            if (this.managers.length < 1) {
                this.fetchManagers(bookId).then(() => {
                    // pass
                }).catch(e => {
                    return false
                });
            }

            return this.managers.find((m) => m.userId === user.id) !== undefined;
        }
    }
});

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
                for (const [k, v] of Object.entries(form)) {
                    if (v) {
                        (chapter[k as keyof Chapter] as string) = (v as string);
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
        },
        storeUpdateExercise(form: UpdateExerciseForm) {
            const exercise = this.exercises.find(c => c.id = form.id);
            if (exercise) {
                for (const [k, v] of Object.entries(form)) {
                    if (v) {
                        (exercise[k as keyof Exercise] as string) = (v as string);
                    }
                }
            }
        }
    }
})

export const useExerciseEditStore = defineStore("exercise-edit", {
    state: () => ({
        title: "",
        content: "",
        solution: "",
        tags: "",
        hard: 1
    }),
    actions: {
        setExerciseData(
            title: string,
            content: string,
            solution: string,
            tags: string,
            hard: number
        ) {
            this.title = title;
            this.content = content;
            this.solution = solution;
            this.tags = tags;
            this.hard = hard;
        },
    }
});