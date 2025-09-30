import { nextAuthConfig } from "@/next-auth/nextAuth.config";
import NextAuth from "next-auth";

//  const yourRouteHandlerAnObject = NextAuth(nextAuthConfig)
  const nextHendler = NextAuth(nextAuthConfig)


  export { nextHendler as GET , nextHendler as POST}