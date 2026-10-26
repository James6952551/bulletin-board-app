'use client';
import { Heart, MessageCircle, StickyNote, SquarePlus, Trash   } from 'lucide-react';
import { deletePost, deleteUser, getPost, getUser, updatePost, updateUser } from "@/lib/actions";
import { Post, User } from "@/lib/types";
import { redirect } from "next/navigation";
import { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/Avatar"
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
} from "./ui/Alert-dialog"
import { useRouter } from "next/navigation";
import { getPosts } from "@/lib/actions";
import Link from "next/link";

interface UserDetailProps {
    posts: Post[],
    user: {
        id: string;
        name: string | null;
        introduction?: string | null;
        email: string;
        image?: string | null;
    }
};

export default function UserDetail({
    posts, 
    user
}: UserDetailProps){
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [userData, setUserData] = useState<any>(user);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    async function handleupdate(){
        if (!isUpdating) {
            setIsUpdating(true);
        } else {
            setIsSaving(true);
            try {
                await updateUser(userData);
                setIsUpdating(false);
            } catch (error) {
                console.error("Failed to update user:", error);
            } finally {
                setIsSaving(false);
            }
        }
    }

    async function handledelete(){
        await deleteUser(user.id);
    }

    return <div className="max-w-4xl mx-auto px-4 py-10 space-y-12">
  
            {/* Profile Header Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                
                {/* Avatar */}
                <div className="w-32 h-32 shrink-0 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-4xl shadow-inner">
                {user?.name?.[0]}
                </div>

                {/* User Info & Inputs */}
                <div className="flex-1 w-full space-y-4 text-center sm:text-left">
                <div>
                    <input 
                    type="text" 
                    value={userData.name} 
                    onChange={(e) => setUserData({...userData, name: e.target.value})} 
                    disabled={!isUpdating} 
                    className={`w-full font-bold text-3xl bg-transparent focus:outline-none ${
                        isUpdating ? "border-b border-blue-500 pb-1" : ""
                    }`} 
                    />
                    <p className="text-sm text-gray-500 mt-1">
                    {user.email}
                    </p>
                </div>

                <textarea 
                    maxLength={570} 
                    value={userData?.introduction || ""} 
                    onChange={(e) => setUserData({...userData, introduction: e.target.value})} 
                    disabled={!isUpdating} 
                    placeholder="Add a short bio..."
                    className={`w-full text-gray-600 text-sm resize-none bg-transparent focus:outline-none ${
                    isUpdating ? "border border-gray-300 rounded-lg p-3" : ""
                    }`} 
                    style={{ fieldSizing: "content" }}
                />
                </div>

                {/* Action Buttons (Edit / Delete Account) */}
                <div className="flex sm:flex-col items-center gap-2">
                <button 
                    onClick={handleupdate}
                    className="px-4 py-2 text-sm font-medium bg-black hover:bg-gray-800 text-white rounded-lg transition-colors cursor-pointer"
                >
                    {!isUpdating ? "Edit Profile" : "Save Changes"}
                </button>

                <AlertDialog>
                    <AlertDialogTrigger render={<button className="p-2 hover:bg-gray-200">
                                                    <Trash />
                                                </button>} 
                                                />
                    <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer hover:bg-gray-100">
                        Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction 
                        onClick={handledelete} 
                        className="cursor-pointer bg-red-600 hover:bg-red-700 text-white"
                        >
                        Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                </div>

            </div>

            {/* Posts Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <h3 className="text-xl font-bold text-gray-900">Posts ({posts?.length || 0})</h3>
                </div>

                <div className="space-y-4">
                {posts && posts.map((post) => {  
                    return (
                    <Link key={post.id} href={`/post/${post.id}`} className="block group">
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

            </div>
}
