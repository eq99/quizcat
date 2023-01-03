import getRequest from "@/lib/request";
import type { SigninRes } from "@/types";

export async function sendCaptcha(email: string) {
    const axios = getRequest();
    return axios.post(`/auth/captcha/email`, { email });
}

export async function signin(email: string, captcha: string) {
    const axios = getRequest();
    return axios.post<unknown, { data: SigninRes }>(`/auth/signup/email`, { email, captcha, });
}

export async function signout() {
    const axios = getRequest();
    return axios.get(`/auth/signout`);
}