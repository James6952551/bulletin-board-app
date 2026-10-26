import { getPost, getPostsByUser, getUser } from "@/lib/actions";
import { notFound, redirect } from "next/navigation";
import UserDetail from "../_component/UserDetail";
import { authClient } from "@/lib/auth-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const instant = false;

export default async function UserDetailPage(){
    const session = await auth.api.getSession({
            headers: await headers(),
        });
    
        if ( !session ){ redirect('/user/sign-in'); }
        
    const posts = await getPostsByUser(session.user.id);
    
    return <UserDetail posts={posts} user={session.user}/>
}
