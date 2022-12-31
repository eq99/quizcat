import type { Token } from '@/types';
import { defineStore } from 'pinia';
import { useUserStore } from "@/stores/user";
const API_BASE = import.meta.env.VITE_API_BASE;

export const useTokenStore = defineStore('token', {
    state: () => ({
        _token: null as Token | null,
    }),

    getters: {
        token(state): Token | null {
            // get from local
            if (state._token === null) {
                const localToken = localStorage.getItem('token');
                if (localToken) {
                    state._token = JSON.parse(localToken);
                }
            }

            if (state._token) {
                const now = new Date().getTime();
                const expiredAt = new Date(state._token?.expiredAt).getTime();
                const timeDiff = expiredAt - now;
                const userStore = useUserStore();
                const { clearUser } = userStore;

                // remove expired token
                if (timeDiff <= 0) {
                    // clear token
                    state._token = null;
                    localStorage.removeItem('token')
                    // clear user
                    clearUser();
                    return null;
                }

                // refresh token if in 7 days
                if (expiredAt - now < 7 * 24 * 3600000) {
                    fetch(`${API_BASE}/auth/refresh/token`, {
                        headers: {
                            'Authorization': `Bearer ${state._token.value}`,
                        },
                    }).then((resp) => {
                        if (resp.status >= 200 && resp.status < 300) {
                            return resp.json()
                        } else {
                            throw new Error(resp.statusText)
                        }
                    }).then(data => {
                        const token = {
                            value: data.token,
                            expiredAt: data.expiredAt,
                            isAdmin: data.isAdmin,
                        }
                        // save new token
                        state._token = token;
                        localStorage.setItem('token', JSON.stringify(token))
                    }).catch(e => {
                        console.error(e);
                    });
                }
            }

            return state._token;
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
