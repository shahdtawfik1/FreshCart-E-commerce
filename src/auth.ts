import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "enter your mail",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const res = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const payLoad = await res.json();
        if (payLoad.message == "success") {
          const { id }: { id: string } = jwtDecode(payLoad.token);
          return {
            id: id,
            user: payLoad.user,
            token: payLoad.token,
          };
        }
        throw new Error(payLoad.message);
      },
    }),
  ],
  
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user.user ;
        token.token = user.token;
      }
      if (trigger === "update" && session?.user) {
        token.user = { ...(token.user || {}), ...session.user };
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token?.user;
      return session;
    },
  },
};
