// src/app/home/page.tsx
import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to the root route which handles authentication
  redirect('/');
}
