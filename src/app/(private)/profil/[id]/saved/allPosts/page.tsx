import { Metadata } from 'next';
import SavedPostsView from '@/sections/SavedPostsView';

export const metadata: Metadata = {
  title: 'Saved Posts',
  description: 'View all your saved posts',
};

export default function SavedPostsPage() {
  return <SavedPostsView/>;
}
