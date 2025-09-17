import { AnimatePresence, motion } from "framer-motion";
import AvatarProfile from "@/components/custom/avatar-profile";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { feedPosts } from "@/lib/mockData";
import { Pencil, Trash2, Send, SendHorizonal, Check, X } from "lucide-react";
import { Post } from "@/lib/types";
import { toast } from "sonner";
import { use, useEffect, useState } from "react";
import { deleteById, getByParams, postByParams, updateByParams } from "@/app/[lang]/helpers/httpEntity.service";
import { APIURLS } from "@/app/[lang]/helpers/APIURLS";
import { useAuthStore } from "@/store/auth-store";

interface PostCommentsProps {
  openComments: { [key: string]: boolean };
  loadingComments: { [key: string]: boolean };
  post: Post;
}

const PostComments = ({
  openComments,
  loadingComments,
  post,
}: PostCommentsProps) => {
  const [comment, setComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  type CommentType = {
    id: number;
    postId: number;
    userId: number;
    comments: string;
    creationDate: string;
    isActive: boolean;
    user?: {
      userName?: string;
      displayName?: string;
      profilePictureUrl?: string;
      avatar?: string;
      name?: string;
    };
  };
  const [comments, setComments] = useState<CommentType[]>([]);

  const handleSend = async () => {
    if (comment.trim() !== "") {
      try {
        const response = await postByParams(APIURLS.POST_COMMENT, {
          postId: post.id,
          comments: comment,
          isActive: true
        });
        if (response.success) {
          setComment("");
          toast.success("Yorum gönderildi.");
          getComments();
        }
      } catch (exx) {
        toast.error("Yorum gönderilirken bir hata oluştu.");
        console.error("Error sending comment:", exx);
      }
    }
  };

  const getComments = async () => {
    try {
      const response = await getByParams(APIURLS.POST_COMMENT, { postId: post.id });
      if (response.success && Array.isArray(response.data)) {
        setComments(response.data);
      } else {
        setComments([]);
      }
    } catch (exx) {
      setComments([]);
      console.error("Error fetching comments:", exx);
    }
  };

  useEffect(() => {
    getComments();
  }, [post.id]);

  const startEditing = (commentId: number, currentText: string) => {
    setEditingCommentId(commentId);
    setEditingText(currentText);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditingText("");
  };
  const user = useAuthStore((state) => state.user);
  const userId = user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] as string | 0;
  const handleUpdate = async (comment: CommentType) => {
    if (editingText.trim() !== "") {
      try {
        const response = await updateByParams(APIURLS.POST_COMMENT, {
          id: comment.id,
          comments: editingText,
          isActive: true,
          creationDate: comment.creationDate,
          userId: comment.userId,
          postId: comment.postId
        });
        if (response.success) {
          setEditingCommentId(null);
          setEditingText("");
          toast.success("Yorum güncellendi.");
          getComments();
        }
      } catch (exx) {
        toast.error("Yorum güncellenirken bir hata oluştu.");
        console.error("Error updating comment:", exx);
      }
    }
  };

  const handleDelete = async (commentId: number) => {
    try {
      const response = await deleteById(APIURLS.POST_COMMENT, commentId);
      if (response.success) {
        toast.success("Yorum silindi.");
        getComments();
      }
    } catch (exx) {
      toast.error("Yorum silinirken bir hata oluştu.");
      console.error("Error deleting comment:", exx);
    }
  };

  return (
    <AnimatePresence>
      {openComments[post.id] && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="px-4 pb-4 pt-2"
        >
          {loadingComments[post.id] ? (
            <div className="flex flex-col gap-3 mt-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div className="flex-1 flex flex-col gap-2">
                    <Skeleton className="h-3 w-1/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="w-6 h-6 rounded" />
                  <Skeleton className="w-6 h-6 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3 mt-2">
              {comments.map((c) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-start gap-3"
                >
                  <AvatarProfile
                    image={c.user?.profilePictureUrl || c.user?.avatar || ""}
                    name={c.user?.displayName || c.user?.userName || ""}
                    size="sm"
                  />
                  <div className="flex-1">
                    <span className="font-semibold text-sm">
                      {c.user?.displayName || c.user?.userName || ""}
                    </span>
                    <span className="ml-2 text-xs text-gray-400">
                      {new Date(c.creationDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>

                    {editingCommentId === c.id ? (
                      <div className="mt-2">
                        <input
                          className="w-full rounded border border-gray-200 px-3 py-1 text-sm focus:outline-none focus:border-[#cb0c9f]"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleUpdate(c);
                            if (e.key === "Escape") cancelEditing();
                          }}
                        />
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleUpdate(c)}
                            className="text-green-600 hover:text-green-700 h-6 px-2"
                          >
                            <Check className="size-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={cancelEditing}
                            className="text-gray-600 hover:text-gray-700 h-6 px-2"
                          >
                            <X className="size-3" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="text-gray-700 text-sm mt-0.5">
                          {c.comments}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                          <span className="cursor-pointer">Reply</span>
                        </div>
                      </>
                    )}
                  </div>

                  {(editingCommentId  !== c.id && userId==c.userId) && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-[#cb0c9f] transition"
                        onClick={() => startEditing(c.id, c.comments)}
                      >
                        <Pencil className="size-4 opacity-70" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-red-400 transition"
                        onClick={() => handleDelete(c.id)}
                      >
                        <Trash2 className="size-4 opacity-70" />
                      </Button>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 mt-4">
            <AvatarProfile
              name={post.userDisplayName}
              size="sm"
            />
            <input
              className="flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-[#cb0c9f]"
              placeholder="Write a message.."
              value={comment}
              onChange={e => setComment(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
            />
            <Button
              size="icon"
              className="rounded-full bg-gradient-to-tr from-[#7928ca] to-[#ff0080] text-white transition"
              onClick={handleSend}
            >
              <SendHorizonal className="size-3.5" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PostComments;