// First, create the interface for the user data
interface User {
  id: number;
  genderId: number;
  userName: string;
  email: string;
  userTypeId: number;
  displayName: string;
  phoneNumber: string;
  birthDate: string;
  cityId: number;
  countryId: number;
  creationDate: string;
  isActive: boolean;
  lastLoginAt: string;
  prefferedLanguageId: number;
  status: number;
}

"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CustomCombobox from "@/components/custom/form-elements/custom-combobox";
import InputElement from "@/components/custom/form-elements/input";
import AvatarProfile from "@/components/custom/avatar-profile";
import { Send, Users, MessageCircle, ArrowLeft, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { APIURLS } from "@/app/[lang]/helpers/APIURLS";
import { get, getByParams } from "@/app/[lang]/helpers/httpEntity.service";

const messageSchema = z.object({
  message: z.string().min(1, "Type a message..."),
});

type MessageForm = z.infer<typeof messageSchema>;

interface CreateNewChatProps {
  onBack?: () => void;
  onStartChat?: (userId: string, message: string) => void;
}

const CreateNewChat = ({ onBack, onStartChat }: CreateNewChatProps) => {
  const { t } = useTranslation();
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [userCount, setUserCount] = useState(0);
  const [pageSize] = useState(10);

  const form = useForm<MessageForm>({
    resolver: zodResolver(messageSchema),
    defaultValues: { message: "" },
  });

  const selectedUserData = users.find(user => user.id.toString() === selectedUser);

  // Calculate total pages
  const totalPages = Math.ceil(userCount / pageSize);

  const handleStartChat = form.handleSubmit((data) => {
    if (selectedUser && data.message) {
      setIsChatStarted(true);
      onStartChat?.(selectedUser, data.message);
    }
  });

  const comboboxOptions = users.map(user => ({
    value: user.id.toString(),
    label: `${user.displayName} (@${user.userName})`,
  }));

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" as const }
    },
  };

  const getUsers = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await getByParams(APIURLS.USER_GET_CONTENT_CREATOR, {
        pagesize: pageSize,
        pageNumber: page
      });
      setUserCount(response.recordTotals || 0);
      setUsers(response.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== pageNumber) {
      setPageNumber(newPage);
      setSelectedUser(""); // Clear selection when changing pages
      getUsers(newPage);
    }
  };

  const handlePrevPage = () => {
    handlePageChange(pageNumber - 1);
  };

  const handleNextPage = () => {
    handlePageChange(pageNumber + 1);
  };

  useEffect(() => {
    getUsers(1);
  }, []);

  const isUserOnline = (lastLoginAt: string) => {
    const lastLogin = new Date(lastLoginAt);
    const now = new Date();
    const timeDiff = now.getTime() - lastLogin.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);
    return hoursDiff < 1;
  };

  return (
    <motion.div
      className="w-full h-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="shadow-none border-l-0 border-r rounded-none h-full border-gray-200 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="p-2 hover:bg-pink-50 text-pink-600"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  {t('chats.newMessage')}
                </CardTitle>
                <p className="text-sm text-gray-500">
                  {t('chats.startConversation')}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <motion.div variants={cardVariants}>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                {t('chats.selectUser')}
              </label>
              {userCount > 0 && (
                <span className="text-xs text-gray-500">
                  {userCount} {t('common.users')} {t('common.total')}
                </span>
              )}
            </div>
            <CustomCombobox
              value={selectedUser}
              onChange={setSelectedUser}
              options={comboboxOptions}
              placeholder={loading ? "Loading users..." : t('chats.searchUser')}
              searchPlaceholder={t('chats.searchUsers')}
              className="w-full"
            />
          </motion.div>

          {userCount > pageSize && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {t('common.page')} {pageNumber} {t('common.of')} {totalPages}
                </span>
                <span className="text-xs text-gray-500">
                  ({((pageNumber - 1) * pageSize) + 1}-{Math.min(pageNumber * pageSize, userCount)} {t('common.of')} {userCount})
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevPage}
                  disabled={pageNumber <= 1 || loading}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {totalPages <= 5 ? (
                  Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === pageNumber ? "default" : "ghost"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      disabled={loading}
                      className="h-8 w-8 p-0 text-xs"
                    >
                      {page}
                    </Button>
                  ))
                ) : (
                  <>
                    {pageNumber > 3 && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePageChange(1)}
                          disabled={loading}
                          className="h-8 w-8 p-0 text-xs"
                        >
                          1
                        </Button>
                        {pageNumber > 4 && <span className="text-xs text-gray-400">...</span>}
                      </>
                    )}
                    
                    {Array.from({ length: 3 }, (_, i) => {
                      const page = pageNumber - 1 + i;
                      if (page >= 1 && page <= totalPages) {
                        return (
                          <Button
                            key={page}
                            variant={page === pageNumber ? "default" : "ghost"}
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            disabled={loading}
                            className="h-8 w-8 p-0 text-xs"
                          >
                            {page}
                          </Button>
                        );
                      }
                      return null;
                    })}
                    
                    {pageNumber < totalPages - 2 && (
                      <>
                        {pageNumber < totalPages - 3 && <span className="text-xs text-gray-400">...</span>}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePageChange(totalPages)}
                          disabled={loading}
                          className="h-8 w-8 p-0 text-xs"
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}
                  </>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={pageNumber >= totalPages || loading}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {selectedUser && selectedUserData && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <Separator className="my-4" />

                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100">
                  <AvatarProfile
                    image={undefined} 
                    name={selectedUserData.displayName}
                    size="lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-800">
                        {selectedUserData.displayName}
                      </h3>
                      <div className={`w-2 h-2 rounded-full ${
                        isUserOnline(selectedUserData.lastLoginAt) 
                          ? 'bg-green-500' 
                          : 'bg-gray-400'
                      }`} />
                    </div>
                    <p className="text-sm text-gray-500">
                      @{selectedUserData.userName}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {isUserOnline(selectedUserData.lastLoginAt) 
                        ? t('common.onlineNow') 
                        : `${t('common.lastSeenRecently')} ${new Date(selectedUserData.lastLoginAt).toLocaleDateString()}`
                      }
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {selectedUser && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="space-y-4"
              >
                <Separator />

                <Form {...form}>
                  <form onSubmit={handleStartChat} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('chats.yourMessage')}
                      </label>
                      <InputElement
                        form={form}
                        name="message"
                        errorMsg={false}
                        placeholder={t('chats.type')}
                        className="h-12 shadow-none rounded-xl bg-gray-50 px-4 border border-gray-200 focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
                      />
                    </div>

                    <motion.div
                      className="flex gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r flex items-center justify-center from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-none transition-all duration-200 disabled:opacity-50"
                      >
                        {loading ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4 mr-2" />
                        )}
                        {t('chats.send')}
                      </button>
                    </motion.div>
                  </form>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>

          {!selectedUser && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="p-4 bg-gray-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                {loading ? (
                  <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
                ) : (
                  <Users className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <p className="text-gray-500 text-sm">
                {loading ? "Loading users..." : t('chats.selectAUser')}
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CreateNewChat;