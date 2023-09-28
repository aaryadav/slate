import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Check for missing environment variables at startup
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.log(Error)
    throw new Error("We're sorry, but our authentication service is currently unavailable. Please try again later, and if the issue persists, contact our support team.");
}

export const authOptions = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session(session: any, token: any) {
            session.user.id = session.user.id
            return session;
        },
    },
    adapter: PrismaAdapter(prisma),

}

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };