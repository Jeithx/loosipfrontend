import { feedPosts } from "@/lib/mockData";
import PostItem from "@/modules/feed/ui/components/post-item";

const Top = () => {
  return (
    <div className="flex-1 flex flex-col divide-y divide-gray-100 overflow-y-auto h-screen scrollbar-hide">
      {feedPosts.length === 0 ? (
        <div className="p-8 text-center text-gray-400">No posts found.</div>
      ) : (
        feedPosts.map((post) => <PostItem key={post.id} post={post as any} />)
      )}
    </div>
  );
};

export default Top;
