// robertweb/src/app/prispevok/page.tsx

import PostsView from '@/sections/PostsView';

export const metadata = { title: 'Zoznam prispevkov | RobertWeb' };

export default function PostList() {
  return (
    <div>
      <PostsView />
    </div>
  );
}
