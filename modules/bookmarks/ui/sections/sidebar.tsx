"use client";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useQueryState } from "nuqs";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";

const BookmarksSidebar = () => {
  const menu = useMemo(
    () => [
      {
        key: "all",
        label: "bookmarksPage.all",
        icon: Icons.bookmarks_all,
        tab: "all",
      },
      {
        key: "photos",
        label: "bookmarksPage.photos",
        icon: Icons.photos,
        tab: "photos",
      },
      {
        key: "videos",
        label: "bookmarksPage.videos",
        icon: Icons.videos,
        tab: "videos",
      },
      {
        key: "audio",
        label: "bookmarksPage.audio",
        icon: Icons.audio,
        tab: "audio",
      },
      {
        key: "locked",
        label: "bookmarksPage.locked",
        icon: Icons.locked,
        tab: "locked",
      },
    ],
    []
  );

  const [tab, setTab] = useQueryState("tab", {
    defaultValue: "all",
  });
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
      className="flex flex-col w-72 h-full min-h-screen bg-white border-r border-gray-200 rounded-r-3xl overflow-hidden"
    >
      <div className="py-5 px-6">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Bookmarks</h2>
      </div>
      <Separator className="w-full" />
      <div className="flex flex-col w-full items-start mt-2">
        {menu.map((item) => (
          <motion.div
            whileHover={{ scale: 1.03, backgroundColor: "#f3f4f6" }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "py-3 px-5 border-b border-gray-100 flex items-center justify-between w-full cursor-pointer transition-all duration-200 group",
              tab === item.tab && "bg-primary/10 border-primary/30"
            )}
            onClick={() => setTab(item.key)}
            key={item.tab}
            style={{ boxShadow: undefined }}
          >
            <div className="flex items-center gap-3">
              <item.icon className={cn("w-5 h-5", tab === item.tab ? "text-primary" : "text-gray-500 group-hover:text-primary transition-colors")} />
              <span className={cn("text-base font-medium", tab === item.tab ? "text-primary" : "text-gray-700 group-hover:text-primary transition-colors")}>{t(item.label)}</span>
            </div>
            <ChevronRight
              className={cn(
                "w-4 h-4 transition-colors",
                tab === item.tab ? "text-primary" : "text-gray-400 group-hover:text-primary"
              )}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BookmarksSidebar;
