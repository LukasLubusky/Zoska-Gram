// zoska-gram/src/app/prispevok/page.tsx

import PostsView from '@/sections/PostsView';

export const metadata = { title: 'Zoznam prispevkov | Zoška Gram' };

export default function PostList() {
  return (
    <div>
      <PostsView />
    </div>
  );
}
