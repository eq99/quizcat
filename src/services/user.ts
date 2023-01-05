import axios from "@/lib/request";
import type { SigninRes } from "@/types";

export async function sendCaptcha(email: string) {
    return axios.post(`/auth/captcha/email`, { email });
}

export async function signin(email: string, captcha: string) {
    return axios.post<unknown, { data: SigninRes }>(`/auth/signup/email`, { email, captcha, });
}

export async function signout() {
    return axios.get(`/auth/signout`);
}