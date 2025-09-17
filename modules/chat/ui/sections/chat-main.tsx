"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import ChatHeader from "../components/chat-header";
import MessageList from "../components/messages-list";
import ChatInput from "../components/chat-input";
import { get, getByParams, postFormData } from "@/app/[lang]/helpers/httpEntity.service";
import { ApiError } from "next/dist/server/api-utils";
import { APIURLS } from "@/app/[lang]/helpers/APIURLS";

type User = {
  id: number;
  name: string;
  image: string;
  username?: string;
};

type Message = {
  id: number;
  user: User;
  text: string;
  time: string;
  type: string;
  isRead?: boolean;
  fileUrl?: string; // Added for image messages
};

const messageSchema = z.object({
  message: z.string().min(1, "Type a message..."),
  file: z.any().optional(),
});

type MessageForm = z.infer<typeof messageSchema>;

type ChatMainProps = {
  userId: number | string;
};

const ChatMain = ({ userId }: ChatMainProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [chatUser, setChatUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleSend = async (data: MessageForm) => {
    if (!currentUser) return;


    const formData = new FormData();
    formData.append('message1', data.message);
    formData.append('ReceiverId', chatUser?.id.toString() || '');
    formData.append('file', data.file);
    
    try {
       await postFormData(APIURLS.MESSAGE, formData);
      await getMessages();
      setTimeout(() => {
        getMessages();
      }, 500);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getUser = async () => {
    try {
      const response = await getByParams(APIURLS.USER_GETBYID, { id: userId });
      if (response.success && response.data && response.data.length > 0) {
        const userData = response.data[0];
        setChatUser({
          id: userData.id,
          name: userData.displayName,
          image: userData.profilePictureUrl,
          username: userData.userName,
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await get(APIURLS.USER);
      if (response.success && response.data && response.data.length > 0) {
        const userData = response.data[0];
        setCurrentUser({
          id: userData.id,
          name: userData.displayName,
          image: userData.profilePictureUrl,
          username: userData.userName,
        });
      }
    } catch (err) {
      console.error("Error fetching current user:", err);
    }
  };

  const getMessages = async () => {
    try {
      const response = await getByParams(APIURLS.MESSAGE, { userId: userId });
      if (response.success && response.data && response.data.length > 0) {
        const sortedMessages = response.data.sort((a: any, b: any) => 
          new Date(a.sendDate).getTime() - new Date(b.sendDate).getTime()
        );
        
        const messagesData = sortedMessages.map((msg: any) => {
          const isSender = msg.senderId === currentUser?.id;

          return {
            id: msg.id,
            user: isSender
              ? currentUser 
              : chatUser,    
            text: msg.message1,
            time: new Date(msg.sendDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            type: msg.fileUrl ? "file" : "text", // Check if there's a file URL
            isRead: msg.isRead,
            fileUrl: msg.fileUrl, // Include file URL for image messages
          };
        });

        setMessages(messagesData);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCurrentUser();
      await getUser();
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (currentUser && chatUser) {
      getMessages();
    }
  }, [currentUser, chatUser, userId]);

  if (loading || !currentUser || !chatUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col relative h-full border-r border-gray-200 w-full bg-white overflow-hidden"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
    >
      <ChatHeader user={chatUser} />
      <MessageList messages={messages} currentUser={currentUser} />
      <ChatInput onSend={handleSend} />
    </motion.div>
  );
};

export default ChatMain;