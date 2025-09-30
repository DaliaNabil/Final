import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { email } from "zod";


export const nextAuthConfig: NextAuthOptions = {
    pages: {
        signIn: '/login'
    },
    providers: [
        Credentials({
            name: 'Fresh Cart',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                console.log('req', req)
                try {
                    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, {
                        method: "POST",
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password,
                        }),

                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                    const finalRes = await res.json();
                    console.log('finalRes authorize', finalRes)

                    if (finalRes.message === "success" ) {
                        // const { role , ...rest}= finalRes.user

                        const decodedToken: { id: string } = jwtDecode(finalRes.token)
                        return {
                            id: decodedToken.id,
                            name: finalRes.user.name,
                            email: finalRes.user.email,
                            credentialsToken: finalRes.token,
                        }
                    } else {

                        return null;
                    }
                } catch (error) {
                    console.error("Authorization error:", error);
                    return null;
                }
            },
        })
    ],

    callbacks: {
        jwt(params) {
            console.log('params', params);

            if (params.user) {
                params.token.credentialsToken = params.user.credentialsToken;
                params.token.userId = params.user.id
            }

            return params.token
        },

        session(params) {
            console.log('params', params.user);

            params.session.user.id = params.token.userId;
            return params.session

        }


        // async jwt({ token, user }) {

        //     if (user) {

        //         token.token = user.token;
        //         token.user = user.user;
        //     }

        //     return token;
    },

    // async session({ session, token }) {

    //         session.user = token.user;


    //     return session;
    // },
    session:{
        maxAge:60*60*7*24
    }
}

