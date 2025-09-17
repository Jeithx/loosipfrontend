"use client";
import { motion } from "framer-motion";
import {
  BarChart,
  Bell,
  BellOff,
  CalendarClock,
  DollarSign,
  Image,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "@/hooks/use-translation";
import { Icons } from "@/components/icons";

interface FooterProps {
  onPhotoIconClick: () => void;
  isPending: boolean;
}

const ITEMS = [
  { icon: Image, label: "Photo", color: "text-green-600" },
  {
    icon: DollarSign,
    label: "Price",
    color: "text-yellow-600",
  },
  {
    icon: BarChart,
    label: "Poll",
    color: "text-purple-600",
  },
  {
    icon: Bell,
    label: "Notifications",
    color: "text-red-600",
  },
  {
    icon: CalendarClock,
    label: "Schedule",
    color: "text-blue-600",
  },
];

const Footer = ({ onPhotoIconClick, isPending }: FooterProps) => {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [notifications, setNotifications] = useState(true);
  const { watch } = useFormContext();
  const content: string = watch("content");
  const files = watch("files");
  return (
    <div className="px-6 md:px-8 py-4 border-t border-slate-100/70 bg-slate-50/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {ITEMS.map(({ icon: Icon, label, color }, i) => (
            <Tooltip key={i} delayDuration={0}>
              <TooltipTrigger asChild>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (label === "Photo") {
                      onPhotoIconClick();
                      return;
                    }
                    if (label === "Notifications") {
                      setNotifications(!notifications);
                      return;
                    }
                    setActiveModal(label.toLowerCase());
                  }}
                  className="group cursor-pointer relative p-2 hover:bg-white rounded-xl transition-all duration-200"
                  title={label}
                >
                  {label === "Notifications" ? (
                    <>
                      {notifications ? (
                        <Bell
                          className={`w-5 h-5 ${color} group-hover:scale-110 transition-transform duration-200`}
                        />
                      ) : (
                        <BellOff
                          className={`w-5 h-5 ${color} group-hover:scale-110 transition-transform duration-200`}
                        />
                      )}
                    </>
                  ) : (
                    <Icon
                      className={`w-5 h-5 ${color} group-hover:scale-110 transition-transform duration-200`}
                    />
                  )}
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm font-medium">
                  {label === "Notifications"
                    ? notifications
                      ? "On"
                      : "Off"
                    : label}
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {/* <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 text-sm font-medium transition-colors duration-200"
            type="button"
          >
            {t("createPost.saveDraft")}
          </motion.button> */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isPending || !content.trim()}
            className={`px-6 py-2.5 rounded-2xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              content.trim() && !isPending
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
            type="submit"
          >
            {isPending && <Icons.loading />}
            {t("createPost.share")}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
