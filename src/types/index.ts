// exercise -------------------
export interface Exercise {
    id: number,
    title: string,
    quizNum: number,
    createdAt: string,
    updatedAt: string,
}

export interface Quiz {
    id: number,
    kind: number,
    level: number,
    content: string,
    solution: string,
    createdAt: string,
    updatedAt: string,
    exerciseID: number,
}
// words ---------------