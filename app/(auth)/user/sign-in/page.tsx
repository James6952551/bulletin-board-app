'use client';
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const { error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                setErrorMessage(error.message || "Unable to sign in. Please check your credentials and try again.");
                return;
            }

            router.push("/");
            router.refresh();
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to sign in. Please try again.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return <div className="w-full max-w-md bg-white border border-slate-100 shadow-xl rounded-2xl mx-auto p-8 sm:p-10 my-12">
    <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Sign In</h2>
        <p className="text-sm text-slate-500 mt-2">Welcome back! Please enter your details.</p>
    </div>
    
    <form 
        onSubmit={onSubmit} 
        className="flex flex-col space-y-5"
    >
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

        {/* Error Message */}
        {errorMessage && (
            <div role="alert" className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs font-medium text-rose-600">
                {errorMessage}
            </div>
        )}
        
        {/* Submit Button */}
        <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full mt-2 py-3 px-4 bg-black text-white font-medium rounded-lg shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
        >
            {isSubmitting ? "Signing In..." : "Sign In"}
        </button>

        {/* Footer / Sign Up Link */}
        <p className="text-center text-sm text-slate-500 pt-2">
            New User?{" "}
            <Link href="/user/sign-up" className="font-semibold text-slate-900 underline hover:text-black transition-colors">
                Sign Up
            </Link>
        </p>
    </form>
</div>
}