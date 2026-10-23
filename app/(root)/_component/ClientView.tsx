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

  return <div className="w-350 mx-10 grid grid-cols-6">
  <div className="flex flex-col col-span-1 p-2 space-y-1 bg-white border-r border-gray-100">
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
        <button 
          onClick={() => {router.push('/post/create')}} 
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all duration-150 shadow-sm"
        >
          <SquarePlus className="w-4 h-4" />
          <span>New Post</span>
        </button>
    </div>
    <div className="flex flex-col space-y-8 col-span-5 ml-20">
      {filteredPosts && filteredPosts.map((post) => {  
      return (
      <Link 
        key={post.id} 
        href={`/post/${post.id}`}
      >
        <Card className="shadow-lg hover:shadow-xl">
          <CardHeader>
            <CardTitle className="font-bold">{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-2">{post.content}</p>
          </CardContent>
          <CardFooter className="flex gap-4">
            <div className="flex gap-2 items-center">
              <MessageCircle className="w-4 h-4"/><p>{post.commentCount}</p>
            </div>
            {/*
            <div className="flex gap-2 items-center">
              <Heart className="w-4 h-4"/><p>{post.likeCount}</p>
            </div>
            */}
            <div className="flex gap-2 items-center">
              {post.tags.map((tag) => (
                <p key={tag} className="bg-blue-200 rounded-full py-1 px-2">{tag}</p>
              ))}
            </div>
          </CardFooter>
        </Card>
      </Link>
      )
})}
    </div>

  </div>
}
