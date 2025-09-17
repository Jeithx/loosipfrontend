
import { getTokenFromCookie } from "@/app/server/action";
import AvatarProfile from "@/components/custom/avatar-profile";
import { Button } from "@/components/ui/button";
import { pageUrls } from "@/lib/enums/page-urls";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DictionaryType } from "@/lib/utils/getDictionary";
import LogoutMenuItem from "./LogOut";

const Menu = async ({ dict }: { dict: DictionaryType }) => {
  const token = await getTokenFromCookie();
  return (
    <>
      {token ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <AvatarProfile
              image=""
              name="Jane Doe"
              size="md"
              className="cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 border-slate-200 shadow-md"
            align="end"
          >
            <DropdownMenuLabel className="text-sm font-medium">
              {dict["menu"]["myAccount"]}
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <Link href={pageUrls.PROFILE} prefetch>
                <DropdownMenuItem className="cursor-pointer hover:bg-slate-100">
                  {dict["menu"]["profile"]}
                </DropdownMenuItem>
              </Link>
              <Link href={pageUrls.BILLING} prefetch>
                <DropdownMenuItem className="cursor-pointer hover:bg-slate-100">
                  {dict["menu"]["billing"]}
                </DropdownMenuItem>
              </Link>
              <Link href={pageUrls.SETTINGS.PROFILE} prefetch>
                <DropdownMenuItem className="cursor-pointer hover:bg-slate-100">
                  {dict["menu"]["settings"]}
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
               <LogoutMenuItem dict={dict}/>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center flex-row-reverse gap-3">
          <Link href={`${pageUrls.AUTH.SIGN_UP}?role=creator`} prefetch>
            <Button className="bg-gradient-to-tr from-[#7928ca] rounded-full to-[#ff0080] text-white font-semibold">
              {dict["menu"]["becomeCreator"]}
            </Button>
          </Link>
          <Link href={`${pageUrls.AUTH.SIGN_UP}?role=user`} prefetch>
            <Button variant="outline" className="rounded-full border-gray-200">
              {dict["menu"]["login"]}
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Menu;
