"use client";
import Head from "../components/head";
import { CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";

const steps = [
  {
    labelKey: "step1",
    status: "done",
  },
  {
    labelKey: "step2",
    status: "done",
  },
  {
    labelKey: "step3",
    status: "progress",
  },
];

const VerifyView = () => {
  const { t } = useTranslation();
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 32 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Head title={t('settingsPages.verify.headTitle')} description={t('settingsPages.verify.headDescription')} />
      <div className="text-xl text-gray-700 font-normal p-4">
        {t('settingsPages.verify.stepsInfo')}
      </div>
      <ul className="flex flex-col gap-3 p-4 pt-2">
        {steps.map((step, i) => (
          <li key={i} className="flex items-center gap-3 text-lg text-gray-700">
            {step.status === "done" ? (
              <CheckCircle className="size-5 text-lime-400" />
            ) : (
              <Clock className="size-5 text-pink-500" />
            )}
            <span>{t(`settingsPages.verify.${step.labelKey}`)}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default VerifyView;
