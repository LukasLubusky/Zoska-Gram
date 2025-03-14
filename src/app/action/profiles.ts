// src/app/actions/profiles.ts

"use server";

// Import Prisma client
import { prisma } from "@/app/api/auth/[...nextauth]/prisma";

// Fetch profiles based on search term
export const fetchProfiles = async (searchTerm: string) => {
  try {
    const profiles = await prisma.profile.findMany({
      where: {
        OR: [
          { user: { name: { contains: searchTerm, mode: "insensitive" } } },
          { interests: { has: searchTerm } },
        ],
      },
      include: { user: true }, // Include user data
    });

    return profiles;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw new Error("Could not fetch profiles");
  }
};

// Fetch a single profile by user ID
export const fetchProfileByUserId = async (userId: string) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: { user: true },
    });

    return profile;
  } catch (error) {
    console.error("Error fetching profile by userId:", error);
    throw new Error("Could not fetch profile");
  }
};

// Ensure a profile exists for a user, creating one if it doesn't
export const ensureProfileExists = async (userId: string) => {
  try {
    // First check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    
    // Then check if the profile exists
    let profile = await prisma.profile.findUnique({
      where: { userId },
    });
    
    if (!profile) {
      // Create a new profile if it doesn't exist
      profile = await prisma.profile.create({
        data: {
          userId,
          interests: [],
        },
      });
      console.log(`Created new profile for user ${userId}`);
    }
    
    return profile;
  } catch (error) {
    console.error("Error ensuring profile exists:", error);
    throw new Error("Could not ensure profile exists");
  }
};
