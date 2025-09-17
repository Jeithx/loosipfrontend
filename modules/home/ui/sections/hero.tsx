"use client";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { heroContainer, heroItemFade, heroItemUp } from "../animations";
import { heroFeatures } from "@/lib/mockData";
import { useTranslation } from "@/hooks/use-translation";

const Hero = () => {
  const { t } = useTranslation();
  return (
    <motion.div
      variants={heroContainer}
      initial="hidden"
      animate="show"
      className="py-12 md:py-20 w-full max-w-7xl mx-auto flex flex-col items-center justify-center gap-16 md:gap-28 px-4"
    >
      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full gap-10 md:gap-0">
        <div className="flex flex-col items-start gap-4 w-full md:w-1/2">
          <motion.h2
            variants={heroItemUp}
            className="font-extrabold text-3xl sm:text-4xl md:text-5xl max-w-md leading-tight md:leading-[3.5rem] bg-gradient-to-tr from-[#7928ca] to-[#ff0080] bg-clip-text text-transparent"
            style={{
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundImage: "linear-gradient(310deg, #7928ca, #ff0080)",
              backgroundRepeat: "repeat-x",
            }}
          >
            {t("HomePage.hero.title")}            
          </motion.h2>
          <motion.span
            variants={heroItemUp}
            className="text-base sm:text-lg md:text-xl text-gray-500 mb-2 max-w-md"
          >
          {t("HomePage.hero.subtitle")}
          </motion.span>
          <motion.div
            variants={heroItemUp}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2 w-full"
          >
            <Button
              className="w-full sm:w-auto px-6 h-11 text-base rounded-2xl font-semibold shadow-md bg-gradient-to-tr from-[#7928ca] to-[#ff0080] text-white border-0 hover:opacity-90 transition-all duration-200"
              style={{ boxShadow: "0 2px 16px 0 rgba(121,40,202,0.10)" }}
            >
             {t("HomePage.hero.tryForFree")}
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto px-6 h-11 text-base rounded-2xl font-semibold shadow-md bg-white border border-[#e5e7eb] text-transparent bg-clip-text bg-gradient-to-tr from-[#7928ca] to-[#ff0080] hover:bg-gray-50 transition-all duration-200"
              style={{
                color: "#7928ca",
                backgroundImage: "linear-gradient(310deg, #7928ca, #ff0080)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                boxShadow: "0 2px 16px 0 rgba(121,40,202,0.07)",
              }}
            >
              <Search className="mr-2 text-[#7928ca]" />
              {t("HomePage.hero.exploreMore")}
          </Button>
          </motion.div>
        </div>
        <motion.div variants={heroItemFade} className="flex-1 flex justify-center md:justify-end w-full mb-8 md:mb-0">
      <Image
        src="/assets/svgs/home-header.svg"
        alt="hero"
            width={340}
            height={340}
            quality={100}
            className="object-contain pointer-events-none w-full max-w-xs sm:max-w-md md:max-w-lg"
      />
        </motion.div>
    </div>
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="flex flex-col md:flex-row items-center justify-between w-full gap-8 md:gap-0 px-2"
      >
        {heroFeatures.map((feature) => (
          <motion.div
            key={feature.title}
            variants={heroItemUp}
            className="flex flex-col items-center gap-2 w-full md:w-1/3 mb-6 md:mb-0"
          >
            <Image
              src={feature.image}
              alt={feature.title}
              width={80}
              height={80}
              quality={100}
              className="mb-2 pointer-events-none w-20 h-20"
            />
            <h3 className="text-lg md:text-2xl font-bold text-center">{t(feature.title)}</h3>
            <p className="text-gray-500 max-w-xs text-center text-sm md:text-base">{t(feature.description)}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Hero;
