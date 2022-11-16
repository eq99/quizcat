import { ref, computed, reactive } from 'vue';
import type { User } from '@/types';
import { defineStore } from 'pinia';


export const useUserStore = defineStore('user', {
    state: () => ({
        _user: null as User | null,
    }),

    getters: {
        user(): User | null {
            if (this._user === null) {
                const localUser = localStorage.getItem('user');
                if (localUser) {
                    this._user = JSON.parse(localUser);
                }
            }
            return this._user;
        },
    },

    actions: {
        saveUser(user: User) {
            this._user = user;
            localStorage.setItem('user', JSON.stringify(user))
        },
    },
})