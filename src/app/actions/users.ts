"use server";

import { prisma } from "@/app/api/auth/[...nextauth]/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export const fetchAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        profile: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Nepodarilo sa načítať používateľov");
  }
};

export const fetchUserById = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        posts: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
    });
    
    if (!user) {
      throw new Error("Používateľ nebol nájdený");
    }
    
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Nepodarilo sa načítať používateľa");
  }
};

export const fetchCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      throw new Error("Nie ste prihlásený");
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        profile: true,
        posts: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
    });

    if (!user) {
      throw new Error("Používateľ nebol nájdený");
    }

    return user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw new Error("Nepodarilo sa načítať údaje o používateľovi");
  }
}; 