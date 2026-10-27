'use client';
import { Categories, Tags } from "@/_constant";
import { createPost } from "@/lib/actions"
import dynamic from "next/dynamic";
import { redirect, useRouter } from "next/navigation";
import { useRef } from "react";
import makeAnimated from 'react-select/animated';

// Dynamically import react-select with SSR disabled
const Select = dynamic(() => import('react-select'), { ssr: false });

export default function createPostPage(){
    const animatedComponents = makeAnimated();
    const formRef = useRef<HTMLFormElement>(null);
    const categoryRef = useRef<any>(null);
    const tagRef = useRef<any>(null);

    const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const category = formData.get("category") as string;
        const tags = formData.getAll("tags") as string[];

        await createPost({title, content, category, tags});

        formRef.current?.reset();
        categoryRef.current?.clearValue();
        tagRef.current?.clearValue();
        
        redirect('/');
        
    }
    return <div className="w-full max-w-xl bg-white border border-slate-100 shadow-xl rounded-2xl mx-auto p-8 sm:p-10">
    <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Create New Post</h2>
        <p className="text-sm text-slate-500 mt-1">Fill in the details below to publish your content.</p>
    </div>

    <form 
        ref={formRef} 
        onSubmit={onSubmit} 
        className="flex flex-col space-y-6"
    >
        {/* Title Field */}
        <div className="flex flex-col space-y-2">
            <label htmlFor="title" className="text-sm font-semibold text-slate-700">
                Title
            </label>
            <input 
                type="text" 
                name="title" 
                id="title" 
                required 
                placeholder="Enter a catchy title..."
                className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200" 
            />
        </div>

        {/* Content Field */}
        <div className="flex flex-col space-y-2">
            <label htmlFor="content" className="text-sm font-semibold text-slate-700">
                Content
            </label>
            <textarea 
                name="content" 
                id="content" 
                required 
                placeholder="Write your content here..."
                className="w-full h-40 px-4 py-3 bg-slate-50/50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none transition-all duration-200"
            ></textarea>
        </div>

        {/* Category Field */}
        <div className="flex flex-col space-y-2">
            <label htmlFor="category" className="text-sm font-semibold text-slate-700">
                Category
            </label>
            <Select
                ref={categoryRef}
                name="category"
                closeMenuOnSelect={true}
                components={animatedComponents}                 
                options={Categories}
                classNamePrefix="react-select"
            />
        </div>

        {/* Tag Field */}
        <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
                <label htmlFor="tag" className="text-sm font-semibold text-slate-700">
                    Tag
                </label>
                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs font-medium">
                    Optional
                </span>
            </div>
            <Select
                ref={tagRef}
                name="tags"
                closeMenuOnSelect={false}
                components={animatedComponents}                 
                isMulti
                options={Tags}
                classNamePrefix="react-select"
            />
        </div>
        
        {/* Submit Button */}
        <button 
            type="submit" 
            className="w-full mt-2 py-3 px-4 bg-black text-white font-medium rounded-lg shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black active:scale-[0.99] cursor-pointer transition-all duration-200"
        >
            Post
        </button>
    </form>
</div>
}