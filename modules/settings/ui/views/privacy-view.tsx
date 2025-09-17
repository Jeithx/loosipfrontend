"use client";
import Head from "../components/head";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";

const PrivacyView = () => {
  const { t } = useTranslation();
  const [isPublic, setIsPublic] = useState(true);
  const [email2FA, setEmail2FA] = useState(true);
  return (
    <motion.div
      className="w-full flex flex-col gap-8"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 32 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Head title={t('settingsPages.privacy.headTitle')} description={t('settingsPages.privacy.headDescription')} />
      <div className="flex flex-col gap-5 p-4 pt-0">
        <motion.div
          className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col gap-3"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Switch
              checked={isPublic}
              onCheckedChange={setIsPublic}
              className="data-[state=checked]:bg-pink-600"
              id="isPublic"
            />
            <label
              htmlFor="isPublic"
              className="text-lg font-medium text-gray-700"
            >
              {t('settingsPages.privacy.isPublic')}
            </label>
          </div>
          <div className="text-gray-600 text-base mb-1">
            {t('settingsPages.privacy.privateInfo')}
          </div>
          <ul className="list-disc pl-6 text-gray-600 text-base space-y-1">
            <li>{t('settingsPages.privacy.privateInfo1')}</li>
            <li>{t('settingsPages.privacy.privateInfo2')}</li>
          </ul>
        </motion.div>
        <motion.div
          className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-3"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Switch
              checked={email2FA}
              onCheckedChange={setEmail2FA}
              className="data-[state=checked]:bg-pink-600"
              id="email2FA"
            />
            <label
              htmlFor="email2FA"
              className="text-lg font-medium text-gray-700"
            >
              {t('settingsPages.privacy.enable2FA')}
            </label>
          </div>
          <div className="text-gray-600 text-base">
            {t('settingsPages.privacy.enable2FADesc')}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PrivacyView;
