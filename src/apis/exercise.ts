import { API_BASE } from "@/lib/config";

export const getExcercises = async () => {
    const resp = await fetch(`${API_BASE}/exercises`);
    return await resp.json();
}

export const getExcerciseByID = async (id: string) => {
    const resp = await fetch(`${API_BASE}/exercises/${id}`);
    return await resp.json();
}