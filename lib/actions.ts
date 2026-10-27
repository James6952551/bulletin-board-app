'use server';
import { prisma } from "./prisma";
import { redirect } from "next/navigation";
import { formCommentData, formPostData, Post, User } from "./types";
import { auth } from "./auth";
import { headers } from "next/headers";

export async function isUserAuthenticated(){
    const requestHeaders = await headers();
    const session = await auth.api.getSession({
        headers: requestHeaders,
    });

    if ( !session ){ redirect('/user/sign-in'); }
}

export async function signOut() {
    try {
        const requestHeaders = await headers();
        await auth.api.signOut({
            headers: requestHeaders,
        });
    } catch (error) {
        console.error("Sign out request failed:", error);
    }

    redirect('/user/sign-in');
}

export async function getPosts(){ 
    return await prisma.post.findMany({
        include: {
            author: true,
            likedBy: true,
            comments: true,
        }
});}

export async function getPostsByUser(id: string){ 
    return await prisma.post.findMany({
        where: {
            authorId: id,
        },
        include: {
            author: true,
            likedBy: true,
            comments: true,
        }
});}

export async function getPost(id: string){
    return await prisma.post.findUnique({
        where: {
            id: id,
        },
        include: {
            author: true,
            likedBy: true,
            comments: true,
    },
    });
}

export async function getUser(authorId: string){
    return await prisma.user.findUnique({
        where: {
            id: authorId,
        }
    });
}

export async function getUserId() {
    const requestHeaders = await headers();
    const session = await auth.api.getSession({
        headers: requestHeaders,
    });

    if (!session || !session.user) {
        return undefined;
    }

    return session.user.id;
}

export async function getComments(postId: string){
    return await prisma.comment.findMany({
        where: {
            postId: postId,
        },
        include: {
            author: true,           
        },
    })
}

export async function createPost(postData:formPostData){
    try {
    const userId = await getUserId();
    if (!userId) { redirect('/user/sign-in'); }

    await prisma.post.create({
        data:{
            title: postData.title,
            content: postData.content,
            category: postData.category,
            authorId: userId,
            tags: postData.tags,
        }
    });} catch (error) {
            console.error("Error creating post: ", error);
            return { success: false, error: "Failed to create post. Please try again." };
    }
}

export async function createComment(commentData:formCommentData) {
    try {
    const userId = await getUserId();
    if (!userId) { redirect('/user/sign-in'); }

    await prisma.comment.create({
        data: {
            content: commentData.content,
            postId: commentData.postId,
            authorId: userId,
        },
    });

    await prisma.post.update({
        where: {
            id: commentData.postId,
        },
        data: {
            commentCount: {
                increment: 1,
            },
        },
    })} catch (error) {
            console.error("Error creating comment: ", error);
            return { success: false, error: "Failed to create comment. Please try again." };
    }
}

export async function updateUser(userData: User) {
    await prisma.user.update({
        where: {
            id: userData.id,
        },
        data: {
            name: userData.name,
            introduction: userData.introduction,
        },
    })
}

export async function updatePost(postData: Post) {
    await prisma.post.update({
        where: {
            id: postData.id,
        },
        data: {
            title: postData.title,
            content: postData.content,
            //comment field may be updated here
        },
    })
}

export async function deleteUser(id: string){
    await prisma.user.delete({
        where: {
            id: id,
        },
    }) 
}

export async function deletePost(id: string){
    await prisma.post.delete({
        where: {
            id: id,
        },
    })
}

export async function deleteComment(postId: string, commentId: string) {
    await prisma.comment.delete({
        where: {
            id: commentId,
        },
    })
    
    await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            commentCount: {
                decrement: 1,
            },
        },
    })
}