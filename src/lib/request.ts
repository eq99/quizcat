import axios, { type AxiosRequestConfig, AxiosHeaders } from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE;
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

export default request;