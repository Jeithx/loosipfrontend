"use client";
import { assert } from "console";
import CreateNewChat from "../components/create-new-chat";
import NoChat from "../components/no-chat";
import ChatMain from "../sections/chat-main";
import ChatSidebar from "../sections/chat-sidebar";
import { useEffect, useState } from "react";
import { get, postByParams, postFormData } from "@/app/[lang]/helpers/httpEntity.service";
import { APIURLS } from "@/app/[lang]/helpers/APIURLS";
import { getTokenFromCookie } from "@/app/server/action";

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
const ChatView = () => {
  const [selectedChat, setSelectedChat] = useState<any | null>(null);
  const [isCreatingNewChat, setIsCreatingNewChat] = useState(false);
  const handleSelectChat = (chat: any) => {
    setIsCreatingNewChat(false);
    setSelectedChat(chat);
  };
  const handleCreateNewChat = (open: boolean) => {
    setIsCreatingNewChat(open)
  }
  const handleStartChat = async (userId: string, message: string) => {
    try {
      const formData = new FormData();
      formData.append('receiverId', userId);
      formData.append('message1', message);
      const response = await postFormData(APIURLS.MESSAGE, formData);
      setIsCreatingNewChat(false);
      setSelectedChat({ receiverId: userId, firstMessage: message });
      getChats();
    } catch (exx) {
      console.error("Error starting chat:", exx);
    }

  };
  const [chats, setChats] = useState<ChatData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(0);
  const getChats = async () => {
    try {
      setLoading(true);
      const response = await get(APIURLS.CHATS);
      if (response.success && response.data) {
        setChats(response.data);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoading(false);
    }
  };
  function parseJwt(token:any) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('JWT parsing error:', e);
    return null;
  }
}
const getToken=async()=>{
   const token = await getTokenFromCookie();
      const decodedToken = parseJwt(token);
   const userId = decodedToken?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    setCurrentUserId(userId);
    
}
  useEffect(() => {
    getChats();
   getToken();
  }, []);

  return (
    <div className="flex h-screen w-full">
      <ChatSidebar
        onSelectChat={handleSelectChat}
        isCreatingNewChat={isCreatingNewChat}
        handleCreateNewChat={handleCreateNewChat}
        chats={chats}
        loading={loading}
      />
      <div className="flex flex-col flex-1">
        {isCreatingNewChat ? <CreateNewChat onStartChat={handleStartChat} /> : selectedChat ? <ChatMain userId={
          currentUserId != selectedChat.receiverId ?selectedChat.receiverId:selectedChat.senderId} /> : <NoChat />}
      </div>
    </div>
  );
};

export default ChatView;
