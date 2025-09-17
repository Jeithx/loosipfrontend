"use client";
import { feedPosts, userPostTabs } from "@/lib/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostItem from "@/modules/feed/ui/components/post-item";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { get } from "http";
import { getByParams } from "@/app/[lang]/helpers/httpEntity.service";
import { APIURLS } from "@/app/[lang]/helpers/APIURLS";
import { useParams } from "next/navigation";
import { Virtuoso } from "react-virtuoso";
import PostsSkeleton from "@/modules/feed/ui/skeleton/posts-skeleton";
import { DEFAULT_LIMIT } from "@/lib/constants/contants";

// Interface'leri tanımlayalım
interface PostMedia {
  id: number;
  postId: number;
  mediaUrl: string;
  blurredUrl?: string;
  thumbnailUrl?: string;
  type: number;
  order: number;
  creationDate: string;
  isActive: boolean;
}

interface PostTag {
  id: number;
  postId: number;
  tagId: number;
  tag?: string;
}

interface PostComment {
  id: number;
  postId: number;
  userId: number;
  comments: string;
  creationDate: string;
  isActive: boolean;
}

interface Post {
  id: number;
  userId: number;
  userName: string;
  userDisplayName: string;
  userProfilePicture: string;
  creationDate: string;
  isActive: boolean;
  isNsfw: boolean;
  isPinned: boolean;
  isScheduled: boolean;
  mediaType: number;
  type: number;
  visibility: number;
  price: number;
  likeCount: number;
  commentCount: number;
  tipCount: number;
  viewCount: number;
  postMedia: PostMedia[];
  postTags: PostTag[];
  postComments: PostComment[];
  title: string;
}

interface ApiResponse {
  data: Post[];
  success: boolean;
  message: string;
  recordTotals: number;
}

const UserPosts = () => {
  const params = useParams();
  const username = params?.username;
  const [userId, setUserId] = useState<number | null>(null);
  const [items, setItems] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const fetchingRef = useRef(false);

  const [total, setTotal] = useState(0);


  
 const userPostTabs = [
  { label: "posts", count: total },
  // { label: "story", count: 0 },
  // { label: "reels", count: 0 },
  // { label: "scorp", count: 0 },
];
  const [activeTab, setActiveTab] = useState(userPostTabs[0].label);
  const getUser = async () => {
    try {
      const response = await getByParams(APIURLS.USER_BY_NAME, { name: username });
      setUserId(response.data.id);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getUserPosts = async (pageNumber: number = page) => {
    if (!userId) return;
    try {
      if (pageNumber === 1) {
        setIsPending(true);
      } else {
        setIsFetching(true);
      }
      const response: ApiResponse = await getByParams(APIURLS.POST_GETBYUSERID, {
        userId: userId,
        pageNumber: pageNumber,
        pageSize: DEFAULT_LIMIT,
      });
      if (response) {
        setTotal(response.recordTotals || 0);
        if (pageNumber === 1) {
          setItems(response.data || []);
        } else if (response.data && response.data.length > 0) {
          setItems((prev) => [...prev, ...response.data]);
        }
        const currentItemsLength = pageNumber === 1 ? (response.data?.length || 0) : items.length + (response.data?.length || 0);
        if (
          currentItemsLength >= (response.recordTotals || 0) ||
          !response.data ||
          response.data.length === 0
        ) {
          setIsEnd(true);
        }
      }
    } catch (exx) {
      console.error("Error fetching user posts:", exx);
    } finally {
      setIsPending(false);
      setIsFetching(false);
      fetchingRef.current = false;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (userId != null && userId > 0) {
      setPage(1);
      setItems([]);
      setIsEnd(false);
      setIsPending(true);
    }
  }, [userId]);

  useEffect(() => {
    if (userId != null && userId > 0) {
      getUserPosts(page);
    }
  }, [userId, page]);

  const loadMore = () => {
    if (!isEnd && !fetchingRef.current && !isFetching) {
      fetchingRef.current = true;
      setPage((prev) => prev + 1);
    }
  };

  // Loading skeleton
  if (isPending && items.length === 0) {
    return <PostsSkeleton />;
  }

  // No posts
  if (!isPending && items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <span className="text-2xl mb-2">Hiç gönderi Bulunamadı</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full justify-start rounded-none bg-transparent px-4 border-b border-gray-200">
          {userPostTabs.map((tab) => (
            <TabsTrigger
              key={tab.label}
              value={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className="relative capitalize shadow-none text-gray-500 data-[state=active]:text-purple-600 rounded-none px-3 py-2 text-sm font-medium"
            >
              {activeTab === tab.label && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-[-6px] left-0 right-0 h-0.5 bg-purple-600"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="font-semibold mr-1.5">{tab.count}</span>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="posts">
          <div className="flex flex-col">
            <Virtuoso
              style={{ height: "100vh" }}
              className="scrollbar-hide"
              data={items}
              endReached={loadMore}
              itemContent={(index, post) => (
                <PostItem key={post.id} post={post as any} onPostDeleted={() => getUserPosts(1)} />
              )}
              components={{
                Footer: () =>
                  !isEnd && (isFetching || fetchingRef.current) ? (
                    <div className="py-4">
                      <PostsSkeleton />
                    </div>
                  ) : null,
              }}
            />
          </div>
        </TabsContent>
        {userPostTabs.slice(1).map((tab) => (
          <TabsContent key={tab.label} value={tab.label}>
            <div className="flex items-center justify-center p-10 text-gray-500">
              Content for {tab.label} will be shown here.
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default UserPosts;