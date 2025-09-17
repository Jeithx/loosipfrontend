import { Skeleton } from "@/components/ui/skeleton";

const PostSkeletonItem = () => (
  <div className="bg-white border-t border-r border-l border-gray-200 mb-2">
    <div className="flex items-center gap-3 px-4 py-3">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex-1">
        <Skeleton className="w-24 h-4 mb-1" />
        <Skeleton className="w-16 h-3" />
      </div>
    </div>
    <div className="px-4 py-2">
      <Skeleton className="w-full h-4 mb-2" />
      <Skeleton className="w-2/3 h-4" />
    </div>
    <div className="bg-black/20 flex items-center justify-center">
      <Skeleton className="w-full aspect-video rounded-none" />
    </div>
    <div className="px-4 py-3 border-t border-gray-100 flex gap-4">
      <Skeleton className="w-16 h-6 rounded" />
      <Skeleton className="w-16 h-6 rounded" />
      <Skeleton className="w-16 h-6 rounded" />
    </div>
    <div className="px-4 pb-3">
      <Skeleton className="w-full h-4 mb-2" />
      <Skeleton className="w-3/4 h-4" />
    </div>
  </div>
);

const PostsSkeleton = () => {
  return (
    <div className="flex flex-col gap-0 max-w-xl mx-auto">
      {[1, 2, 3].map((i) => (
        <PostSkeletonItem key={i} />
      ))}
    </div>
  );
};

export default PostsSkeleton;
