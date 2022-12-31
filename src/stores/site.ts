import { defineStore } from 'pinia';

export const useTitleStore = defineStore('page-title', {
    state: () => ({
        title: "",
    }),
    actions: {
        setTitle(title: string) {
            this.title = title;
        }
    }
});