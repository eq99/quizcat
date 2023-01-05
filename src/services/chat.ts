import axios from "@/lib/request";
import type { Friend, DirectMessage } from "@/types/chat";

export async function getActiveFriends() {
    return axios.get<any, { data: Friend[] }>(`/chat/friends/active`);
}

export async function getAllFriends() {
    return axios.get<any, { data: Friend[] }>(`/chat/friends`);
}

export async function getDirectMessages(friendId: number) {
    return axios.get<any, { data: DirectMessage[] }>(`/chat/direct?friendId=${friendId}`);
}