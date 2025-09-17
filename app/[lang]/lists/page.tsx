import { Locale } from "@/configs/i18n";
import { getDictionary } from "@/lib/utils/getDictionary";
import MainLayout from "@/components/main-layout";
import ListsView from "@/modules/lists/ui/views/lists-view";

export default async function Page({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  return (
    <MainLayout>
      <ListsView dict={dictionary} />
    </MainLayout>
  );
}
export const dynamic = "force-dynamic";