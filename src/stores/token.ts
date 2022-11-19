
import type { Token } from '@/types';
import { defineStore } from 'pinia';

export const useTokenStore = defineStore('token', {
    state: () => ({
        _token: null as Token | null,
    }),

    getters: {
        token(): Token | null {
            if (this._token === null) {
                const localToken = localStorage.getItem('token');
                if (localToken) {
                    this._token = JSON.parse(localToken);
                }
            }
            return this._token;
        },
    },

    actions: {
        saveToken(token: Token) {
            this._token = token;
            localStorage.setItem('token', JSON.stringify(token))
        },

        clearToken() {
            this._token = null;
            localStorage.removeItem('token')
        }
    },
});


export const useSigninStore = defineStore('signin', {
    state: () => ({
        isOpen: false
    }),

    actions: {
        openSignin() {
            this.isOpen = true;
        },

        closeSignin() {
            this.isOpen = false;
        }
    }
})
