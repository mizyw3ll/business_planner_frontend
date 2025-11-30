// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// ВЫНОСИМ КОНФИГ — это твой "authOptions"
const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    const loginRes = await fetch(`${process.env.API_URL}/api/v1/auth/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: new URLSearchParams({
                            username: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    if (!loginRes.ok) {
                        console.error("Login failed:", loginRes.status, await loginRes.text());
                        return null;
                    }

                    const loginData = await loginRes.json();
                    const accessToken = loginData.access_token;

                    if (!accessToken) {
                        console.error("No access_token received");
                        return null;
                    }

                    console.log("Успешный логин, токен получен");

                    const meRes = await fetch(`${process.env.API_URL}/api/v1/users/me`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });

                    if (!meRes.ok) {
                        console.error("Failed to fetch /users/me:", meRes.status);
                        return null;
                    }

                    const userData = await meRes.json();

                    return {
                        id: userData.id?.toString() || userData.uuid?.toString() || "",
                        email: userData.email,
                        username: userData.username ?? null,
                        accessToken,
                    };
                } catch (error: any) {
                    console.error("Authorize exception:", error);
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.username = user.username;
            }
            return token;
        },

        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            session.user.username = (token.username as string) ?? null;
            return session;
        },

        async redirect({ url, baseUrl }) {
            if (url.startsWith("/auth") || url === baseUrl || url === baseUrl + "/") {
                return `${baseUrl}/dashboard`;
            }
            return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`;
        },
    },

    pages: {
        signIn: "/auth/login",
    },

    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions; // ← это убирает все ошибки типизации

// Создаём handler
const handler = NextAuth(authOptions);

// Экспортируем handler и конфиг
export { handler as GET, handler as POST };
export { authOptions };