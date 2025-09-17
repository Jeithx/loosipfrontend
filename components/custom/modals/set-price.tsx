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
import { Input } from "@/components/ui/input";
import { UseFormSetValue } from "react-hook-form";
import { PostFormType } from "@/lib/types";

const MotionButton = motion(Button);

interface SetPriceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setValue: UseFormSetValue<PostFormType>
  value?: string;
}

const SetPriceModal = ({ open, onOpenChange, setValue, value }: SetPriceModalProps) => {
  const [price, setPrice] = useState(value || "");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPrice(value || "");
  }, [value, open]);

  const handleOpenChange = (v: boolean) => {
    if (!v) onOpenChange(false);
  };

  const handleClear = () => setPrice("");
  const handleSave = () => {
    setValue("price", price, { shouldValidate: true });
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
        <Dialog open={open} onOpenChange={handleOpenChange}>
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
              <DialogHeader className="relative">
                <DialogTitle className="flex items-center gap-2 pt-8 pb-2 px-5 text-2xl font-light text-slate-800">
                  Set post price
                </DialogTitle>
              </DialogHeader>
              <div className="px-5 pb-2 pt-2">
                <p className="text-slate-500 text-base mb-6">
                  The PPV content is locked for subscribers as well.
                </p>
                <div className="mb-8">
                  <div className="flex items-center bg-slate-100 rounded-lg overflow-hidden border border-slate-200 focus-within:ring-2 focus-within:ring-blue-400">
                    <span className="flex items-center justify-center px-2 pl-4 text-slate-500 text-xl">
                      $
                    </span>
                    <Input
                      type="text"
                      value={price}
                      onChange={(e) =>
                        setPrice(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      className="h-auto flex-1 py-3 px-2 bg-transparent outline-none border-0 text-lg text-slate-700 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Set a price"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center gap-4 px-5 py-4 border-t border-slate-100 bg-slate-50/60">
                <MotionButton
                  type="button"
                  variant="ghost"
                  className="rounded-xl px-6 py-2 font-medium text-base text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleClear}
                >
                  Clear
                </MotionButton>
                <MotionButton
                  type="button"
                  className="rounded-xl px-6 py-2 font-semibold text-base bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white shadow-md shadow-fuchsia-500/20 hover:shadow-lg hover:shadow-fuchsia-500/30"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97, y: 0 }}
                  onClick={handleSave}
                >
                  Save
                </MotionButton>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
    </AnimatePresence>
  );
};

export default SetPriceModal;   