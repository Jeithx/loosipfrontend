"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const tabData = [
  { label: "Live" },
  { label: "Top" },
  { label: "People" },
  { label: "Photos" },
  { label: "Videos" },
];

const TabsBar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="flex w-full justify-between bg-white rounded-none h-14 border-b border-gray-200 px-0">
        {tabData.map((tab) => {
          const isActive = activeTab.toLowerCase() === tab.label.toLowerCase();
          return (
            <TabsTrigger
              key={tab.label}
              value={tab.label}
              onClick={() => {
                setActiveTab(tab.label);
              }}
              className="relative flex flex-row font-normal cursor-pointer items-center justify-center gap-3 px-6 py-4 text-base bg-transparent shadow-none rounded-none text-pink-600/80 data-[state=active]:text-pink-600 transition-colors"
              style={{ background: "none" }}
            >
              {tab.label === "Live" && (
                <motion.span
                  className="inline-block mr-1"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                >
                  <span className="block w-3 h-3 rounded-full bg-red-500 shadow-lg border-2 border-white" />
                </motion.span>
              )}
              {tab.label}
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
