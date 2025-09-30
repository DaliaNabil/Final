'use server'

import { redirect } from 'next/navigation';

import { RegisterFormType } from './RegisterForm';

export async function handleRegister(data: RegisterFormType) {
    // let finalResp;

    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
      const  finalResp = await res.json(); 

        if (finalResp.message !== 'success') {
            return finalResp.message;
        }

    } catch (error) {
        console.error('Registration failed:', error);
        return "An unexpected error occurred. Please try again.";
    }

    redirect('/login');
}