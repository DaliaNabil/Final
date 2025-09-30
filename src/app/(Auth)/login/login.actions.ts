'use server'
import { cookies } from 'next/headers';
import { LoginFormType } from './LoginForm';




export async function handleLogin(data: LoginFormType) {

   
    try {
        
    } catch (error) {
         console.error('An unexpected error occurred:', error);
        return 'An unexpected error occurred. Please try again.';
    }

}