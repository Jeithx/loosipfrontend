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
import { Calendar as CalendarIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { UseFormSetValue } from "react-hook-form";
import { PostFormType } from "@/lib/types";

const MotionButton = motion(Button);

interface PostSchedulingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setValue: UseFormSetValue<PostFormType>
  value?: { releaseDate?: Date; expireDate?: Date };
}

const DateTimePicker = ({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}) => {
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) {
      setDate(undefined);
      return;
    }

    const newDate = date ? new Date(date) : new Date();

    newDate.setFullYear(selectedDate.getFullYear());
    newDate.setMonth(selectedDate.getMonth());
    newDate.setDate(selectedDate.getDate());

    setDate(newDate);
  };

  const handleTimeChange = (part: "hours" | "minutes", value: string) => {
    const newDate = date ? new Date(date) : new Date();
    const numericValue = parseInt(value, 10);
    if (isNaN(numericValue)) return;

    if (part === "hours" && numericValue >= 0 && numericValue < 24) {
      newDate.setHours(numericValue);
    } else if (part === "minutes" && numericValue >= 0 && numericValue < 60) {
      newDate.setMinutes(numericValue);
    }
    setDate(newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal border-slate-200",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd.MM.yyyy HH:mm") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
        <div className="p-3 border-t border-border max-w-[250px]">
          <div className="flex items-end gap-2">
            <div className="grid gap-1.5 flex-1">
              <Label htmlFor="hours" className="text-xs font-normal">
                Hours
              </Label>
              <Input
                id="hours"
                type="number"
                value={date ? format(date, "HH") : ""}
                onChange={(e) => handleTimeChange("hours", e.target.value)}
                className="flex-1 h-9"
              />
            </div>
            <div className="grid gap-1.5 flex-1">
              <Label htmlFor="minutes" className="text-xs font-normal">
                Minutes
              </Label>
              <Input
                id="minutes"
                type="number"
                value={date ? format(date, "mm") : ""}
                onChange={(e) => handleTimeChange("minutes", e.target.value)}
                className="flex-1 h-9"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const PostSchedulingModal = ({
  open,
  onOpenChange,
  setValue,
  value,
}: PostSchedulingModalProps) => {
  const [releaseDate, setReleaseDate] = useState<Date | undefined>();
  const [expireDate, setExpireDate] = useState<Date | undefined>();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReleaseDate(value?.releaseDate);
    setExpireDate(value?.expireDate);
  }, [value, open]);

  const handleClear = () => {
    setReleaseDate(undefined);
    setExpireDate(undefined);
  };

  const handleSave = () => {
    setValue(
      "scheduling",
      { releaseDate, expireDate },
      { shouldValidate: true }
    );
    onOpenChange(false);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
        duration: 0.4,
      },
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
                  Post scheduling
                </DialogTitle>
              </DialogHeader>

              <div className="px-6 pb-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="releaseDate" className="text-slate-600">
                    Post release date
                  </Label>
                  <DateTimePicker date={releaseDate} setDate={setReleaseDate} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expireDate" className="text-slate-600">
                    Post expire date
                  </Label>
                  <DateTimePicker date={expireDate} setDate={setExpireDate} />
                </div>
                <p className="text-sm text-slate-500 pt-2">
                  Scheduling takes place on server time, UTC.
                </p>
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

export default PostSchedulingModal;