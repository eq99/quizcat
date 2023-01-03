import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE;
import { useTokenStore } from '@/stores/token';

const getRequest = () => {
    const { token } = useTokenStore();
    return axios.create({
        baseURL: API_BASE,
        timeout: 3000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token?.value}`,
        }
    });
}

export default getRequest;