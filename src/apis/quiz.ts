import { API_BASE } from "@/lib/config";

export const getQuizzesByExerciseID = async (exid: string) => {
    const resp = await fetch(`${API_BASE}/quizzes?exid=${exid}`);
    return await resp.json();
}