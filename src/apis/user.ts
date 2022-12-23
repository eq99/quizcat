const API_BASE = import.meta.env.VITE_API_BASE;
import type { AuthToken } from "@/types";

export async function sendCaptcha<T>(email: string): Promise<T> {
    const resp = await fetch(`${API_BASE}/auth/captcha/email`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
        })
    });

    if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
    }

    throw new Error(resp.statusText)
}


export async function signin(email: string, captcha: string): Promise<AuthToken> {
    const resp = await fetch(`${API_BASE}/auth/signup/email`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            captcha,
        })
    });

    if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
    }

    throw new Error(resp.statusText)
}


export async function signout<T>(token: string): Promise<T> {
    const resp = await fetch(`${API_BASE}/signout`, {
        headers: {
            'Authorization': token,
        },
    });

    if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
    }

    throw new Error(resp.statusText)
}