"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { User } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const NotificationItem = ({ item }: { item: any }) => {
  return (
    <motion.div
      key={item.id}
      className="flex items-center p-4 border-b border-gray-200"
      variants={itemVariants}
    >
      <div className="flex-shrink-0 mr-4">
        {item.avatar ? (
          <Image
            src={item.avatar}
            alt={item.name}
            width={48}
            height={48}
            className="rounded-full object-cover w-12 h-12"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-6 h-6 text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex-grow">
        <p className="font-semibold text-gray-800">{item.name}</p>
        <p className="text-sm text-gray-600">{item.message}</p>
      </div>
      <div className="flex-shrink-0 text-gray-500 text-sm ml-4">
        {item.time}
      </div>
    </motion.div>
  );
};

export default NotificationItem;
