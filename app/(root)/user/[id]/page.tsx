import { getPost, getPostsByUser, getUser } from "@/lib/actions";
import { notFound } from "next/navigation";
import UserDetail from "../../_component/UserDetail";
import { Heart, MessageCircle, StickyNote, SquarePlus, Trash   } from 'lucide-react';
import { Post, User } from "@/lib/types";
import { redirect } from "next/navigation";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../_component/ui/Card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../_component/ui/Avatar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../_component/ui/Alert-dialog"
import { getPosts } from "@/lib/actions";
import Link from "next/link";

export const instant = false;

export default async function UserDetailPage({ 
    params 
}: { 
    params: Promise<{ id: string }> 
}){
    const { id } = await params;
    const posts = await getPostsByUser(id);
    const user = await getUser(id);
    
    return <div className="mx-10 grid grid-rows-6">
                <div className="row-span-1 flex">
                    <Avatar className="w-40 h-40">
                        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn"/>
                    </Avatar>
                    <div className="flex justify-between w-full">
                        <div className="ml-20 flex flex-col w-250">
                            <p className="text-4xl flex-1 rounded">
                                {user?.name} 
                            </p>
                            <p className="text-xl text-gray-500">
                                {user?.email}
                            </p>
                            <p className="mt-6 pb-4 flex-1 resize-none rounded">
                                {user?.introduction}
                            </p>
                            
                        </div>                         
                    </div>
                </div>

                <div className="flex flex-col space-y-8 row-span-5">
                    <p className="text-2xl font-bold border-b border-gray-500 pb-2">Posts</p>
                {posts && posts.map((post) => {  
                return (
                <Link key={post.id} href={`/post/${post.id}`}>
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

