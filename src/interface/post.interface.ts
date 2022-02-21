import { Post } from '@prisma/client';

export interface createPost {
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
