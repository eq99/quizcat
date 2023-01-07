const API_BASE = import.meta.env.VITE_API_BASE;
import { useTokenStore } from '@/stores/token';

export async function getActiveFriends() {
    const { token } = useTokenStore();
    const resp = await fetch(`${API_BASE}/chat/friends/active`, {
        headers: {
            'Authorization': `Bearer ${token?.value}`,
        },
    });

    if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
    }

    throw new Error(resp.statusText)
}

export async function getDirectMessages(friendId: number) {
    const { token } = useTokenStore();
    const resp = await fetch(`${API_BASE}/chat/direct?friendId=${friendId}`, {
        headers: {
            'Authorization': `Bearer ${token?.value}`,
        },
    });

    if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
    }

    throw new Error(resp.statusText)
}