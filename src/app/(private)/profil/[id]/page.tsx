// robertweb/src/app/profil/[id]/page.tsx

import ProfileView from '@/sections/ProfileView';

export const metadata = { title: 'Detail profilu | RobertWeb'};

export default function ProfileDetail({ params }: { params: { id: string } }) {
  return <ProfileView userId={params.id} />;
}