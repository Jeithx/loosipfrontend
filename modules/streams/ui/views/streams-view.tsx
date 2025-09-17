"use client";
import { PlusIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StreamItem from "../components/stream-item";
import NewStreamModal from "@/components/custom/modals/new-stream-modal";

const streamList = new Array(10).fill(0);

const StreamsView = () => {
  return (
    <motion.div
      className="flex flex-col gap-0 h-full border-l border-r border-gray-200 bg-white"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white/70">
        <span className="text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
          Streams
        </span>
        <NewStreamModal>
          <motion.button className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-sm  transition-all">
            <PlusIcon className="size-5 mr-1" /> New Stream
            <span className="w-2 h-2 bg-white/80 rounded-full ml-2 animate-pulse" />
          </motion.button>
        </NewStreamModal>
      </div>
      <div className="p-6 w-full flex flex-col gap-7">
        <motion.div
          className="border border-gray-200 rounded-lg p-4 flex flex-col items-center gap-2 shadow-none"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex flex-col items-start w-full"
          >
            <span className="text-lg font-semibold text-gray-700">
              Active streams
            </span>
            <span className="text-sm text-gray-500 text-center">
              There are no active streams. Click the button above to start a new
              one.
            </span>
          </motion.div>
        </motion.div>
        <motion.div
          className="border border-gray-200 rounded-lg p-4 flex flex-col items-start gap-6"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
        >
          <span className="font-semibold text-lg text-gray-700 mb-2">
            Previous streams
          </span>
          <div className="flex flex-col gap-4 items-start w-full">
            <AnimatePresence>
              {streamList.map((_, index) => (
                <StreamItem key={index} index={index} />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StreamsView;
