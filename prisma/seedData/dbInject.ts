import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
    const data = JSON.parse(fs.readFileSync('prisma/seedData/seed-data.json', 'utf8'));

  for (const item of data) {
    // Upsert user
    const upsertedUser = await prisma.user.upsert({
      where: { id: item.id },
      update: {
        name: item.name,
        email: item.email,
        emailVerified: item.emailVerified,
        image: item.image,
        updatedAt: item.updatedAt
      },
      create: {
        id: item.id,
        name: item.name,
        email: item.email,
        emailVerified: item.emailVerified,
        image: item.image,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      }
    });

    // Upsert profile
    if (item.profile) {
      await prisma.profile.upsert({
        where: { id: item.profile.id },
        update: {
          userId: item.profile.userId,
          bio: item.profile.bio,
          avatarUrl: item.profile.avatarUrl,
          location: item.profile.location,
          interests: item.profile.interests,
          updatedAt: item.profile.updatedAt
        },
        create: {
          id: item.profile.id,
          userId: item.profile.userId,
          bio: item.profile.bio,
          avatarUrl: item.profile.avatarUrl,
          location: item.profile.location,
          interests: item.profile.interests,
          createdAt: item.profile.createdAt,
          updatedAt: item.profile.updatedAt
        }
      });
    }

    // Create posts
    if (item.posts && item.posts.length > 0) {
      await prisma.post.createMany({
        data: item.posts.map((p: any) => ({
          id: p.id,
          userId: p.userId,
          imageUrl: p.imageUrl,
          caption: p.caption,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt
        })),
        skipDuplicates: true
      });
    }
  }

  console.log('Database seeded successfully!');
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});