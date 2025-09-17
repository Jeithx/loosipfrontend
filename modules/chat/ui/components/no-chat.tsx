"use client";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";

const NoChat = () => {
  const { t } = useTranslation();
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full w-full text-center p-8 select-none"
      initial={{ opacity: 0, scale: 0.95, y: 32 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
        className="text-6xl mb-4"
      >
        💬
      </motion.div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {t("chats.noSelected")}
      </h2>
      <p className="text-gray-500 max-w-xs">{t("chats.selectChat")}</p>
    </motion.div>
  );
};

export default NoChat;
