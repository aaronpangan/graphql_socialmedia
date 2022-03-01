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

export interface IPostImage {
  postId: number;
  url: [string];
  imageId: number;
}

export interface IComment {
  userId: number;
  postId: number;
  comment: string;
  commentId: number;
}
export interface ICommentPayload {
  content: String;
  id: number;
  userId: number;
}
