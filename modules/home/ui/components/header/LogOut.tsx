"use client";
import { pageUrls } from "@/lib/enums/page-urls";
import { DictionaryType } from "@/lib/utils/getDictionary";
import { useAuthStore } from "@/store/auth-store";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LogoutMenuItem = ({ dict }: { dict: DictionaryType }) => {
    const logout = useAuthStore((state) => state.logout);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            logout();
            toast.success("Successfully logged out");
            router.push("/");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Failed to logout");
        }
    };

    return (
        <DropdownMenuItem
            className="cursor-pointer hover:bg-slate-100"
            onClick={handleLogout}
        >
            {dict["menu"]["logout"]}
        </DropdownMenuItem>
    );
};
export default LogoutMenuItem;