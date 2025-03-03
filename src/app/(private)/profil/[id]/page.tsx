// src\app\profil\[id]\page.tsx

import { fetchUserById } from '@/app/actions/users';
import ProfileView from '@/components/ProfileView';
import { notFound } from 'next/navigation';

export const generateMetadata = async ({ params }: { params: { id: string } }) => {
  try {
    const user = await fetchUserById(params.id);
    return {
      title: `${user.name || 'Profil používateľa'} | ZoskaGram`
    };
  } catch {
    return {
      title: 'Profil nebol nájdený | ZoskaGram'
    };
  }
};

export default async function ProfileDetail({ params }: { params: { id: string } }) {
  try {
    const user = await fetchUserById(params.id);
    return <ProfileView user={user} />;
  } catch {
    notFound();
  }
}