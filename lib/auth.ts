import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    basePath: "/api/auth", 
    baseURL: process.env.BETTER_AUTH_URL, 
    secret: process.env.BETTER_AUTH_SECRET,
    trustedOrigins: [process.env.BETTER_AUTH_URL || ""],
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60, // 5 minutes cache fallback
        },
    },
    emailAndPassword: { enabled: true },
    user: {
        additionalFields: {
            introduction: {
                type: "string",
                required: false,
                input: true,
            },
        }
    }
});