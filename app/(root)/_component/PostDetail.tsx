'use client';
import { Icon } from "@/_constant";
import { createComment, deleteComment, deletePost, getPost, getUser, getUserId, updatePost } from "@/lib/actions";
import { Comment, formCommentData, Post, User } from "@/lib/types";
import { redirect, useRouter } from "next/navigation";
import { useRef, useState } from "react";
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

interface PostDetailProps {
  post: Post;
  author: User | null;
  comments: Comment[];
  currentUserId: string;
}

export default function PostDetail({
    post, 
    author, 
    comments, 
    currentUserId
}: PostDetailProps){
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [postData, setPostData] = useState<Post>(post);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const commentRef = useRef<HTMLFormElement>(null);

    const router = useRouter();

    async function handleButtonClick(){
        if (!isUpdating) {
            setIsUpdating(true);
        } else {
            setIsSaving(true);
            try {
                await updatePost(postData);
                setIsUpdating(false);
            } catch (error) {
                console.error("Failed to update post:", error);
            } finally {
                setIsSaving(false);
            }
        }
    }

    async function handleCommentPost(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const content = formData.get("content") as string;
        const postId = postData.id;

        await createComment({content, postId});
        router.refresh();
        commentRef.current?.reset();
    }

    async function handleCommentDelete(commentId: string){
        await deleteComment(postData.id, commentId);
        router.refresh();
    }

    return <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6">
  <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-8 sm:p-12 space-y-8">
    
    {/* Article Header */}
    <div className="space-y-4 border-b border-gray-100 pb-6">
      {/* Title */}
      <textarea 
        value={postData.title} 
        onChange={(e) => setPostData({...postData, title: e.target.value})} 
        disabled={!isUpdating} 
        placeholder="Post Title..."
        className={`w-full font-bold text-3xl sm:text-4xl tracking-tight resize-none bg-transparent focus:outline-none ${
          isUpdating ? "border-b border-blue-500 pb-2" : ""
        }`} 
        style={{ fieldSizing: "content" }}
      />

      {/* Author & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            {author?.name?.[0]}
          </div>
          <div>
            <button 
              onClick={() => router.push(`/user/${author?.id}`)}
              className="font-medium text-gray-900 hover:underline"
            >
              {author?.name}
            </button>
            <p className="text-xs text-gray-500">{author?.email}</p>
          </div>
        </div>

        {/* Action Buttons (Edit/Delete) */}
        {author?.id === currentUserId && (
          <div className="flex items-center gap-2">
            <button 
              onClick={handleButtonClick} 
              className="px-4 py-1.5 text-sm font-medium bg-gray-900 hover:bg-gray-800 text-white rounded-full transition-colors cursor-pointer"
            >
              {!isUpdating ? "Edit Post" : "Save Changes"}
            </button>

            <AlertDialog>
              <AlertDialogTrigger render={
                <button className="px-4 py-1.5 text-sm font-medium bg-red-50 hover:bg-red-100 text-red-600 rounded-full transition-colors cursor-pointer">
                  Delete
                </button>
              } />
              <AlertDialogContent className="bg-white">
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                post from our servers.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer hover:bg-gray-300">
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction 
                                onClick={(e) => {deletePost(postData.id), router.push('/')}} 
                                className="cursor-pointer bg-red-600 hover:bg-red-700 text-white"
                            >
                                Continue
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </div>

    {/* Article Content */}
    <div className="space-y-4">
      <textarea 
        value={postData.content} 
        onChange={(e) => setPostData({...postData, content: e.target.value})} 
        disabled={!isUpdating} 
        placeholder="Write your story..."
        className={`w-full text-gray-700 leading-relaxed text-lg resize-none bg-transparent focus:outline-none ${
          isUpdating ? "border border-gray-300 rounded-lg p-4" : ""
        }`} 
        style={{ fieldSizing: "content" }}
      />

      {/* Engagement Stats */}
      <div className="flex items-center gap-6 pt-4 text-gray-500 border-t border-gray-100">
        <span className="flex items-center gap-2 text-sm font-medium">
          <Icon.commentIcon className="w-4 h-4" />
          {post?.commentCount} Comments
        </span>
      </div>
    </div>

    {/* Comments Section */}
    <div className="space-y-6 pt-6 border-t border-gray-200">
      <h3 className="font-bold text-xl text-gray-900">Discussion</h3>
      
      {/* New Comment Form */}
      <form ref={commentRef} onSubmit={handleCommentPost} className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <textarea 
          name="content"
          placeholder="What are your thoughts?"
          required
          className="w-full bg-transparent border-0 focus:outline-none resize-none text-gray-900 placeholder:text-gray-400" 
          style={{ fieldSizing: "content" }}
        ></textarea>
        <div className="flex justify-end">
          <button className="px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-full transition-colors cursor-pointer">
            Post Comment
          </button>
        </div>
      </form>

      {/* Comment List */}
      <div className="space-y-4 divide-y divide-gray-100">
        {comments.map((comment) => {
                        const year = comment.createdAt.getFullYear();
                        const month = comment.createdAt.getMonth();
                        const date = comment.createdAt.getDate();
                        const hours = comment.createdAt.getHours();
                        const minutes = comment.createdAt.getMinutes();
                        const createdAt = `${year} / ${month} / ${date} \u2003 ${hours} : ${minutes}`
          return (
            <div key={comment.id} className="pt-4 first:pt-0 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{comment.author.name}</span>
                  <span className="text-xs text-gray-400">• {createdAt}</span>
                </div>
                {comment.authorId === currentUserId && (
                                <AlertDialog>
                                    <AlertDialogTrigger render={<button className="text-gray-500 text-sm py-2 hover:underline">
                                                                    Delete
                                                                </button>} 
                                    />
                                    <AlertDialogContent className="bg-white">
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your
                                            comment from our servers.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel className="cursor-pointer hover:bg-gray-300">
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction 
                                            onClick={(e) => handleCommentDelete(comment.id)} 
                                            className="cursor-pointer bg-red-600 hover:bg-red-700 text-white"
                                        >
                                            Continue
                                        </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                )}
              </div>
              <p className="text-gray-600 text-sm">{comment.content}</p>
            </div>
          );
        })}
      </div>
    </div>

  </div>
</div>
}