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