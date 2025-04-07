import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import EditProfileView from '@/sections/EditProfileView';

export const metadata = { title: 'Upraviť profil | Zoška Gram' };

export default async function EditProfile({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/prihlasenie');
  }

  // Only allow editing if the profile belongs to the logged-in user
  if (session.user.id !== params.id) {
    redirect(`/profil/${params.id}`);
  }

  return <EditProfileView userId={params.id} />;
}
