import { Comment, Post } from '@prisma/client';

export interface ICreatePost {
  post: {
    title: string;
    content: string;
    isPublic: boolean;
    PostImage: [string];
  };
}

export interface IUpdatePost {
  post: { title: string; content: string; isPublic: boolean };

  postId: number;
}
export interface IPostPayload {
  newPost: Post;
}

export interface IAddPostImage {
  postId: number;
  url: [string];
}

export interface ICreateComment {
  userId: number;
  postId: number;
  comment: string;
}
export interface ICommentPayload {
  comment: Comment;
}
