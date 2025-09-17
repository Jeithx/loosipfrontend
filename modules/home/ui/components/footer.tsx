"use client";
import { Icons } from "@/components/icons";
import Logo from "@/components/logo";
import Link from "next/link";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { useRouter, usePathname } from "next/navigation";

const Footer = () => {
  const [dark, setDark] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = pathname.split("/")[1];
  const nextLang = currentLang === "en" ? "de" : "en";

  return (
    <footer className="w-full bg-gray-50 pt-8 pb-4 px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 w-full">
            <Logo width={120} height={40} />
            <nav className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-base text-[#232323] font-normal w-full">
              <Link href="#" className="hover:text-[#cb0c9f] transition">
                {t("HomePage.footer.contact")}
              </Link>
              <Link href="#" className="hover:text-[#cb0c9f] transition">
                {t("HomePage.footer.help")}
              </Link>
              <Link href="#" className="hover:text-[#cb0c9f] transition">
                {t("HomePage.footer.privacy")}
              </Link>
              <Link href="#" className="hover:text-[#cb0c9f] transition">
                {t("HomePage.footer.terms")}
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4 sm:gap-5 text-[#cb0c9f] text-xl justify-center md:justify-end">
            <Icons.facebook className="size-5" />
            <Icons.x className="size-5" />
            <Icons.instagram className="size-5" />
            <Icons.tiktok className="size-5" />
          </div>
        </div>
        <div className="w-full h-px bg-gray-200" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-[#48494a]">
          <div className="text-center md:text-left">
            {t("HomePage.footer.copyright")}
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 justify-center md:justify-end">
            <button
              onClick={() => setDark((d) => !d)}
              className={`flex items-center gap-2 px-2 py-1 rounded-full border border-[#cb0c9f] transition-colors duration-200 focus:outline-none ${
                dark ? "bg-[#cb0c9f]/10" : "bg-white"
              }`}
              aria-label="Toggle dark mode"
            >
              <span className="text-[#cb0c9f]">
                {dark ? (
                  <Moon className="size-4" />
                ) : (
                  <Sun className="size-4" />
                )}
              </span>
              <span className="ml-1 text-[#cb0c9f] font-medium">
                {dark ? t("HomePage.footer.dark") : t("HomePage.footer.light")}
              </span>
            </button>
            <span
              className="flex items-center gap-2 cursor-pointer text-[#cb0c9f] font-medium text-[17px] transition"
              onClick={() => router.push(`/${nextLang}/`)}
            >
              <Icons.language className="size-5" /> {t("HomePage.footer.language")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
