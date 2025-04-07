// zoska-gram/src/app/profil/page.tsx

import ProfileView from '@/sections/ProfileView';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export const metadata = { title: 'Môj profil | Zoška Gram' };

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/prihlasenie');
  }

  return <ProfileView userId={session.user.id} isOwnProfile={true} />;
}