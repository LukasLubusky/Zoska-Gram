// Zoska-Gram/src/app/prispevok/page.tsx

import PostView from '@/sections/PostsViev'; // Adjust the import path as needed

export const metadata = { title: 'Zoznam prispevkov | Zoska-Gram' };

export default function PostList() {
  return (
    <div>
      <PostView />
    </div>
  );
}
