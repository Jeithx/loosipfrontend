"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Trash2Icon } from "lucide-react";

const StreamItem = ({ index }: { index: number }) => {
  return (
    <motion.div
      key={index}
      className="flex items-center gap-3 w-full justify-between rounded-xl bg-white border border-primary/20 px-4 py-3 hover:shadow-md transition-all group"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{
        delay: 0.08 * index,
        duration: 0.4,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.015,
      }}
    >
      <div className="flex items-center gap-3">
        <Image
          src="/assets/svgs/stream.svg"
          alt="stream"
          width={60}
          height={60}
          className="rounded-xl"
        />
        <div className="flex flex-col items-start gap-1">
          <span className="text-base font-semibold text-gray-800">
            Stream {index + 1}
          </span>
          <span className="text-xs text-gray-500">
            Created at: 23 Jun 25 • Length: 61 minutes.
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <motion.button
          className="bg-white text-primary font-semibold px-4 py-1.5 transition-all"
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.015 }}
        >
          View
        </motion.button>
        <motion.button
          className="bg-white text-red-500 font-semibold px-2.5 py-1.5 transition-all"
          whileTap={{ scale: 0.97 }}
        >
          <Trash2Icon className="size-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default StreamItem;
