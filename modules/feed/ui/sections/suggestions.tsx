"use client";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tag, RefreshCw } from "lucide-react";
import { suggestions } from "@/lib/mockData";
import { motion, AnimatePresence } from "framer-motion";

const Suggestions = () => {
  return (
    <div className="flex flex-col gap-6 min-w-72">
      <div className="px-1 pt-1">
        <Input placeholder="Search" className="rounded-xl text-base shadow-none px-5 py-3 bg-gray-50 border border-gray-100 lg:border-gray-200 focus:border-[#cb0c9f] focus:ring-2 focus:ring-[#cb0c9f]/20 transition" />
      </div>
      {/* <Card className="lg:rounded-2xl p-0 overflow-visible bg-white/90 shadow-none border-none">
        <div className="flex items-center justify-between px-5 pt-5 pb-2">
          <span className="font-semibold text-gray-600 text-base tracking-wide">Suggestions</span>
          <div className="flex items-center gap-2">
            <Tag className="size-5 text-gray-400" />
            <RefreshCw className="size-5 text-gray-400" />
          </div>
        </div>
        <div className="flex flex-col gap-4 px-3 pb-4">
          <AnimatePresence>
            {suggestions.map((user, i) => (
              <motion.div
                key={user.username}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`relative rounded-xl overflow-hidden bg-gray-50 transition-all duration-200 group ${i === 2 ? "opacity-70" : "hover:shadow-lg hover:-translate-y-1"}`}
                style={{ minHeight: 110 }}
              >
                <img
                  src={user.bg}
                  alt="bg"
                  className={`absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-gray-900/60 to-gray-900/10 group-hover:from-gray-900/70`} />
                <div className="absolute bottom-3 left-3 z-10">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-md bg-white"
                  />
                </div>
                <div className="relative flex flex-col justify-end h-full min-h-[110px] pl-24 pb-3">
                  <span className="text-white text-lg font-semibold drop-shadow-sm group-hover:text-gray-100 transition">
                    {user.name}
                  </span>
                  <span className="text-white/80 text-base drop-shadow-sm group-hover:text-gray-200 transition">
                    @{user.username}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-center gap-1 pb-3">
          <span className="w-2 h-2 bg-gray-600 rounded-full opacity-80" />
          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full opacity-70" />
        </div>
      </Card>
      <div className="flex items-center justify-center gap-6 text-base pt-6 pb-2">
        <span className="cursor-pointer text-gray-400 hover:text-gray-600 transition">Help</span>
        <span className="cursor-pointer text-gray-400 hover:text-gray-600 transition">Privacy</span>
        <span className="cursor-pointer text-gray-400 hover:text-gray-600 transition">Terms</span>
      </div> */}
    </div>
  );
};

export default Suggestions;