'use client';
import { Categories } from "@/_constant";
import { Heart, MessageCircle, StickyNote, SquarePlus  } from 'lucide-react';
import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getPosts } from "@/lib/actions";
import { Post } from "@/lib/types";
import Link from "next/link";

export default function ClientView({
  posts
} : {
  posts: Post[]
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  let filteredPosts = posts.filter((post) => {
    if (selectedCategory === "All") return posts;
    return post.category === selectedCategory;
  })

  const router = useRouter();

  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-6 gap-8 items-start">
  
  {/* Sidebar / Category Menu (Sticky, keeping original menu styling) */}
  <aside className="lg:col-span-1 sticky top-8 flex flex-col p-2 space-y-1 bg-white border-r border-gray-100 rounded-xl shadow-xs">
    <h3 className="px-3 pb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
      Categories
    </h3>
    
    {/* All Category Button */}
    <button 
      onClick={() => setSelectedCategory("All")} 
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
        selectedCategory === "All"
          ? "bg-blue-50 text-blue-600 shadow-sm"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <StickyNote className="w-4 h-4" />
      <span>All</span>
    </button>

    {/* Mapped Categories */}
    {Categories?.map((category) => {
      const Icon = category.icon;
      const isActive = selectedCategory === category.label;
      
      return (
        <button 
          key={category.label} 
          onClick={() => setSelectedCategory(category.label)} 
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
            isActive
              ? "bg-blue-50 text-blue-600 shadow-sm"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
          <span>{category.label}</span>
        </button>
      )
    })}

    <div className="pt-3 mt-2 border-t border-gray-100">
      <button 
        onClick={() => {router.push('/post/create')}} 
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all duration-150 shadow-sm cursor-pointer"
      >
        <SquarePlus className="w-4 h-4" />
        <span>New Post</span>
      </button>
    </div>
  </aside>

  {/* Main Content Feed (Modernized spacing & cards) */}
  <main className="lg:col-span-5 flex flex-col space-y-4">
    {filteredPosts && filteredPosts.map((post) => {  
      return (
        <Link 
          key={post.id} 
          href={`/post/${post.id}`}
          className="block group"
        >
          <Card className="bg-white border border-slate-200/80 rounded-xl shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">{post.content}</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-medium text-slate-600">
                <MessageCircle className="w-4 h-4 text-slate-400" />
                <span>{post.commentCount}</span>
              </div>
              
              <div className="flex items-center gap-1.5 flex-wrap">
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-blue-50 text-blue-600 font-medium px-2.5 py-0.5 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        </Link>
      )
    })}
  </main>

</div>
}
