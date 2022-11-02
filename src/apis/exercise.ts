export const exercises = [
    {
        id: 1,
        title: "JavaScript 变量练习",
        quiz_num: 10,
        updated_at: "2022-11-01",
    },
    {
        id: 2,
        title: "JavaScript 条件语句练习",
        quiz_num: 8,
        updated_at: "2022-11-03",
    },
]

const API_BASE = "http://127.0.0.1:8000/api/quizcat"

export const getExcercises = async (url: string) => {
    const resp = await fetch(`${API_BASE}${url}`);
    return await resp.json();
}