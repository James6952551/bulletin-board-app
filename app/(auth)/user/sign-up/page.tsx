'use client';
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";

export default function createUserPage(){
    const router = useRouter();
    
    const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const name = formData.get("name") as string;

        const { data, error } = await authClient.signUp.email({
            email: email,
            password: password,
            name: name,
        }, {
            onSuccess: () => { router.push('/');
                               router.refresh(); },
            onError: (context) => { alert(context.error.message) },
        });
    };

    return <div className="w-lg border border-gray-500 rounded mx-auto flex px-4 py-8">
        <form 
            onSubmit={onSubmit} 
            className="flex flex-col space-y-6 w-lg"
        >
            <p className="font-bold text-4xl text-center border-b border-gray-300 pb-4">
                Sign Up
            </p>
            <div className="flex flex-col gap-4">
                <label htmlFor="name">Name</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    required 
                    className="border rounded px-2 flex-1" 
                />
            </div>
            <div className="flex flex-col gap-4">
                <label htmlFor="email">
                    Email <span className="bg-red-400 px-1 py-1 rounded text-sm text-white">Required</span>
                </label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    required 
                    className="border rounded px-2 flex-1" 
                />
            </div>
            <div className="flex flex-col gap-4">
                <label htmlFor="password">
                    Password <span className="bg-red-400 px-1 py-1 rounded text-sm text-white">Required</span>
                </label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    required 
                    className="border rounded px-2 flex-1" 
                />
            </div>
            
            <button 
                type="submit" 
                className="border rounded bg-black text-white hover:bg-gray-900 py-2 cursor-pointer"
            >
                Register
            </button>
            <p>
                Already have an account? <button onClick={(e) => {redirect('/user/sign-in')}} className="underline hover:text-blue-500">Sign In</button>
            </p>
        </form>
    </div>
}