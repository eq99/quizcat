import axios from "@/lib/request";
import type { Book } from "@/types";

export async function getBooks(page: number, perPage: number) {
    return axios.get<any, { data: Book[] }>(`/books?t=page&page=${page}&perPage=${perPage}`);
}

export async function getNewBooks() {
    return axios.get<any, { data: Book[] }>(`/books?t=new`);
}

export async function getBooksByCategory(cate: string) {
    return axios.get<any, { data: Book[] }>(`/books?t=cat&cat=${cate}`);
}