"use client";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { settingsSidebarLinks } from "@/lib/mockData";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const sidebarVariants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
  tap: { scale: 0.97 },
};

const Sidebar = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      logout();
      toast.success("Successfully logged out");
      router.push("/auth/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };
  return (
    <motion.div
      className="w-64 h-screen bg-white border-l border-r border-gray-200 py-5"
      variants={sidebarVariants}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col items-start px-4">
        <h2 className="text-xl font-medium">{t("userSettings.title")}</h2>
        <p className="text-base text-gray-500">{t("userSettings.subtitle")}</p>
      </div>
      <Separator className="mt-2 mb-0 pb-0 w-full" />
      <motion.ul
        className="flex flex-col items-start"
        variants={sidebarVariants}
      >
        {settingsSidebarLinks.map((link) => {
          const Icon = Icons[link.icon as keyof typeof Icons];
          const isActive = pathname === link.href;
          return (
            <motion.li
              key={link.label}
              variants={itemVariants}
              whileTap="tap"
              className="w-full"
            >
              <Link href={link.href} prefetch className="group w-full block">
                <div
                  className={cn(
                    "flex items-center gap-2 w-full py-2.5 hover:bg-gray-100 px-2.5 transition-colors relative",
                    isActive && "bg-gray-100"
                  )}
                >
                  <Icon className="size-5 text-gray-500" />
                  <span className="text-gray-500 text-sm flex-1 text-left">
                    {t(link.label)}
                  </span>
                  <span className="inline-flex items-center opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 absolute right-4">
                    <Icons.chevronRight className="size-4 text-gray-400" />
                  </span>
                </div>
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
      <button
        onClick={handleLogout}
        className="w-full mt-6 py-1.5 text-sm rounded-md bg-gradient-to-tr from-red-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-all duration-200"
      >
        {t("menu.logout")}
      </button>
    </motion.div>
  );
};

export default Sidebar;
