"use client";
import { useRef, useEffect, useState } from "react";
import PostItem from "../components/post-item";
import { DEFAULT_LIMIT } from "@/lib/constants/contants";
import PostsSkeleton from "../skeleton/posts-skeleton";
import { Post } from "@/lib/types";
import { Virtuoso } from "react-virtuoso";
import { getByParams } from "@/app/[lang]/helpers/httpEntity.service";
import { APIURLS } from "@/app/[lang]/helpers/APIURLS";

interface PostsProps {
  type?: "followed" | "random";
}

const Posts = ({ type = "followed" }: PostsProps) => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Post[]>([]);
  const [isEnd, setIsEnd] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const fetchingRef = useRef(false);

  const getPost = async (pageNumber: number = page) => {
    try {
      if (pageNumber === 1) {
        setIsPending(true);
      } else {
        setIsFetching(true);
      }

      const response = await getByParams(APIURLS.POST_FOLLOWED, {
        pageNumber: pageNumber,
        pageSize: DEFAULT_LIMIT,
      });
      if (response) {
        if (pageNumber === 1) {
          setItems(response.data || []);
        } else if (response.data && response.data.length > 0) {
          setItems((prev) => [...prev, ...response.data]);
        }

        const total = response.totalRecords || response.recordTotals || 0;
        const currentItemsLength = pageNumber === 1 ? (response.data?.length || 0) : items.length + (response.data?.length || 0);
        
        if (
          currentItemsLength >= total ||
          !response.data ||
          response.data.length === 0
        ) {
          setIsEnd(true);
        }
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsPending(false);
      setIsFetching(false);
      fetchingRef.current = false;
    }
  };
  const getPostRandom = async (pageNumber: number = page) => {
    try {
      if (pageNumber === 1) {
        setIsPending(true);
      } else {
        setIsFetching(true);
      }

      const response = await getByParams(APIURLS.POST_RANDOM, {
        pageNumber: pageNumber,
        pageSize: DEFAULT_LIMIT,
      });
      if (response) {
        if (pageNumber === 1) {
          setItems(response.data || []);
        } else if (response.data && response.data.length > 0) {
          setItems((prev) => [...prev, ...response.data]);
        }

        const total = response.totalRecords || response.recordTotals || 0;
        const currentItemsLength = pageNumber === 1 ? (response.data?.length || 0) : items.length + (response.data?.length || 0);
        
        if (
          currentItemsLength >= total ||
          !response.data ||
          response.data.length === 0
        ) {
          setIsEnd(true);
        }
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsPending(false);
      setIsFetching(false);
      fetchingRef.current = false;
    }
  };

  useEffect(() => {
    setPage(1);
    setItems([]);
    setIsEnd(false);
    setIsPending(true);
  }, [type]);

  useEffect(() => {
    if (type === "random") {
      getPostRandom(page);
    } else {
      getPost(page);
    }
  }, [type, page]);

  const loadMore = () => {
    if (!isEnd && !fetchingRef.current && !isFetching) {
      fetchingRef.current = true;
      setPage((prev) => prev + 1);
    }
  };

  if (isPending && items.length === 0) {
    return <PostsSkeleton />;
  }

  if (!isPending && items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <span className="text-2xl mb-2">Hiç gönderi Bulunamadı</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0  mx-auto scrollbar-hide">
      <Virtuoso
        style={{ height: "100vh" }}
        className="scrollbar-hide"
        data={items}
        endReached={loadMore}
        itemContent={(index, post) => <PostItem post={post} key={index} />}
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
  );
};

export default Posts;