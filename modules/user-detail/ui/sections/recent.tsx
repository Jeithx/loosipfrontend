"use client";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";
import { Heart, MessageSquare } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 25,
    },
  },
};

const Recent = () => {
  const { t } = useTranslation();
  const recentPosts = [
    {
      src: "https://dplwsh2tkj4da.cloudfront.net/posts/images/3c7a7c31c1084c8bb25b1d01cd23d4c5.jpg",
      likes: 2451,
      comments: 172,
    },
    {
      src: "https://dplwsh2tkj4da.cloudfront.net/posts/images/8bd84f0324994f8abc777be55a75f918.jpg",
      likes: 2451,
      comments: 172,
    },
  ];

  return (
    <div className="max-w-[200px] pl-5 flex flex-col gap-2 w-full">
      <motion.h2
        className="text-xl font-semibold text-gray-700 mb-1.5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {t("userPosts.recent")}
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 gap-2 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {recentPosts.map((post, index) => (
          <motion.div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden shadow-md w-full h-20"
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <img
              src={post.src}
              alt={`Recent post ${index + 1}`}
              className="transition-transform duration-300 ease-in-out w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-4 text-white flex items-center justify-center gap-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 0 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span className="font-bold text-sm">{post.likes}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <span className="font-bold text-sm">{post.comments}</span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Recent;