import axios, { type AxiosRequestConfig, AxiosHeaders } from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE;
const WS_API = import.meta.env.VITE_CHAT_WS_API;
import { useTokenStore } from '@/stores/token';

const request = axios.create({
    baseURL: API_BASE,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
    }
});

interface Headers extends AxiosHeaders {
    Authorization: string
}

request.interceptors.request.use((config: AxiosRequestConfig) => {
    const { token } = useTokenStore();
    (config.headers as Headers).Authorization = `Bearer ${token?.value}`
    return config
})

// request.interceptors.response.use((response) => {
//     return response;
// })

export function getWebSocket() {
    const { token } = useTokenStore();
    return new WebSocket(`${WS_API}?token=${token?.value}`);
}


export default request;