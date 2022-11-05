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
export interface WordSet {
    id: number,
    title: string,
    cover: string,
    createdAt: string,
    updatedAt: string,
}

export interface Word {
    id: number,
    en: string,
    cn: string,
    wordSetID: number,
}