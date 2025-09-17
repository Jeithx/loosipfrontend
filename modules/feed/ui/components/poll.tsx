"use client";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

interface PollOption {
  text: string;
  votes: number;
  percentage: number;
}

interface PollProps {
  options: PollOption[];
  totalVotes: number;
}

const Poll = ({ options, totalVotes }: PollProps) => {
  return (
    <div className="my-4 px-4 space-y-2">
      {options.map((option, index) => (
        <div
          key={index}
          className="relative border border-slate-200 rounded-lg p-3 text-slate-700 cursor-pointer hover:bg-slate-50 transition-colors"
        >
          <motion.div
            className="absolute top-0 left-0 h-full bg-slate-100 rounded-lg z-0"
            initial={{ width: 0 }}
            animate={{ width: `${option.percentage}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          <div className="relative flex justify-between z-10">
            <span className="font-medium">{option.text}</span>
            <span className="font-semibold text-slate-500">
              {option.percentage}%
            </span>
          </div>
        </div>
      ))}
      <div className="text-sm text-slate-500 pt-2 flex items-center gap-2">
        <BarChart3 className="w-4 h-4" />
        <span>
          Poll • {totalVotes} Vote{totalVotes !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
};

export default Poll; 