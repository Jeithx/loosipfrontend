"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { List, MessageCircle, Heart, Users, Gift } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";

const tabData = [
  { label: "notifications.tabs.all", icon: List },
  { label: "notifications.tabs.messages", icon: MessageCircle },
  { label: "notifications.tabs.likes", icon: Heart },
  { label: "notifications.tabs.subscriptions", icon: Users },
  { label: "notifications.tabs.tips", icon: Gift },
];

const TabsBar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  const { t } = useTranslation();
  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="flex w-full justify-between bg-white rounded-none h-14 border-b border-gray-200 px-0">
        {tabData.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.label;
          return (
            <TabsTrigger
              key={tab.label}
              value={tab.label}
              onClick={() => {
                setActiveTab(tab.label);
              }}
              className="relative flex flex-row cursor-pointer items-center justify-center gap-3 px-6 py-4 text-lg bg-transparent shadow-none rounded-none text-pink-600/80 data-[state=active]:text-pink-600 transition-colors"
              style={{ background: "none" }}
            >
              <Icon className="w-9 h-9" strokeWidth={2.2} />
              {t(tab.label)}
              {isActive && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute left-0 right-0 -bottom-[7px] h-1 bg-pink-500 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default TabsBar;
