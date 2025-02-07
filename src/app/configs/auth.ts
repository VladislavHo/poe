import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import  prisma  from "@/app/lib/prisma";
import { compare, hashSync } from "bcrypt";






export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.picture,
        };
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {

        email: { label: "Email", type: "email", requered: true },
        password: { label: "Password", type: "password", requered: true },
      },
      async authorize(credentials) {


        if (!credentials) {
          return null;
        }

        const values = {
          email: credentials.email,
        };

        const admin = await prisma.admin.findFirst({
          where: values,
        });

        if (!admin) {
          return null;
        }

        const isPasswordValid = await compare(credentials.password, admin.password);

        if (!isPasswordValid) {
          return null;
        }

        // if (!findUser.verified) {
        //   return null;
        // }

        return {
          id: admin.id,
          email: admin.email,


        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours

  },
  callbacks: {
    async jwt({ token }) {

      if (!token.email) {
        return token;
      }

      const findUser = await prisma.admin.findFirst({
        where: {
          email: token.email
        }
      })
      if (findUser) {
        token.id = findUser.id
        token.email = findUser.email
      }

      return token
    },

    async signIn({ user, account }) {



      try {
        if (account?.provider === "credentials") {
          return true
        }
        if (!user.email) {
          return false
        }
        await prisma.admin.create({
          data: {
            email: user.email,

            password: hashSync(user.id.toString(), 10),

          
          }
        })




        // return true
      } catch (error) {
        console.log(error)
        return false
      }


      return true
    }
  },
  pages: {
    signIn: "/dashboart",
    signOut: "/",
    error: "/",
  },
};