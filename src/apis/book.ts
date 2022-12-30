const API_BASE = import.meta.env.VITE_API_BASE;

import type { BookForm, Book, ChapterForm, Chapter } from '@/types';
import { useTokenStore } from '@/stores/token';
const { token } = useTokenStore();

export async function createBook(book: BookForm): Promise<Book> {
    const resp = await fetch(`${API_BASE}/books`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token?.value}`,
        },
        body: JSON.stringify(book)
    });

    if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
    }

    throw new Error(resp.statusText)
}

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

export async function createChapter(chapter: ChapterForm): Promise<Chapter> {
    const resp = await fetch(`${API_BASE}/chapters`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token?.value}`,
        },
        body: JSON.stringify(chapter)
    });

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

export async function getExercises<T>(bookId: string | number): Promise<T> {
    const resp = await fetch(`${API_BASE}/exercises?bookId=${bookId}`);

    if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
    }

    throw new Error(resp.statusText)
}

export async function getExerciseContent<T>(exerciseId: string | number): Promise<T> {
    const resp = await fetch(`${API_BASE}/exercises/${exerciseId}/content`);

    if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
    }

    throw new Error(resp.statusText)
}