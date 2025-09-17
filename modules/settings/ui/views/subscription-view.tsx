"use client";
import Head from "../components/head";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { ActivityIcon, UsersIcon, EyeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DataTable } from "@/components/custom/form-elements/data-table";
import { useQueryState } from "nuqs";
import AvatarProfile from "@/components/custom/avatar-profile";
import { useTranslation } from "@/hooks/use-translation";
import { getByParams } from "@/app/[lang]/helpers/httpEntity.service";
import { APIURLS } from "@/app/[lang]/helpers/APIURLS";
import { useEffect, useState, useCallback } from "react";
import { usePagination } from "@/lib/hooks/use-pagination";
import { getTokenFromCookie } from "@/app/server/action";

enum SubscriptionStatus {
  Completed = "Completed",
  Pending = "Pending",
}

const SubscriptionView = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useQueryState("active", {
    defaultValue: "subscriptions",
  });
  const [pagination, setPagination] = usePagination();
  const [followers, setFollowers] = useState<any[]>([]);
  const [followersTotal, setFollowersTotal] = useState(0);
  const [followed, setFollowed] = useState<any[]>([]);
  const [followedTotal, setFollowedTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setPagination({ pageNumber: 0 });
  };

  const tabData = [
    { label: t('settingsPages.subscription.subscriptions'), icon: ActivityIcon },
    { label: t('settingsPages.subscription.subscribers'), icon: UsersIcon },
  ];

  const mapFollowedToTable = (data: any[]) => {
    return data.map((item) => {
      const user = item.followed || {};
      return {
        to: user.displayName || user.userName || "-",
        avatar: user.profilePictureUrl || "",
        status: SubscriptionStatus.Completed,
        paidWith: "-",
        renews: "-",
        expiresAt: "-",
      };
    });
  };
  const mapFollowersToTable = (data: any[]) => {
    return data.map((item) => {
      const user = item.follower || {};
      return {
        to: user.displayName || user.userName || "-",
        avatar: user.profilePictureUrl || "",
        status: SubscriptionStatus.Completed,
        paidWith: "-",
        renews: "-",
        expiresAt: "-",
      };
    });
  };
  function parseJwt(token: any) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('JWT parsing error:', e);
      return null;
    }
  }
  const [currentUserId, setCurrentUserId] = useState(0);
  const getToken = async () => {
    const token = await getTokenFromCookie();
    const decodedToken = parseJwt(token);
    const userId = decodedToken?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    setCurrentUserId(userId);

  }
  useEffect(() => {
    getToken();
  }, []);
  const fetchFollowers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getByParams(APIURLS.USER_GETFOLLOWER, {
        pagenumber: pagination.pageNumber + 1,
        pagesize: pagination.pageSize,
        userId:currentUserId
      });
      setFollowers(response.data || []);
      setFollowersTotal(response.recordTotals || 0);
    } catch (exx) {
      setFollowers([]);
      setFollowersTotal(0);
    } finally {
      setLoading(false);
    }
  }, [pagination.pageNumber, pagination.pageSize]);

  const fetchFollowed = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Fetching followed users for userId:", currentUserId);
      const response = await getByParams(APIURLS.USER_GETFOLLOWED, {
        pagenumber: pagination.pageNumber + 1,
        pagesize: pagination.pageSize,
        userId:currentUserId
      });
      setFollowed(response.data || []);
      setFollowedTotal(response.recordTotals || 0);
    } catch (exx) {
      setFollowed([]);
      setFollowedTotal(0);
    } finally {
      setLoading(false);
    }
  }, [pagination.pageNumber, pagination.pageSize]);

  useEffect(() => {
    if(currentUserId!=0){
      if (activeTab === tabData[0].label.toLowerCase()) {
      fetchFollowed();
    } else {
      fetchFollowers();
    }
    }
    
  }, [activeTab,currentUserId]);

  const tableData = activeTab === tabData[0].label.toLowerCase()
    ? mapFollowedToTable(followed)
    : mapFollowersToTable(followers);
  const totalCount = activeTab === tabData[0].label.toLowerCase() ? followedTotal : followersTotal;
  const pageCount = Math.ceil(totalCount / pagination.pageSize);

  const columns = [
    {
      accessorKey: "to",
      header: () => t('settingsPages.subscription.to'),
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <AvatarProfile image={row.original.avatar} name={row.original.to} size="sm" />
          <span className="font-medium text-gray-700 truncate max-w-[120px]">
            {row.original.to}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: () => t('settingsPages.subscription.status'),
      cell: ({ row }: any) => {
        const status = row.original.status;
        let color = "bg-gray-300 text-gray-800";
        if (status === SubscriptionStatus.Completed) color = "text-green-600";
        if (status === SubscriptionStatus.Pending) color = "text-sky-600";
        return (
          <span className={cn("px-3 py-1 rounded font-semibold text-sm", color)}>
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "paidWith",
      header: () => t('settingsPages.subscription.paidWith'),
      cell: ({ row }: any) => (
        <span className="text-gray-700">{row.original.paidWith}</span>
      ),
    },
    {
      accessorKey: "renews",
      header: () => t('settingsPages.subscription.renews'),
      cell: ({ row }: any) => (
        <span className="text-gray-700">{row.original.renews || "-"}</span>
      ),
    },
    {
      accessorKey: "expiresAt",
      header: () => t('settingsPages.subscription.expiresAt'),
      cell: ({ row }: any) => (
        <span className="text-gray-700">{row.original.expiresAt || "-"}</span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: () => <EyeIcon className="w-4 h-4 text-gray-500" />,
      enableSorting: false,
      enableHiding: false,
    },
  ];

  return (
    <div>
      <Head title={t('settingsPages.subscription.headTitle')} description={t('settingsPages.subscription.headDescription')} />
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="flex w-full justify-between bg-white rounded-none h-14 border-b border-gray-200 px-0 relative">
          {tabData.map((tab) => {
            const Icon = tab.icon;
            const value = tab.label.toLowerCase();
            const isActive = activeTab === value;
            return (
              <TabsTrigger
                key={value}
                value={value}
                onClick={() => handleTabChange(value)}
                className="relative flex flex-row cursor-pointer items-center justify-center gap-3 px-6 py-4 text-lg bg-transparent shadow-none rounded-none text-pink-600/80 data-[state=active]:text-pink-600 transition-colors"
                style={{ background: "none" }}
              >
                <Icon className="size-5 text-pink-600/80 fill-pink-600/80" />
                <span className="text-lg font-medium text-gray-700">
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute left-0 right-0 -bottom-[7px] h-1 bg-pink-500 rounded-full"
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.5,
                    }}
                  />
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
      <DataTable
        columns={columns}
        data={tableData}
        pageCount={pageCount}
      />
    </div>
  );
};

export default SubscriptionView;
