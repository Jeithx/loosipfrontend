"use client";
import { AnimatePresence, motion } from "framer-motion";
import AvatarProfile from "@/components/custom/avatar-profile";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useState } from "react";

function MessageList({
  messages,
  currentUser,
  onDeleteMessage
}: {
  messages: any,
  currentUser: any,
  onDeleteMessage?: (messageId: number) => void
}) {
  const [hoveredMessage, setHoveredMessage] = useState<number | null>(null);
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-8 bg-gradient-to-b from-slate-50/80 to-white rounded-b-2xl">
      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        <AnimatePresence initial={false}>
          {messages.map((msg: any, i: number) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: i * 0.04 }}
              className={`flex ${msg.user.id === currentUser.id ? "justify-end" : "justify-start"
                }`}
              onMouseEnter={() => setHoveredMessage(msg.id)}
              onMouseLeave={() => setHoveredMessage(null)}
            >
              <div
                className={`flex items-end gap-3 max-w-[70%] relative ${msg.user.id === currentUser.id ? "flex-row-reverse" : ""
                  }`}
              >
                <AvatarProfile
                  name={msg.user.name}
                  image={msg.user.image}
                  size="sm"
                  className="mb-1"
                />
                <div className="relative group">
                  <div
                    className={`rounded-2xl px-5 py-3 text-sm transition-all duration-200 ${msg.user.id === currentUser.id
                        ? "bg-white border border-primary/30 text-gray-800"
                        : "bg-white border border-slate-200 text-gray-800"
                      }`}
                  >
                    {msg.type === "file" && msg.fileUrl && (
                      <div className="mb-2">
                        {(() => {
                          const fileExtension = msg.fileUrl.split('.').pop()?.toLowerCase();
                          const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'];
                          const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'];

                          if (imageExtensions.includes(fileExtension)) {
                            return (
                              <img
                                src={msg.fileUrl}
                                alt="Sent image"
                                className="max-w-full h-auto rounded-lg shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                                style={{ maxWidth: "300px", maxHeight: "300px" }}
                                onClick={() => {
                                  window.open(msg.fileUrl, '_blank');
                                }}
                              />
                            );
                          } else if (videoExtensions.includes(fileExtension)) {
                            return (
                              <video
                                src={msg.fileUrl}
                                className="max-w-full h-auto rounded-lg shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                                style={{ maxWidth: "300px", maxHeight: "300px" }}
                                controls
                                onClick={() => {
                                  window.open(msg.fileUrl, '_blank');
                                }}
                              >
                                Tarayıcınız video etiketini desteklemiyor.
                              </video>
                            );
                          } else {
                            return (
                              <div
                                className="p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                                onClick={() => {
                                  window.open(msg.fileUrl, '_blank');
                                }}
                              >
                                <div className="text-center">
                                  <span className="text-gray-600">📎 Dosya: {msg.fileName || 'Bilinmeyen dosya'}</span>
                                </div>
                              </div>
                            );
                          }
                        })()}
                      </div>
                    )}
                    {msg.text && (
                      <div className="break-words">{msg.text}</div>
                    )}
                    <div className={cn(
                      "text-[10px] mt-2 text-gray-400",
                      msg.user.id === currentUser.id ? "text-right" : "text-left"
                    )}>
                      {msg.time}
                    </div>
                  </div>

                  {onDeleteMessage && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => onDeleteMessage(msg.id)}
                      className={`absolute -top-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors shadow-md ${msg.user.id === currentUser.id ? "-left-2" : "-right-2"
                        }`}
                      title="Delete message"
                    >
                      <X size={12} />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MessageList;