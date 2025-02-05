// src/sections/AuthHomeView.tsx

'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function AuthHomeView() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      redirect('/prispevok');
    }
  }, [session]);

  return null;
}
