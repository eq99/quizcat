import type { Solution } from "@/types";



const API_BASE = import.meta.env.VITE_API_BASE;


export async function getExcercises<T>(): Promise<T> {
    const resp = await fetch(`${API_BASE}/exercises`);
    return await resp.json();
}

export async function getExcerciseByID<T>(id: string): Promise<T> {
    const resp = await fetch(`${API_BASE}/exercises/${id}`);
    return await resp.json();
}

export async function getQuizzesByExerciseID<T>(exid: string): Promise<T> {
    const resp = await fetch(`${API_BASE}/quizzes?exid=${exid}`);
    return await resp.json();
}

export async function getSolutionsByQuizId(qid: string | number): Promise<Solution[]> {
    const resp = await fetch(`${API_BASE}/solutions?qid=${qid}`);

    if (resp.status >= 200 && resp.status < 300) {
        return await resp.json()
    }

    throw new Error(resp.statusText)
}


export async function saveSolution<T>(content: string, quizID: string | number, token: string): Promise<T> {
    const resp = await fetch(`${API_BASE}/solutions`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({
            content,
            quizID,
        })
    });

    if (resp.status >= 200 && resp.status < 300) {
        return await resp.json()
    }

    throw new Error(resp.statusText)
}
