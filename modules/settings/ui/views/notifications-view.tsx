"use client";
import Head from "../components/head";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";

const notificationOptions = [
  'newContent',
  'newSubscription',
  'receivedTip',
  'ppvUnlocked',
  'newMessage',
  'newComment',
  'expiringSubscriptions',
  'upcomingRenewals',
  'userWentLive',
];

const NotificationsView = () => {
  const { t } = useTranslation();
  const [prefs, setPrefs] = useState<Record<string, boolean>>(
    notificationOptions.reduce((acc, cur) => ({ ...acc, [cur]: true }), {})
  );

  const handleChange = (key: string, value: boolean) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 32 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Head title={t('settingsPages.notifications.headTitle')} description={t('settingsPages.notifications.headDescription')} />
      <div className="flex flex-col gap-5 p-4">
        {notificationOptions.map((option) => (
          <div key={option} className="flex items-center gap-4">
            <Switch
              checked={prefs[option]}
              onCheckedChange={(val) => handleChange(option, val)}
              className="data-[state=checked]:bg-pink-600"
              id={option}
            />
            <label htmlFor={option} className="text-lg text-gray-700 cursor-pointer">
              {t(`settingsPages.notifications.options.${option}`)}
            </label>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default NotificationsView;
