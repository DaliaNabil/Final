import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
 
  interface User extends DefaultUser {
    credentialsToken: string;
  }

  interface Session extends DefaultSession {
    user: User & {
      id: string;
      credentialsToken: string;
    };
  }
}

declare module "next-auth/jwt" {

  interface JWT extends DefaultJWT {
    credentialsToken: string;
    userId: string;
  }
}