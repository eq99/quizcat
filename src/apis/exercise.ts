const API_BASE = "http://127.0.0.1:8000/api/quizcat"

export const getExcercises = async () => {
    const resp = await fetch(`${API_BASE}/exercises`);
    return await resp.json();
}

export const getExcerciseByID = async (id: string) => {
    const resp = await fetch(`${API_BASE}/exercises/${id}`);
    return await resp.json();
}