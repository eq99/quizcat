// chat
export interface Friend {
    id: number,
    name: string,
    avatar: string,
    last: string,
}

export interface DirectChat {
    id: number,
    avatar: string,
    name: string,
    last: string,
}

export interface DirectMessage {
    id: number,
    fromId: number,
    toId: number,
    content: string
    avatar: string,
    username: string,
    createdAt: string,
}


