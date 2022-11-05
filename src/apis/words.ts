import { API_BASE } from "@/lib/config";

export async function getWordSets<T>(): Promise<T> {
    const resp = await fetch(`${API_BASE}/wordsets`);
    return await resp.json();
}

export async function getWordSet<T>(setid: string): Promise<T> {
    const resp = await fetch(`${API_BASE}/wordsets/${setid}`);
    return await resp.json();
}