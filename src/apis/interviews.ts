import type { IQuestion, IComment } from '@/types';

const API_BASE = import.meta.env.VITE_API_BASE;

export async function getInterviewBooks<T>(): Promise<T> {
    const resp = await fetch(`${API_BASE}/ibooks`);

    if (resp.status >= 200 && resp.status < 300) {
        return await resp.json()
    }

    throw new Error(resp.statusText)
}

export async function getIQuestionsByBookId<T>(bookid: string | number): Promise<T> {
    const resp = await fetch(`${API_BASE}/iquestions?bookid=${bookid}`);

    if (resp.status >= 200 && resp.status < 300) {
        return await resp.json()
    }

    throw new Error(resp.statusText)
}

export async function getICommentsByQestionId<T>(qid: string | number): Promise<T> {
    const resp = await fetch(`${API_BASE}/icomments?questionid=${qid}`);

    if (resp.status >= 200 && resp.status < 300) {
        return await resp.json()
    }

    throw new Error(resp.statusText)
}

export async function getICommentsByUserId<T>(bookid: string | number, token: string): Promise<T> {
    const resp = await fetch(`${API_BASE}/my/icomments?bookid=${bookid}`, {
        headers: {
            'Authorization': token,
        },
    });

    if (resp.status >= 200 && resp.status < 300) {
        return await resp.json()
    }

    throw new Error(resp.statusText)
}

export async function saveIComment<T>(content: string, iQuestionID: number, bookID: number, token: string): Promise<T> {
    const resp = await fetch(`${API_BASE}/icomments`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({
            content,
            iQuestionID,
            bookID,
        })
    });

    if (resp.status >= 200 && resp.status < 300) {
        return await resp.json()
    }

    throw new Error(resp.statusText)
}