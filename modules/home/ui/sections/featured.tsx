"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { featuredContainer, featuredItemUp } from "../animations";
import { featuredCreators } from "@/lib/mockData";
import { useTranslation } from "@/hooks/use-translation";

const Featured = () => {
  const { t } = useTranslation();
  return (
    <motion.section
      variants={featuredContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full py-10 md:py-16 bg-gray-50 px-4"
    >
      <motion.div
        variants={featuredItemUp}
        className="w-full max-w-7xl mx-auto flex flex-col items-center gap-8 md:gap-10"
      >
        <div className="flex flex-col items-center gap-2.5">
          <h6 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#48494a] leading-tight text-center">
            {t("HomePage.featuredCreators.title")}
          </h6>
          <span className="text-[#48494a] text-base sm:text-lg text-center">
            {t("HomePage.featuredCreators.subtitle")}
          </span>
        </div>
        <motion.div
          variants={featuredContainer}
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7"
        >
          {featuredCreators.map((creator, index) => (
            <motion.div
              key={index}
              variants={featuredItemUp}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 8px 32px 0 rgba(203,12,159,0.15)",
              }}
              className={cn(
                "w-full h-56 sm:h-44 relative rounded-xl bg-cover bg-center flex items-end p-4 sm:p-5 transition-transform duration-200 cursor-pointer overflow-hidden group"
              )}
              style={{ backgroundImage: `url(${creator.background})` }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute left-0 right-0 bottom-0 h-8 z-10 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, #cb0c9f 0%, transparent 80%)",
                  filter: "blur(12px)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-xl z-0 transition-all duration-200 group-hover:from-[#cb0c9f]/70 group-hover:via-black/40"></div>
              <div className="flex items-end gap-3 sm:gap-4 relative z-20 w-full">
                <div className="w-16 h-16 sm:w-20 sm:h-20 relative border-2 border-white rounded-full overflow-hidden shadow-lg">
                  <Image
                    src={creator.image}
                    alt={creator.name}
                    fill
                    className="object-cover w-16 h-16 sm:w-20 sm:h-20 rounded-full pointer-events-none"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <h5 className="text-white text-base sm:text-lg font-semibold drop-shadow-md">
                    {creator.name}
                  </h5>
                  <span className="text-white text-xs sm:text-sm font-normal opacity-90 -translate-y-0.5">
                    @{creator.username}
                  </span>
                </div>
            </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Featured;
