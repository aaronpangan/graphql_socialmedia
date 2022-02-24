import { Comment, Post } from '@prisma/client';

export interface CreatePost {
  title: string;
  content: string;
  isPublic: boolean;
}
export interface PostPayload {
  error: {
    message: string;
  }[];
  post: Post | null;
}

export interface CreateComment {
  userId: number;
  postId: number;
  comment: string;
}
export interface CommentPayload {
  comment: Comment | null;
}
