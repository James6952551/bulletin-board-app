import { Prisma } from "@/generated/prisma/client";

export type formPostData = {
    title: string,
    content: string,
    category: string,
    tags?: string[],
}

export type formCommentData = {
  content: string,
  postId: string,
}

export type User = Prisma.UserGetPayload<{
    include: {
        
    }
}>;

export type Post = Prisma.PostGetPayload<{
  include: {
    author: true;
    likedBy: true;
    comments: true;
  }
}>;

export type Comment = Prisma.CommentGetPayload<{
  include: {
    author: true;
  },
}>