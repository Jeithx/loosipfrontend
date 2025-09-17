"use client";
import TabsBar from "../components/tabs";
import { useQueryState } from "nuqs";
import AllNotification from "../sections/all-notification";
import MessagesNotification from "../sections/messages-notification";
import LikesNotification from "../sections/likes-notification";
import SubscriptionsNotification from "../sections/subscriptions-notification";
import TipsNotification from "../sections/tips-notification";
import { useTranslation } from "@/hooks/use-translation";
import { useEffect } from "react";
import { get, getByParams } from "@/app/[lang]/helpers/httpEntity.service";
import { APIURLS } from "@/app/[lang]/helpers/APIURLS";
import NotificationItem from "../components/notificaiton-item";
import { useState } from "react";
import { useRouter } from "next/navigation";

const NotificationType = {
  NewFollower: 0,
  NewComment: 1,
  NewLike: 2,
  NewMessage: 3,
  NewPost: 4,
  NewSubscriber: 5,
};

const NotificationTypeLabel: Record<number, string> = {
  0: "Yeni Takipçi",
  1: "Yeni Yorum",
  2: "Yeni Beğeni",
  3: "Yeni Mesaj",
  4: "Yeni Gönderi",
  5: "Yeni Abone",
};

interface NotificationUser {
  id: number;
  displayName?: string;
  userName?: string;
  profilePictureUrl?: string;
}

interface Notification {
  id: number;
  content: string;
  creationDate: string;
  isActive: boolean;
  isRead: boolean;
  type: number;
  user?: NotificationUser;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString("tr-TR", { dateStyle: "short", timeStyle: "short" });
}

const NotificationView = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;
  const router = useRouter();

  const GetNotification = async (pageNumber = 1) => {
    try {
      const response = await getByParams(APIURLS.NOTIFICATION, { pageNumber, pageSize });
      setNotifications(response.data || []);
      setTotal(response.recordTotals || 0);
    } catch (exx) {
      console.error("Error fetching notifications:", exx);
    }
  };
  useEffect(() => {
    GetNotification(page);
  }, [page]);

  const handleUserClick = (userName?: string) => {
    if (userName) {
      router.push(`/${userName}`);
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="w-full flex flex-col">
      <div className="px-4 py-6">
        <h1 className="text-2xl font-semibold text-gray-700">
          {t("notifications.title")}
        </h1>
      </div>
      <div>
        {notifications.length === 0 ? (
          <div>No notifications</div>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className="flex items-center">
              <div
                className="cursor-pointer"
                onClick={() => handleUserClick(n.user?.userName)}
              >
                <NotificationItem
                  item={{
                    id: n.id,
                    avatar: n.user?.profilePictureUrl,
                    name: n.user?.displayName || n.user?.userName,
                    message: n.content,
                    time: formatDate(n.creationDate),
                  }}
                />
              </div>
              <span className="ml-2 px-2 py-1 rounded bg-gray-100 text-xs text-gray-700 border border-gray-200">
                {NotificationTypeLabel[n.type] || "Bilinmeyen Tip"}
              </span>
            </div>
          ))
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Önceki
          </button>
          <span>
            {page} / {totalPages}
          </span>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Sonraki
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationView;
