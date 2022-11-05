import { API_BASE } from "@/lib/config";

export async function getQuizzesByExerciseID<T>(exid: string): Promise<T> {
    const resp = await fetch(`${API_BASE}/quizzes?exid=${exid}`);
    return await resp.json();
}