import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '../../../libs/prismadb';
import bcrypt from 'bcryptjs';

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password" },
                username: { label: "Username", type: "text", placeholder: "Name" },
            },
            async authorize(credentials) {
              
                if(!credentials.email || !credentials.password) {
                    throw new Error('Please enter an email and password')
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user || !user?.hashedPassword) {
                    throw new Error('No user found')
                }

                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

                if (!passwordMatch) {
                    throw new Error('Incorrect password')
                }

                return user;
            },
        }),  
    ],
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}