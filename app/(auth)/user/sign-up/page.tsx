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

    return <div className="w-full max-w-md bg-white border border-slate-100 shadow-xl rounded-2xl mx-auto p-8 sm:p-10 my-12">
    <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Sign Up</h2>
        <p className="text-sm text-slate-500 mt-2">Create an account to get started.</p>
    </div>
    
    <form 
        onSubmit={onSubmit} 
        className="flex flex-col space-y-5"
    >
        {/* Name Field */}
        <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
                <label htmlFor="name" className="text-sm font-semibold text-slate-700">
                    Name
                </label>
                <span className="text-slate-400 text-xs font-medium">Optional</span>
            </div>
            <input 
                type="text" 
                name="name" 
                id="name" 
                required 
                placeholder="John Doe"
                className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200" 
            />
        </div>

        {/* Email Field */}
        <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                    Email
                </label>
                <span className="text-rose-500 text-xs font-medium">Required</span>
            </div>
            <input 
                type="email" 
                name="email" 
                id="email" 
                required 
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200" 
            />
        </div>

        {/* Password Field */}
        <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                    Password
                </label>
                <span className="text-rose-500 text-xs font-medium">Required</span>
            </div>
            <input 
                type="password" 
                name="password" 
                id="password" 
                required 
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200" 
            />
        </div>
        
        {/* Submit Button */}
        <button 
            type="submit" 
            className="w-full mt-2 py-3 px-4 bg-black text-white font-medium rounded-lg shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black active:scale-[0.99] cursor-pointer transition-all duration-200"
        >
            Register
        </button>

        {/* Footer / Sign In Link */}
        <p className="text-center text-sm text-slate-500 pt-2">
            Already have an account?{" "}
            <button 
                type="button" 
                onClick={(e) => { redirect('/user/sign-in') }} 
                className="font-semibold text-slate-900 underline hover:text-black transition-colors cursor-pointer"
            >
                Sign In
            </button>
        </p>
    </form>
</div>
}