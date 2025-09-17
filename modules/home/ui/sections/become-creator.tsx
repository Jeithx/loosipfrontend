"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};
const itemUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const BecomeCreator = () => {
  const { t } = useTranslation();
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full flex items-center justify-center py-14 md:py-24 bg-gray-50 px-4"
    >
      <motion.div
        variants={itemUp}
        className="w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-20"
      >
        <motion.div
          variants={itemUp}
          className="flex-1 flex items-center justify-center mt-8 md:mt-0"
        >
          <Image
            src="/assets/svgs/home-creators.svg"
            alt="become-creator"
            width={260}
            height={260}
            quality={100}
            className="object-contain pointer-events-none drop-shadow-xl w-full max-w-xs sm:max-w-md md:max-w-lg"
          />
        </motion.div>
        <motion.div
          variants={itemUp}
          className="flex flex-col items-start gap-6 flex-1 w-full"
        >
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-extrabold max-w-md text-gray-800 leading-tight">
            {t("HomePage.becomeCreator.title")}
          </h4>
          <span className="text-gray-500 text-base sm:text-lg max-w-lg">
            {t("HomePage.becomeCreator.description")}
          </span>
          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
            className="mt-2 w-full sm:w-auto"
          >
          <Button
              className="w-full sm:w-auto px-7 h-12 text-base rounded-full font-semibold shadow-md bg-gradient-to-tr from-[#7928ca] to-[#ff0080] text-white border-0 hover:opacity-90 transition-all duration-200"
            style={{ boxShadow: "0 2px 16px 0 rgba(121,40,202,0.10)" }}
          >
            {t("HomePage.becomeCreator.cta")}
          </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default BecomeCreator;
