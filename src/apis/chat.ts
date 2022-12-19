const CHAT_API_BASE = import.meta.env.VITE_CHAT_API_BASE;
import type { AuthToken } from "@/types";

export async function getActiveFriends<T>(token: string): Promise<T> {
    const resp = await fetch(`${CHAT_API_BASE}/friends/active`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
    }

    throw new Error(resp.statusText)
}

export async function getOneMessages<T>(token: string, friendId: number): Promise<T> {
    const resp = await fetch(`${CHAT_API_BASE}/one?friendId=${friendId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
    }

    throw new Error(resp.statusText)
}

export async function sendOneMessage<T>(token: string, toId: number, content: string): Promise<T> {
    const resp = await fetch(`${CHAT_API_BASE}/one`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            content,
            toId,
        })
    });

    if (resp.status >= 200 && resp.status < 300) {
        return resp.json();
    }

    throw new Error(resp.statusText)
}