const API_BASE = "http://127.0.0.1:8000/api/quizcat"

export const getQuizzesByExerciseID = async (exid: string) => {
    const resp = await fetch(`${API_BASE}/quizzes?exid=${exid}`);
    return await resp.json();
}