const API_BASE = import.meta.env.VITE_API_BASE;


export async function getNewBooks<T>(): Promise<T> {
    const resp = await fetch(`${API_BASE}/books?new=1`);

    if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
    }

    throw new Error(resp.statusText)
}

export async function getBooksByCategory<T>(cate: string): Promise<T> {
    const resp = await fetch(`${API_BASE}/books?category=${cate}`);

    if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
    }

    throw new Error(resp.statusText)
}

export async function getBookById<T>(id: string | number): Promise<T> {
    const resp = await fetch(`${API_BASE}/books/${id}`);

    if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
    }

    throw new Error(resp.statusText)
}

export async function getManagers<T>(bookId: string | number): Promise<T> {
    const resp = await fetch(`${API_BASE}/managers?bookId=${bookId}`);

    if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
    }

    throw new Error(resp.statusText)
}

export async function getChapters<T>(bookId: string | number): Promise<T> {
    const resp = await fetch(`${API_BASE}/chapters?bookId=${bookId}`);

    if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
    }

    throw new Error(resp.statusText)
}

export async function getChapterContent<T>(chapterId: string | number): Promise<T> {
    const resp = await fetch(`${API_BASE}/chapters/${chapterId}/content`);

    if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
    }

    throw new Error(resp.statusText)
}