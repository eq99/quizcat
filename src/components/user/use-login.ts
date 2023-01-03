import { inject } from 'vue';
import type { LoginApiInjection } from './LoginProvider.vue'


export function useLogin(): LoginApiInjection {
    const api = inject('login-api', null)
    if (api === null) {
        throw new Error(`useLogin: No outer <login-provider /> founded.`);
    }

    return api
}