"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UseFormSetValue } from "react-hook-form";
import { PostFormType } from "@/lib/types";

const MotionButton = motion(Button);

interface PollModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setValue: UseFormSetValue<PostFormType>
  value?: { options: string[] };
}

const PoolModal = ({ open, onOpenChange, setValue, value }: PollModalProps) => {
  const [options, setOptions] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
  ]);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value && value.options) {
      setOptions(
        value.options.map((v, i) => ({ id: i + 1, value: v }))
      );
    } else {
      setOptions([
        { id: 1, value: "" },
        { id: 2, value: "" },
      ]);
    }
  }, [value, open]);

  const handleOptionChange = (id: number, value: string) => {
    setOptions(options.map((opt) => (opt.id === id ? { ...opt, value } : opt)));
  };

  const addOption = () => {
    setOptions([...options, { id: Date.now(), value: "" }]);
  };

  const removeOption = (id: number) => {
    if (options.length > 2) {
      setOptions(options.filter((opt) => opt.id !== id));
    }
  };

  const handleClear = () => {
    setOptions([
      { id: 1, value: "" },
      { id: 2, value: "" },
    ]);
  };

  const handleSave = () => {
    const pollOptions = options.map((opt) => opt.value).filter((v) => v.trim().length > 0);
    setValue("poll", { options: pollOptions }, { shouldValidate: true });
    onOpenChange(false);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 25, duration: 0.4 },
    },
    exit: { opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent
            className="max-w-md rounded-2xl p-0 bg-gradient-to-br from-white via-white to-slate-50 backdrop-blur-xl border-0 shadow-2xl overflow-hidden"
            ref={modalRef}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative"
            >
              <DialogHeader className="relative p-6 pb-4">
                <DialogTitle className="text-2xl font-light text-slate-800">
                  Create a poll
                </DialogTitle>
              </DialogHeader>
              <div className="px-6 pb-6 overflow-y-auto max-h-[500px] scrollbar-hide">
                <p className="text-slate-500 text-base mb-6">
                  Add a few questions to your poll.
                </p>
                <div className="space-y-3 mb-6">
                  <AnimatePresence>
                    {options.map((option, index) => (
                      <motion.div
                        key={option.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                        className="flex items-center gap-2"
                      >
                        <Input
                          type="text"
                          value={option.value}
                          onChange={(e) => handleOptionChange(option.id, e.target.value)}
                          placeholder="Enter a poll question"
                          className="flex-1"
                        />
                        {options.length > 2 && (
                          <MotionButton
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeOption(option.id)}
                            className="text-slate-400 hover:text-slate-600"
                            whileTap={{ scale: 0.9 }}
                          >
                            <X className="w-4 h-4" />
                          </MotionButton>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <MotionButton
                  type="button"
                  variant="ghost"
                  onClick={addOption}
                  className="text-pink-600 hover:text-pink-700 font-semibold text-base p-0 h-auto"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add another option
                </MotionButton>
              </div>

              <div className="flex justify-end items-center gap-4 px-6 py-4 border-t border-slate-100 bg-slate-50/60">
                <MotionButton
                  type="button"
                  variant="ghost"
                  className="rounded-xl px-6 py-2 font-medium text-base text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                  onClick={handleClear}
                >
                  Clear
                </MotionButton>
                <MotionButton
                  type="button"
                  className="rounded-xl px-6 py-2 font-semibold text-base bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white shadow-md shadow-fuchsia-500/20 hover:shadow-lg hover:shadow-fuchsia-500/30"
                  onClick={handleSave}
                >
                  Save
                </MotionButton>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default PoolModal;