"use client";

import { useEffect, useState } from "react";
import PostHeader from "./post-header";
import Poll from "./poll";
import PostActions from "./post-actions";
import PostComments from "./post-comments";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Post } from "@/lib/types";
import { trpc } from "@/trpc/client";
import { useAuthStore } from "@/store/auth-store";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { deleteById, postByParams } from "@/app/[lang]/helpers/httpEntity.service";
import { APIURLS } from "@/app/[lang]/helpers/APIURLS";
import { useRouter } from "next/navigation";

interface PostItemProps {
  post: Post;
  onPostDeleted?: () => void;
}

// Media type constants
const MEDIA_TYPES = {
  IMAGE: 0,
  VIDEO: 1,
  GALLERY: 2,
  AUDIO: 3,
  TEXT: 4
};

const PostItem = ({ post, onPostDeleted }: PostItemProps) => {
  const user = useAuthStore((state) => state.user);
  const initializeFromToken = useAuthStore((state) => state.initializeFromToken);

  useEffect(() => {
    if (!user) {
      initializeFromToken();
    }
  }, [user, initializeFromToken]);

  const userId = user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] as string | undefined;

  // Local state for like/unlike
  const [currentUserLiked, setLiked] = useState(post.currentUserLiked || false);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);

  const [openComments, setOpenComments] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [loadingComments, setLoadingComments] = useState<{
    [key: string]: boolean;
  }>({});
  const [openImage, setOpenImage] = useState<string | null>(null);

  const like = trpc.post.createPostLike.useMutation({
    onSuccess: (response) => {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    },
    onError: (error) => {
      console.error("Error liking post:", error);
    },
  });

  const unlike = trpc.post.deletePostLike.useMutation({
    onSuccess: (response) => {
      setLiked(false);
      setLikeCount((prev) => (prev > 0 ? prev - 1 : 0));
    },
    onError: (error) => {
      console.error("Error unliking post:", error);
    },
  });

  const handleLike = async(post: Post) => {
    if (!currentUserLiked) {
      const response= await postByParams(APIURLS.POST_LIKE, { postId: post.id });
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    } else {
     const response= await postByParams(APIURLS.POST_UNLIKE, {id:post.id} );
      setLiked(false);
      setLikeCount((prev) => (prev > 0 ? prev - 1 : 0));
    }
  };

  const handleOpenComment = (id: number) => {
    setOpenComments((prev) => ({ ...prev, [id]: !prev[id] }));
    if (!openComments[id]) {
      setLoadingComments((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setLoadingComments((prev) => ({ ...prev, [id]: false }));
      }, 1000);
    }
  };


  return (
    <div
      key={post.id}
      className="bg-white border-t border-r border-l border-gray-200"
    >
      <PostHeader post={post as any} onPostDeleted={onPostDeleted} />

      {post.title && (
        <div className="px-4 py-3 border-b border-gray-100 text-base text-gray-800 whitespace-pre-line">
          {post.title}
        </div>
      )}

      {post.postMedia && post.postMedia.length > 0 && (
        <div className="bg-transparent">
          {post.postMedia.length === 1 && post.postMedia[0]?.type === MEDIA_TYPES.AUDIO ? (
            <div className="flex items-center justify-center py-6 bg-white">
              <audio
                src={post.postMedia[0].mediaUrl}
                controls
                className="w-full max-w-md"
              />
            </div>
          ) : post.postMedia.length > 1 ? (
            <Carousel className="w-full" opts={{ loop: true }}>
              <CarouselContent>
                {post.postMedia.map((item, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-video relative flex items-center justify-center bg-black">
                      {item.type === MEDIA_TYPES.IMAGE && (
                        <Image
                          src={item.mediaUrl}
                          alt="Post media"
                          layout="fill"
                          objectFit="contain"
                          className="cursor-pointer"
                          onClick={() => setOpenImage(item.mediaUrl)}
                        />
                      )}
                      {item.type === MEDIA_TYPES.VIDEO && (
                        <video
                          src={item.mediaUrl}
                          controls
                          className="w-full h-full object-contain  bg-black"
                          style={{ maxHeight: "400px" }}
                          crossOrigin="anonymous"
                          preload="metadata"
                          onError={(e) => {
                            console.error('Video yüklenirken hata:', e);
                            console.error('Video URL:', item.mediaUrl);
                          }}
                        >
                          Video oynatılamıyor. Tarayıcınız bu formatı desteklemiyor olabilir.
                        </video>
                      )}
                      {item.type === MEDIA_TYPES.AUDIO && (
                        <div className="flex items-center justify-center w-full h-full">
                          <audio
                            src={item.mediaUrl}
                            controls
                            className="w-full max-w-md"
                          />
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          ) : (
            post.postMedia?.length > 0 && (
              <div className="aspect-video relative flex items-center justify-center bg-transparent">
                {post.postMedia?.[0]?.type === MEDIA_TYPES.IMAGE && (
                  <Image
                    src={post.postMedia?.[0]?.mediaUrl || ''}
                    alt="Post media"
                    layout="fill"
                    objectFit="contain"
                    className="cursor-pointer"
                    onClick={() => setOpenImage(post.postMedia?.[0]?.mediaUrl || null)}
                  />
                )}
                {post.postMedia?.[0]?.type === MEDIA_TYPES.VIDEO && (
                  <video
                    src={post.postMedia?.[0]?.mediaUrl || ''}
                    controls
                    className="w-full h-full object-contain  bg-black"
                    style={{ maxHeight: "400px" }}
                    crossOrigin="anonymous"
                    preload="metadata"
                    onError={(e) => {
                      console.error('Video yüklenirken hata:', e);
                      console.error('Video URL:', post.postMedia?.[0]?.mediaUrl);
                    }}
                  >
                    Video oynatılamıyor. Tarayıcınız bu formatı desteklemiyor olabilir.
                  </video>
                )}
                {post.postMedia?.[0]?.type === MEDIA_TYPES.AUDIO && (
                  <div className="flex items-center justify-center py-6 bg-white w-full">
                    <audio
                      src={post.postMedia?.[0]?.mediaUrl || ''}
                      controls
                      className="w-full max-w-md"
                    />
                  </div>
                )}
              </div>
            )
          )}
        </div>
      )}

      {/*  {post.poll && (
        <Poll options={post.poll.options} totalVotes={post.poll.totalVotes} />
      )}*/}
      <div className="px-4 py-3 border-t border-gray-100 text-sm">
        <PostActions
          post={{ ...post, currentUserLiked, likeCount }}
          likes={likeCount}
          handleLike={handleLike}
          handleOpenComment={handleOpenComment}
        />
      </div>
      <PostComments
        openComments={openComments}
        loadingComments={loadingComments}
        post={post}
      />
      <Dialog open={!!openImage} onOpenChange={() => setOpenImage(null)}>
        <DialogContent className="flex items-center justify-center max-w-3xl backdrop-blur-md bg-black/60">
          {openImage && (
            <img src={openImage} alt="Full Image" className="max-h-[80vh] max-w-full object-contain" />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostItem;