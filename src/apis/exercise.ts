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