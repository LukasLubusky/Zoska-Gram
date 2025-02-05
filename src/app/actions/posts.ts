// src/app/actions/posts.ts

"use server";

import { prisma } from "@/app/api/auth/[...nextauth]/prisma";


export const fetchPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Could not fetch posts");
  }
};

export const fetchPostsByUserId = async (userId: string) => {
  try {
    const posts = await prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return posts;
  } catch (error) {
    throw new Error("Could not fetch posts");
  }
};

export const createPost = async (userId: string, imageUrl: string, caption?: string) => {
  try {
    const newPost = await prisma.post.create({
      data: {
        userId,
        imageUrl,
        caption,
      },
    });
    return newPost;
  } catch (error) {
    throw new Error("Could not create post");
  }
};