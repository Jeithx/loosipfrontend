import MainLayout from "@/components/main-layout";
import { DEFAULT_LIMIT } from "@/lib/constants/contants";
import FeedView from "@/modules/feed/ui/views/feed-view";
import { HydrateClient, trpc } from "@/trpc/server";
import { Suspense } from "react";

const Page = () => {
  void trpc.post.getPosts.prefetchInfinite({
    pageNumber: 1,
    pageSize: DEFAULT_LIMIT,
  });
  return (
    <MainLayout>
      <HydrateClient>
        <Suspense fallback={<></>}>
          <FeedView />
        </Suspense>
      </HydrateClient>
    </MainLayout>
  );
};

export default Page;
