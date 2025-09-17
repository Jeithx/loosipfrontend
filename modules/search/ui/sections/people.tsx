"use client";
import { peopleList } from "@/lib/mockData";
import { motion } from "framer-motion";
import { useMemo } from "react";

const People = () => {
  const users = useMemo(() => {
    const arr = [...peopleList];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, 10);
  }, []);
  return (
    <div className="flex flex-col gap-6">
      {users.map((user, idx) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05, type: "spring", stiffness: 60 }}
          className="flex items-center justify-between bg-white px-4 py-2 border-b border-gray-100"
        >
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-14 h-14 rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-gray-800 leading-tight">
                {user.name}
              </span>
              <span className="text-gray-500 text-base">@{user.username}</span>
              <span className="text-gray-500 text-base">
                {user.description}
              </span>
            </div>
          </div>
          <button className="border border-pink-500 text-sm text-pink-600 font-bold px-4 py-1.5 rounded-full hover:bg-pink-50 transition-colors cursor-pointer">
            View
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default People;
