"use client";
import AvatarProfile from "@/components/custom/avatar-profile";
import { Icons } from "@/components/icons";
import { motion } from "framer-motion";
import { heroContainer, heroItemUp } from "@/modules/home/ui/animations";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { pageUrls } from "@/lib/enums/page-urls";
import { useTranslations, useLocale } from 'next-intl'; // next-intl hooks
import { use, useEffect, useState } from "react";
import { get } from "@/app/[lang]/helpers/httpEntity.service";
import { APIURLS } from "@/app/[lang]/helpers/APIURLS";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { getDecodedToken } from "@/app/server/action";
import { set } from "date-fns";

interface UserProfile {
  id: number;
  userName: string;
  displayName: string;
  profilePictureUrl: string;
  coverPictureUrl: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  genderId: number;
  cityId: number;
  countryId: number;
  status: number;
  userTypeId: number;
  isActive: boolean;
  creationDate: string;
  lastLoginAt: string;
  prefferedLanguageId: number;
  city?: any;
  country?: any;
}

const Sidebar = () => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [role, setRole] = useState<number>(0);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await get(APIURLS.USER);
        console.log("Profile response:", response);
        if (response.success && response.data && response.data.length > 0) {
          setProfile(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    getProfile();
  }, []);
  const isActiveLink = (href: string) => {
    return pathname === href;
  };


  const isFeedPage = pathname === "/feed";

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  useEffect(() => {
    setRole(profile?.userTypeId || 0);
  }, [profile]);
  const sidebarLinks = [
    {
      label: 'sidebar.home',
      href: pageUrls.FEED,
      icon: "home",
    },
    {
      label: 'sidebar.notifications',
      href: pageUrls.NOTIFICATIONS,
      icon: "notifications",
    },
    {
      label: 'sidebar.messages',
      href: pageUrls.MESSAGES,
      icon: "messages",
      badgeCount: 0,
    },
    {
      label: 'sidebar.myProfile',
      href: profile ? `/${profile.userName}` : "/profile",
      icon: "profile",
    },
    {
      label: 'Settings',
      href: "/settings/profile",
      icon: "settings",
    },
  ];

  return (
    <aside className="py-6 px-2 pr-5 flex flex-col items-start gap-6 w-full min-h-screen bg-white/80">
      <div className="flex items-center gap-4 px-2">
        <AvatarProfile image={profile?.profilePictureUrl || ""} name={profile?.displayName || ""} size="md" />
        <div className="flex flex-col items-start">
          <h6 className="text-base font-semibold text-[#cb0c9f]">{profile?.displayName}</h6>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">@{profile?.userName || ""}</span>
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col items-start px-2">
        <label htmlFor="language-select" className="text-xs text-gray-500 mb-1 font-medium">
          {t("HomePage.footer.language")}
        </label>
        <select
          id="language-select"
          className="w-32 rounded-md border border-gray-200 px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#cb0c9f] bg-white mb-2"
          value={locale}
          onChange={e => handleLanguageChange(e.target.value)}
        >
          <option value="en">English</option>
          <option value="de">Deutsch</option>
          <option value="tr">Türkçe</option>
        </select>
      </div>

      {isFeedPage ? (
        <motion.ul
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-2 w-full"
        >
          {sidebarLinks.map((item, index) => {
            const Icon = Icons[item.icon as keyof typeof Icons];
            const isActive = isActiveLink(item.href);
            return (
              <motion.li key={index} variants={heroItemUp} className="w-full">
                <Link
                  href={item.href}
                  className={`w-full rounded-lg transition group flex items-center px-3 py-2 gap-4 font-medium text-lg
                 ${isActive
                      ? "bg-[#f9d6f549] text-[#cb0c9f]"
                      : "text-gray-500 hover:bg-[#f9d6f549] hover:text-[#cb0c9f]"
                    }`}
                >
                  <div className="relative flex items-center">
                    <Icon
                      className={`size-6 stroke-[1.40px] transition-colors duration-200 
                    ${isActive
                          ? "text-[#cb0c9f] opacity-100"
                          : "text-gray-400 opacity-70 group-hover:text-[#cb0c9f] group-hover:opacity-100"
                        }`}
                    />
                    {item.badgeCount?.toString() && item.badgeCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#cb0c9f] text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow-md">
                        {item.badgeCount}
                      </span>
                    )}
                  </div>
                  <span className="truncate">{t(item.label)}</span>
                </Link>
              </motion.li>
            );
          })}
          <Separator className="w-full my-1.5" />
          {/* <motion.li variants={heroItemUp} className="w-full mt-2">
            <Link href={pageUrls.STREAMS}>
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-gradient-to-tr from-[#7928ca] to-[#ff0080] shadow-md hover:opacity-90 transition text-base mb-1"
              >
                Go Live
              </motion.button>
            </Link>
          </motion.li> */}
          { role === 1 &&
          <motion.li variants={heroItemUp} className="w-full">
            <Link href={pageUrls.POSTS.CREATE}>
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[#cb0c9f] border-2 border-white hover:border-[#cb0c9f] bg-[#f9d6f549] transition duration-300 text-base"
              >
                <Plus className="size-5 text-[#cb0c9f]" />
                New Post
              </motion.button>
            </Link>
          </motion.li>}
        </motion.ul>
      ) : (
        <ul className="flex flex-col items-start gap-2 w-full">
          {sidebarLinks.map((item, index) => {
            const Icon = Icons[item.icon as keyof typeof Icons];
            const isActive = isActiveLink(item.href);
            return (
              <li key={index} className="w-full">
                <Link
                  href={item.href}
                  className={`w-full rounded-lg transition group flex items-center px-3 py-2 gap-4 font-medium text-lg
                 ${isActive
                      ? "bg-[#f9d6f549] text-[#cb0c9f]"
                      : "text-gray-500 hover:bg-[#f9d6f549] hover:text-[#cb0c9f]"
                    }`}
                >
                  <div className="relative flex items-center">
                    <Icon
                      className={`size-6 stroke-[1.40px] transition-colors duration-200 
                    ${isActive
                          ? "text-[#cb0c9f] opacity-100"
                          : "text-gray-400 opacity-70 group-hover:text-[#cb0c9f] group-hover:opacity-100"
                        }`}
                    />
                    {item.badgeCount?.toString() && item.badgeCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#cb0c9f] text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow-md">
                        {item.badgeCount}
                      </span>
                    )}
                  </div>
                  <span className="truncate">{t(item.label)}</span>
                </Link>
              </li>
            );
          })}
          <Separator className="w-full my-1.5" />
          {role === 1 &&
            <li className="w-full">
              <Link href={pageUrls.POSTS.CREATE}>
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[#cb0c9f] border-2 border-white hover:border-[#cb0c9f] bg-[#f9d6f549] transition duration-300 text-base">
                  <Plus className="size-5 text-[#cb0c9f]" />
                  {t("sidebar.newPost")}
                </button>
              </Link>
            </li>
          }

        </ul>
      )}
    </aside>
  );
};

export default Sidebar;