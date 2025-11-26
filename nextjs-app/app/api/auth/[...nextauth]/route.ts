import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

/**
 * NextAuth Konfiguration
 * Google OAuth Provider für Login
 */
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/", // Nutzer bleiben auf der Startseite
  },
  callbacks: {
    async session({ session, token }) {
      // User ID zum Session-Objekt hinzufügen
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

// Next.js 15 App Router: GET und POST Handler exportieren
export { handler as GET, handler as POST };
