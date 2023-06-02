
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../../prisma/prisma"
import bcrypt from "bcrypt"

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
 },
  providers: [
    
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
     
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        const {email,password}= credentials;
        // console.log({email,password});

        const user = await prisma.user.findUnique({
          where: { email }
        })
        // console.log("user details",user)
        const isMatch = await bcrypt.compare(password, user.password);

        console.log(isMatch)
        // console.log({isMatch})

        if (!user || !isMatch) {
          throw new Error('Invalid email or password');
        }
  
        if (user && isMatch) {
          // Any object returned will be saved in `user` property of the JWT
          // console.log(user)

          // console.log("user details",user)
          return {
            ...user,
            id: user.id,
            
          };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // console.log('session', { session, token })
      if (token && token.id) {
        // console.log("token id",token.id)
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.verificationCode = token.verificationCode

        // console.log(session.user.role);

      }

      return session;
    },
    async jwt({ token, user }) {
      // console.log('jwt', { token, user })
      if (token && user && user.id) {
        token.id = user.id;
        token.role = user.role;
        token.verificationCode = user.verificationCode
      }
      return token;
    }
  }
  
  
  
});

