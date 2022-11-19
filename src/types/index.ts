// 通知组件
export interface Notification {
    title?: string,
    type?: string,
    detail: string,
}

// token
export interface Token {
    value: string,
    updatedAt: string,
}

// user
export interface User {
    id: number,
    name: string,
    avatar: string,
    email: string,
    isAdmin: boolean,
    status: number,
    createdAt: string,
    updatedAt: string,
}

export interface UserBar {
    id: number,
    name: string,
    avatar: string,
}

export interface AuthToken {
    id: number,
    value: string,
    client: string,
    userId: number,
    user: User,
    createdAt: string,
    updatedAt: string
}

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

export interface Solution {
    id: number,
    score: number,
    content: string,
    quizID: number,
    updatedAt: string,
    userid: number,
    username: string,
    avatar: string
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