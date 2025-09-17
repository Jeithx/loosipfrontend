"use client";
import Head from "../components/head";
import { Button } from "@/components/ui/button";
import AvatarProfile from "@/components/custom/avatar-profile";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  Users,
  DollarSign,
  Calendar,
  Gift,
  TrendingUp,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

const referralLink = "https://justfans.qdev.tech/raechel-zane?ref=MWT6FXVP";
const referralList = [
  { name: "Yorman", since: "2024-05-20", earned: 0 },
  { name: "test", since: "2024-03-13", earned: 0 },
  { name: "Userteste", since: "2024-02-19", earned: 0 },
];

const ReferralsView = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalEarned = referralList.reduce((sum, user) => sum + user.earned, 0);

  return (
    <motion.div
      className="w-full flex flex-col gap-8"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 32 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Head title={t('settingsPages.referrals.headTitle')} description={t('settingsPages.referrals.headDescription')} />
      <div className="text-center max-w-xl mx-auto space-y-4">
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          {t('settingsPages.referrals.shareInfo')}
        </p>
      </div>

      <motion.div
        className="bg-gradient-to-br from-pink-50 to-purple-50 p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('settingsPages.referrals.yourReferralLink')}
          </h2>
          <p className="text-gray-600">
            {t('settingsPages.referrals.shareLink')}
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <Input
            type="text"
            value={referralLink}
            disabled
            className="w-full text-center text-base bg-white border-2 border-gray-200 rounded-2xl py-4 px-6 pr-32 font-medium text-gray-700 focus:border-pink-300 focus:ring-4 focus:ring-pink-100 transition-all duration-200"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-none transition-all duration-200 transform"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="copied"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  {t('settingsPages.referrals.copied')}
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  {t('settingsPages.referrals.copy')}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      <div className="space-y-6">
        <p className="text-gray-600 text-center">
          {t('settingsPages.referrals.peopleJoined')}
        </p>
        <motion.div
          className="bg-white rounded-3xl border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {referralList.length > 0 ? (
            <div className="divide-y divide-gray-100">
              <AnimatePresence>
                {referralList.map((user, i) => (
                  <motion.div
                    key={user.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 * i,
                      ease: "easeOut",
                    }}
                    className="flex items-center gap-6 p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <AvatarProfile image="" name={user.name} size="md" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-lg truncate">
                        {user.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-500 text-sm">
                          {t('settingsPages.referrals.joined')} {new Date(user.since).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-green-600">
                          ${user.earned}
                        </span>
                      </div>
                      <span className="text-gray-500 text-sm">{t('settingsPages.referrals.earned')}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-600 mb-2">
                {t('settingsPages.referrals.noReferrals')}
              </h4>
              <p className="text-gray-500">
                {t('settingsPages.referrals.startSharing')}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ReferralsView;
