// src/lib/axios.ts
import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Интерсептор: подставляем токен
api.interceptors.request.use(async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
});

// КЛЮЧЕВОЙ ИНТЕРСЕПТОР: 401 → автоматический логаут
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            console.log("Токен истёк — выходим...");
            await signOut({
                callbackUrl: "/auth/login"
            });
        }
        return Promise.reject(error);
    }
);

export default api;