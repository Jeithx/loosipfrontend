"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface ListProps {
  lists: {
    key: string;
    title: string;
    people: number;
    posts: number;
    avatars: string[];
  }[];
}

const List = ({ lists }: ListProps) => {
  return (
    <div className="flex flex-col divide-y px-4 divide-gray-100">
      <AnimatePresence>
        {lists.map((list, idx) => (
          <motion.div
            key={list.key}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4, delay: idx * 0.06, ease: "easeOut" }}
            className="flex items-center justify-between py-5 px-2 sm:px-0"
          >
            <div>
              <div className="text-base font-medium text-slate-800 mb-0.5">
                {list.title}
              </div>
              <div className="text-sm text-gray-500">
                {list.people} people - {list.posts} posts
              </div>
            </div>
            {list.avatars.length > 0 && (
              <div className="flex -space-x-3">
                {list.avatars.slice(0, 3).map((src, i) => (
                  <span
                    key={src}
                    className="inline-block w-9 h-9 rounded-full border-2 border-white shadow-sm overflow-hidden"
                    style={{ zIndex: 10 - i }}
                  >
                    <Image
                      src={src}
                      alt="avatar"
                      width={36}
                      height={36}
                      className="object-cover w-full h-full"
                    />
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default List;