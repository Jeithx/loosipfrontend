import { Heart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Post } from "@/lib/types";

interface PostActionsProps {
  post: Post;
  handleLike: (post: Post) => void;
  likes: number;
  handleOpenComment: (id: number) => void;
}

const PostActions = ({
  post,
  handleLike,
  likes,
  handleOpenComment,
}: PostActionsProps) => (
  <div className="flex items-center w-full justify-between">
    <div className="flex items-center gap-5">
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={() => handleLike(post)}
        className="flex items-center gap-1 group"
      >
        <motion.span
          animate={{
            scale: post.currentUserLiked ? 1.2 : 1,
            color: post.currentUserLiked ? "#cb0c9f" : "#aaa",
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="inline-flex"
        >
          <Heart
            fill={post.currentUserLiked ? "#cb0c9f" : "none"}
            strokeWidth={1.7}
            className="size-5"
          />
        </motion.span>
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={() => handleOpenComment(post.id)}
        className="flex items-center gap-1 group"
      >
        <MessageCircle className="size-5 text-gray-500 group-hover:text-[#cb0c9f] transition" />
      </motion.button>
    </div>
    <div className="flex items-center gap-4 text-gray-500">
      <span className="text-gray-600">{post?.likeCount || 0} like</span>
      <span
        onClick={() => handleOpenComment(post.id)}
        className="text-gray-600 cursor-pointer font-semibold"
      >
        {post?.commentCount || 0} comments
      </span>
      {/* <span className="text-gray-600">{post.tipCount || 0} tips</span> */}
    </div>
  </div>
);

export default PostActions;
