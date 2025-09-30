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
          async authorize (credentials){
             console.log (credentials) ;
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,{

                    method: 'post',
                    body: JSON.stringify({
                     email : credentials?.email,
                     password :credentials?.password
                    }),
                    headers:{
                        'Content-Type' :"application/json"
                    }
                })
                const data = await res.json()
                console.log ("data",data);

                if (data.message == 'success'){
                  const decodedToken:{id:string} = jwtDecode (data.token)
                  
                  return{
                        id : decodedToken.id,
                        userData:data.user ,
                        tokenData:data.token
                   }

                }else{
                    throw new Error(data.message)
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

