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
    return <div className="w-lg border border-gray-500 rounded mx-auto flex px-4 py-8">
        <form 
            ref={formRef} 
            onSubmit={onSubmit} 
            className="flex flex-col space-y-6 w-lg"
        >
            <div className="flex flex-col gap-4">
                <label htmlFor="title">Title</label>
                <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    required 
                    className="border rounded px-2 flex-1" 
                />
            </div>
            <div className="flex flex-col gap-4 h-40">
                <label htmlFor="content">Content</label>
                <textarea 
                    name="content" 
                    id="content" 
                    required 
                    className="border rounded px-2 flex-1 resize-none"
                ></textarea>
            </div>
            <div className="flex flex-col gap-4">
                <label htmlFor="category">Category</label>
                <Select
                    ref={categoryRef}
                    name="category"
                    closeMenuOnSelect={true}
                    components={animatedComponents}                   
                    options={Categories}
                />
            </div>
            <div className="flex flex-col gap-4">
                <label htmlFor="tag">
                    Tag <span className="bg-blue-400 px-1 py-1 rounded text-sm text-white">Optional</span>
                </label>
                <Select
                    ref={tagRef}
                    name="tags"
                    closeMenuOnSelect={false}
                    components={animatedComponents}                   
                    isMulti
                    options={Tags}
                />
            </div>
            
            <button 
                type="submit" 
                className="border rounded bg-black text-white hover:bg-gray-900 py-2 cursor-pointer"
            >
                Post
            </button>
        </form>

    </div>
}