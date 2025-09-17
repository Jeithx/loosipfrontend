"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { pageUrls } from "@/lib/enums/page-urls";
import { motion } from "framer-motion";
import { Calendar, Globe, MapPin, Settings, Share2, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/hooks/use-translation";
import { use, useEffect, useState } from "react";
import { deleteById, get, getByParams, postByParams, postFormData } from "@/app/[lang]/helpers/httpEntity.service";
import { APIURLS } from "@/app/[lang]/helpers/APIURLS";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { set } from "date-fns";
import { Follower, Followed } from "@/lib/types";
import { getDecodedToken } from "@/app/server/action";

interface UserData {
  id: number;
  genderId: number;
  userName: string;
  email: string;
  userTypeId: number;
  birthDate: string;
  cityId: number;
  countryId: number;
  coverPictureUrl: string;
  creationDate: string;
  displayName: string;
  isActive: boolean;
  lastLoginAt: string;
  phoneNumber: string;
  prefferedLanguageId: number;
  profilePictureUrl: string;
  status: number;
  isFollowed: boolean;
  country: {
    name: string;
  }
  biography: string;
}

interface ParamsType {
  username: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const messageSchema = z.object({
  message: z.string().min(1, "Type a message..."),
});
type MessageForm = z.infer<typeof messageSchema>;

const UserInfo = () => {
  const params = useParams();
  const username = params?.username;
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useTranslation();
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followedCount, setFollowedCount] = useState(0);
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [followeds, setFolloweds] = useState<Followed[]>([]);
  const [openFollowersModal, setOpenFollowersModal] = useState(false);
  const [openFollowedsModal, setOpenFollowedsModal] = useState(false);
  const router = useRouter();
  const form = useForm<MessageForm>({
    resolver: zodResolver(messageSchema),
    defaultValues: { message: "" },
  });
  const [currentUserName, setDecodedName] = useState<string | null>(null);

  const getToken = async () => {
    const token = await getDecodedToken();
    console.log("Decoded Token:", token);
    // name değerini değişkene ata
    const name = (token as any)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    setDecodedName(name);
  };
  useEffect(() => {
    getToken();
  }, []);


  const handleSendMessage = form.handleSubmit(async (data) => {
    setSending(true);
    try {
      const formData = new FormData();
      formData.append("receiverId", String(user?.id));
      formData.append("message1", data.message);
      await postFormData(APIURLS.MESSAGE, formData);
      setOpenMessageModal(false);
      form.reset();
      router.push("/messages");
    } catch (err) {
      toast.error(t("chats.sendError") || "Mesaj gönderilemedi!");
    } finally {
      setSending(false);
    }
  });
  const getUser = async () => {
    try {
      setLoading(true);
      const response = await getByParams(APIURLS.USER_BY_NAME, { name: username });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      getUser();
    }
  }, [username]);

  const formatJoinDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getUserInitials = (displayName: string, userName: string): string => {
    const name = displayName || userName;
    return name.substring(0, 2).toUpperCase();
  };

  const getStatusColor = (status: number): string => {
    switch (status) {
      case 0: return "bg-green-500";
      case 1: return "bg-yellow-500";
      case 2: return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: number): string => {
    switch (status) {
      case 0: return t("userInfo.availableNow");
      case 1: return t("userInfo.away");
      case 2: return t("userInfo.busy");
      default: return t("userInfo.offline");
    }
  };
  const handleShare = async () => {
    const shareData = {
      title: `${user?.displayName || user?.userName} - Profil`,
      text: `${user?.displayName || user?.userName} adlı kullanıcının profilini incele`,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success(t("userInfo.linkCopied") || "Link kopyalandı!");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        try {
          await navigator.clipboard.writeText(window.location.href);
          toast.success(t("userInfo.linkCopied") || "Link kopyalandı!");
        } catch (clipboardError) {
          toast.error(t("userInfo.shareError") || "Paylaşım başarısız!");
          console.error('Share error:', error);
        }
      }
    }
  };


  const follow = async () => {
    try {
      const response = await postByParams(APIURLS.USER_FOLLOW, { followedId: user?.id });
      getUser();
    } catch (exx) {
      console.error("Error subscribing:", exx);
      toast.error(t("userInfo.subscribeError") || "Abonelik başarısız!");
    }

  };
  const followerDelete = async (id: number) => {
    try {
      const response = await postByParams(APIURLS.USER_UNFOLLOW, { followedUserId: id });
      getUser();
    } catch (exx) {
      console.error("Error subscribing:", exx);
      toast.error(t("userInfo.subscribeError") || "Abonelik başarısız!");
    }

  };


  const getFollower = async () => {
    try {
      const response = await getByParams(APIURLS.USER_GETFOLLOWER, { userId: user?.id, pageNumber: 1, pageSize: 10 });
      setFollowerCount(response.recordTotals || 0);
      setFollowers(response.data || []);
    } catch (exx) { }
  };

  const getFollowed = async () => {
    try {
      const response = await getByParams(APIURLS.USER_GETFOLLOWED, { userId: user?.id, pageNumber: 1, pageSize: 10 });
      setFollowedCount(response.recordTotals || 0);
      setFolloweds(response.data || []);
    } catch (exx) { }
  };

  useEffect(() => {
    if (user?.id) {
      getFollower();
      getFollowed();
    }

  }, [user?.id]);
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto w-full rounded-lg overflow-hidden shadow-md border border-slate-100 bg-white">
        <div className="h-48 bg-gray-200 animate-pulse" />
        <div className="relative px-6 pb-6">
          <div className="flex justify-between items-start">
            <div className="-mt-20">
              <div className="w-36 h-36 bg-gray-300 rounded-full animate-pulse" />
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto w-full rounded-lg overflow-hidden shadow-md border border-slate-100 bg-white p-6">
        <div className="text-center text-slate-500">
          {t("userInfo.userNotFound")}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto w-full rounded-lg overflow-hidden shadow-md border border-slate-100 bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="h-48 bg-sky-400"
        style={{
          backgroundImage: user.coverPictureUrl ? `url(${user.coverPictureUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative px-6 pb-6">
        <div className="flex justify-between items-start">
          <motion.div
            className="-mt-20"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
          >
            <Avatar className="w-36 h-36 border-4 border-white">
              <AvatarImage
                src={user.profilePictureUrl}
                alt={`${t("userInfo.avatarAlt")} ${user.displayName || user.userName}`}
              />
              <AvatarFallback className="bg-yellow-200 text-yellow-800 font-semibold text-lg">
                {getUserInitials(user.displayName, user.userName)}
              </AvatarFallback>
            </Avatar>
            <div className={`absolute bottom-4 right-4 w-5 h-5 ${getStatusColor(user.status)} rounded-full border-2 border-white`} />
          </motion.div>

          <motion.div
            className="flex items-center gap-2 pt-6"
            variants={itemVariants}
          >
            {username === currentUserName ? (
              <Link href={pageUrls.SETTINGS.PROFILE} prefetch>
                <Button
                  variant="outline"
                  className="rounded-full border-pink-200 text-pink-600 hover:bg-pink-50 hover:text-pink-700"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {t("userInfo.editProfile")}
                </Button>
              </Link>
            ) : (
              <>
                {!user.isFollowed ?

                  <Button
                    variant="outline"
                    className="rounded-full border-pink-200 text-pink-600 hover:bg-pink-50 hover:text-pink-700"
                    onClick={follow}
                  >
                    Takip Et
                  </Button> :
                  <Button
                    variant="outline"
                    className="rounded-full border-pink-200 text-pink-600 hover:bg-pink-50 hover:text-pink-700"
                    onClick={() => followerDelete(user.id)}
                  >
                    Takipten Çık
                  </Button>

                }

                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-pink-200 text-pink-600 hover:bg-pink-50 hover:text-pink-700"
                  onClick={() => setOpenMessageModal(true)}
                  title={t("chats.send")}
                >
                  <MessageCircle className="w-5 h-5" />
                </Button>
                <Dialog open={openMessageModal} onOpenChange={setOpenMessageModal}>
                  <DialogContent showCloseButton>
                    <DialogHeader>
                      <DialogTitle>{t("chats.send")}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSendMessage} className="space-y-4 mt-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t("chats.yourMessage")}
                        </label>
                        <input
                          type="text"
                          {...form.register("message")}
                          className="h-12 w-full shadow-none rounded-xl bg-gray-50 px-4 border border-gray-200 focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
                          placeholder={t("chats.type")}
                          disabled={sending}
                        />
                        {form.formState.errors.message && (
                          <span className="text-xs text-red-500">{form.formState.errors.message.message}</span>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-none transition-all duration-200 disabled:opacity-50"
                        disabled={sending}
                      >
                        {sending ? t("common.sending") || "Gönderiliyor..." : t("chats.send")}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </>
            )}

            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-pink-200 text-pink-600 hover:bg-pink-50 hover:text-pink-700"
              onClick={handleShare}
              title={t("userInfo.shareProfile") || "Profili Paylaş"}
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </motion.div>

        </div>

        <motion.div className="mt-4" variants={itemVariants}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-slate-800">
                  {user.displayName || user.userName}
                </h1>
                <div className="w-3 h-3 bg-pink-500 rounded-full" />
              </div>
              <p className="text-slate-500">
                @{user.userName} •{" "}
                <span className="text-slate-700">{getStatusText(user.status)}</span>
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-500">
              <div onClick={() => setOpenFollowersModal(true)} className="cursor-pointer">
                <span className="font-semibold text-slate-800">{followerCount}</span> takipçi
              </div>
              <div onClick={() => setOpenFollowedsModal(true)} className="cursor-pointer">
                <span className="font-semibold text-slate-800">{followedCount}</span> takip
              </div>
            </div>
          </div>
        </motion.div>


        <motion.p className="mt-4 text-slate-600" variants={itemVariants}>
          {user.email}
        </motion.p>
        {user.biography && (
          <motion.p className="mt-2 text-slate-700" variants={itemVariants}>
            {user.biography}
          </motion.p>
        )}

        <motion.div
          className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-slate-500"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{t("userInfo.joined")} {formatJoinDate(user.creationDate)}</span>
          </div>
          {user.country.name && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{user.country.name}</span>
            </div>
          )}
        </motion.div>
      </div>
      {/* Takipçi Modalı */}
      <Dialog open={openFollowersModal} onOpenChange={setOpenFollowersModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Takipçiler</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {followers.length === 0 && <div>Takipçi yok.</div>}
            {followers.map((item) => {
              const u = item.follower;
              if (!u) return null;
              return (
                <div
                  key={u.id}
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
                  onClick={() => window.open(`/${u.userName}`, "_blank")}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={u.profilePictureUrl} alt={u.displayName || u.userName} />
                    <AvatarFallback>{u.displayName?.[0] || u.userName?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{u.displayName || u.userName}</div>
                    <div className="text-xs text-gray-500">@{u.userName}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
      {/* Takip edilenler Modalı */}
      <Dialog open={openFollowedsModal} onOpenChange={setOpenFollowedsModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Takip Edilenler</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {followeds.length === 0 && <div>Takip edilen yok.</div>}
            {followeds.map((item) => {
              const u = item.followed;
              if (!u) return null;
              return (
                <div
                  key={u.id}
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
                  onClick={() => window.open(`/${u.userName}`, "_blank")}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={u.profilePictureUrl} alt={u.displayName || u.userName} />
                    <AvatarFallback>{u.displayName?.[0] || u.userName?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{u.displayName || u.userName}</div>
                    <div className="text-xs text-gray-500">@{u.userName}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default UserInfo;