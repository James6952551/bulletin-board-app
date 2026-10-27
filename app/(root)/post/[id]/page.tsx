import { getComments, getPost, getUser, getUserId } from "@/lib/actions";
import PostDetail from "../../_component/PostDetail";
import { notFound, redirect } from "next/navigation";

export const instant = false;

export default async function PostDetailPage({ 
    params 
}: { 
    params: Promise<{ id: string }> 
}){
    const { id } = await params;
    const post = await getPost(id);
    if(!post){notFound();}
    const author = post? await getUser(post.authorId): null;
    const comments = await getComments(post.id);
    const userId = await getUserId();

    return <PostDetail 
                post={post} 
                author={author} 
                comments={comments} 
                currentUserId={userId}
            />
}
