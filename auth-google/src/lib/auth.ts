// lib/auth.ts
import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email) throw new Error("No email in profile");

      await prisma.user.upsert({
        where: { email: profile.email },
        create: {
          email: profile.email,
          name: profile.name,
          avatar: profile.image,
        },
        update: {
          name: profile.name,
          avatar: profile.image,
        },
      });

      return true;
    },

    async jwt({ token, profile }) {
      if (profile?.email) {
        const user = await prisma.user.findUnique({
          where: { email: profile.email },
        });
        if (user) {
          token.id = user.id;
        }
      }
      return token;
    },
  },
};
