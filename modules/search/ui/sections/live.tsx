"use client";
import { liveStreams } from "@/lib/mockData";
import { motion } from "framer-motion";
import { useMemo } from "react";
import moment from "moment";
import { Icons } from "@/components/icons";

const Live = () => {
  const streams = useMemo(() => {
    const arr = [...liveStreams];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, 3);
  }, []);
  return (
    <div className="flex flex-col gap-4 p-4">
      {streams.map((stream, i) => (
        <motion.div
          key={stream.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
          className="flex items-center bg-white rounded-xl border border-gray-200 px-4 py-3 shadow-sm hover:shadow-md transition group"
        >
          <img
            src={stream.thumbnail}
            alt={stream.title}
            className="w-14 h-14 rounded-md object-cover border border-gray-100 bg-gray-50"
          />
          <div className="flex-1 min-w-0 ml-4">
            <div className="flex items-center gap-2">
              <span className="font-medium text-lg truncate text-gray-900">
                {stream.title}
              </span>
            </div>
            <div className="text-gray-500 text-sm mt-0.5 truncate">
              Started streaming {moment(stream.startedAt).fromNow(true)} ago , by {stream.user.displayName}
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <span className={`px-2 py-1 rounded-md text-xs font-semibold ${stream.isFree ? "bg-green-400/90 text-white" : "bg-pink-100 text-pink-600"}`}>
              {stream.isFree ? "Free" : "Paid"}
            </span>
            <motion.span
              className="ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-pink-50"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            >
              <Icons.eye className="size-5 text-pink-500" />
            </motion.span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Live;