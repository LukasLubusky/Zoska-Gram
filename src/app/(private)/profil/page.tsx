// src\app\profil\page.tsx

import { fetchCurrentUser } from '@/app/actions/users';
import ProfileView from '@/components/ProfileView';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Môj profil | ZoskaGram'};

export default async function ProfilePage() {
  try {
    const user = await fetchCurrentUser();
    return <ProfileView user={user} />;
  } catch (error) {
    redirect('/auth/prihlasenie');
  }
}