"use client";

import { motion, AnimatePresence } from "framer-motion";
import AvatarProfile from "@/components/custom/avatar-profile";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/hooks/use-translation";

interface ChatData {
  displayName: string;
  firstMessage: string;
  lastMessage: string;
  lastMessageContent: string;
  messageCount: number;
  receiverId: number;
  senderId: number;
  profilePictureUrl?: string;
}

interface ChatSidebarProps {
  onSelectChat: (chat: ChatData) => void;
  handleCreateNewChat: (open: boolean) => void;
  isCreatingNewChat: boolean;
  chats: ChatData[];
  loading: boolean;
}

const itemVariants = {
  initial: { opacity: 0, y: 16 },
  animate: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06 } }),
  hover: { scale: 1.03, backgroundColor: "#f3f4f6" },
  tap: { scale: 0.98 },
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  return `${days}d`;
};

const ChatSidebar = ({ 
  onSelectChat, 
  handleCreateNewChat, 
  isCreatingNewChat, 
  chats, 
  loading 
}: ChatSidebarProps) => {
  const { t } = useTranslation();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <motion.div
        className="flex flex-col w-72 border-r border-l border-gray-200 bg-white h-full shadow-sm"
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
      >
        <div className="flex items-center justify-between py-3 px-4">
          <span className="text-lg font-semibold text-gray-800">{t("chats.title")}</span>
          <button
            onClick={() => handleCreateNewChat(true)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <Icons.createChat className="size-5 text-pink-500" />
          </button>
        </div>
        <Separator className="w-full" />
        <div className="flex flex-col gap-1 p-2.5 overflow-y-auto">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex flex-col w-72 border-r border-l border-gray-200 bg-white h-full shadow-sm"
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
    >
      <div className="flex items-center justify-between py-3 px-4">
        <span className="text-lg font-semibold text-gray-800">{t("chats.title")}</span>
        <button
          onClick={() => handleCreateNewChat(true)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <Icons.createChat className="size-5 text-pink-500" />
        </button>
      </div>
      <Separator className="w-full" />
      <div className="flex flex-col gap-1 p-2.5 overflow-y-auto">
        <AnimatePresence>
          {chats.map((chat, i) => (
            <motion.button
              key={`${chat.senderId}-${chat.receiverId}-${i}`}
              className="group flex items-center gap-3 p-2 rounded-lg transition relative hover:bg-gray-100 focus:bg-gray-100 outline-none"
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              custom={i}
              variants={itemVariants}
              onClick={() => onSelectChat(chat)}
            >
              <div className="relative">
                {chat.profilePictureUrl ? (
                  <AvatarProfile
                    name={chat.displayName}
                    image={chat.profilePictureUrl}
                    size="sm"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                    {getInitials(chat.displayName)}
                  </div>
                )}
              </div>
              <div className="flex flex-col items-start flex-1 min-w-0">
                <span className="text-sm font-medium text-gray-800 truncate">
                  {chat.displayName}
                </span>
                <span className="text-xs text-gray-500 truncate max-w-[140px]">
                  {chat.lastMessageContent}
                </span>
              </div>
              <div className="flex flex-col items-end gap-1 min-w-[40px]">
                <span className="text-[11px] text-gray-400 font-medium">
                  {formatTime(chat.lastMessage)}
                </span>
               
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
        {chats.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <Icons.createChat className="size-12 mb-3 text-gray-300" />
            <p className="text-sm text-center">No chats yet</p>
            <p className="text-xs text-center mt-1">Start a new conversation</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatSidebar;