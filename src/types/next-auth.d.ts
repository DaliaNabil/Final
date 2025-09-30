import { JWT } from "next-auth/jwt";

// This declaration ensures you can add custom properties to the User object.
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name: string;
      email: string;
      role: string;
    };
    token: string;
  }
  
  interface User {
    role: string;
    token: string;
  }
}

// This declaration ensures you can add custom properties to the JWT token.
declare module "next-auth/jwt" {
  /**
   * Returned by the `jwt` callback and received as a property on the `session` callback
   */
  interface JWT {
    token: string;
    role: string;
  }
}