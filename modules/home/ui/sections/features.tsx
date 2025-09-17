"use client";

import { Icons } from "@/components/icons";
import { featuresData } from "@/lib/mockData";
import { motion } from "framer-motion";
import { featuresContainer, featuresItemUp } from "../animations";
import { useTranslation } from "@/hooks/use-translation";

const Features = () => {
  const { t } = useTranslation();
  return (
    <motion.div
      variants={featuresContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full max-w-7xl mx-auto flex flex-col items-center py-10 md:py-14 gap-8 md:gap-10 px-4"
    >
      <motion.div
        variants={featuresItemUp}
        className="flex flex-col items-center justify-center gap-2"
      >
        <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#48494a] leading-tight text-center">
         {t("HomePage.mainFeatures.title")}
        </h4>
        <span className="text-[#48494a] text-base sm:text-lg text-center">
          {t("HomePage.mainFeatures.subtitle")}
        </span>
      </motion.div>
      <motion.div
        variants={featuresContainer}
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-10"
      >
        {featuresData.map((feature, index) => {
          const Icon = Icons[feature.icon as keyof typeof Icons];
          return (
            <motion.div
              key={index}
              variants={featuresItemUp}
              className="flex flex-col items-start gap-2 bg-white p-5 sm:p-6 min-h-[220px]"
            >
              <Icon className="size-8 text-gray-500 mb-2" />
              <h5 className="text-base sm:text-lg font-bold text-[#48494a]">
                {t(feature.title)}
              </h5>
              <p className="text-xs sm:text-sm text-[#48494a]">{t(feature.description)}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default Features;
