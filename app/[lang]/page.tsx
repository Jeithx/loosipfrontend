import { Locale } from "@/configs/i18n";
import { getTokenFromCookie } from "@/app/server/action";
import { redirect } from "next/navigation";
import { pageUrls } from "@/lib/enums/page-urls";

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const token = await getTokenFromCookie();
  if (token) {
    redirect(pageUrls.FEED); // "/feed"
  } else {
    redirect(pageUrls.AUTH.SIGN_IN); // "/auth/sign-in"
  }
  return null;
}
