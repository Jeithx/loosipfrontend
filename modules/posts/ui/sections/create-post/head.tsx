"use client";
import { motion } from "framer-motion";
import { itemVariants } from "../../animations";
import { useTranslation } from "@/hooks/use-translation";

const CreatePostHead = () => {
  const { t } = useTranslation();
  return (
    <motion.div className="text-left mb-8" variants={itemVariants}>
      <motion.h1
        className="text-2xl md:text-3xl font-light text-slate-800 mb-2 tracking-tight"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {t("createPost.title")}
      </motion.h1>
      <motion.p
        className="text-slate-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {t("createPost.subtitle")}
      </motion.p>
    </motion.div>
  );
};

export default CreatePostHead;
