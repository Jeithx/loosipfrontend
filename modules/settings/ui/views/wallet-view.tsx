"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Head from "../components/head";
import { motion } from "framer-motion";
import { Icons } from "@/components/icons";
import { useQueryState } from "nuqs";
import { useRouter } from "next/navigation";
import { pageUrls } from "@/lib/enums/page-urls";
import DepositSection from "../sections/wallet/deposit";
import WithdrawSection from "../sections/wallet/withdraw";
import { useTranslation } from "@/hooks/use-translation";

const WalletView = () => {
  const { t } = useTranslation();
  const tabData = [
    { key: "deposit", label: t('settingsPages.wallet.deposit.deposit'), icon: Icons.deposit },
    { key: "withdraw", label: t('settingsPages.wallet.withdraw.request'), icon: Icons.withdraw },
  ];

  const [activeTabRaw, setActiveTab] = useQueryState("tab", {
    defaultValue: "deposit",
  });
  const activeTab = activeTabRaw || "deposit";

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Head title={t('settingsPages.wallet.headTitle')} description={t('settingsPages.wallet.headDescription')} />
      <motion.div
        className="w-full p-3 flex flex-col gap-2.5"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex flex-col items-start gap-1 py-5 px-6 rounded-xl bg-gradient-to-r from-primary via-fuchsia-700 to-fuchsia-500 text-white shadow-lg">
          <span className="text-3xl font-extrabold drop-shadow-sm tracking-tight">
            $0.89
          </span>
          <span className="text-base font-medium opacity-80 leading-snug mt-1">
            {t('settingsPages.wallet.availableFunds')}
          </span>
        </div>
        <Tabs
          defaultValue={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="flex w-full justify-between bg-white rounded-none h-14 border-b border-gray-200 px-0">
            {tabData.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <TabsTrigger
                  key={tab.key}
                  value={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className="relative flex flex-row cursor-pointer items-center justify-center gap-3 px-6 py-4 text-lg bg-transparent shadow-none rounded-none text-pink-600/80 data-[state=active]:text-pink-600 transition-colors"
                  style={{ background: "none" }}
                >
                  <Icon className="size-5 text-pink-600/80 fill-pink-600/80" />
                  {tab.label}
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
      </motion.div>
      {activeTab === "deposit" ? <DepositSection /> : <WithdrawSection />}
    </div>
  );
};

export default WalletView;
