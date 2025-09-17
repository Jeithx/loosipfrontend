import { useParams, useRouter } from "next/navigation";
import EnDict from "@/messages/en.json";
import DeDict from "@/messages/de.json";
import TrDict from "@/messages/tr.json";
import { getLocalizedUrl } from "@/lib/utils/i18n";

const getNestedTranslation = (obj: any, key: string) => {
  return key.split(".").reduce((result, part) => {
    return result && result[part] ? result[part] : null;
  }, obj);
};

export const useTranslation = () => {
  const { lang } = useParams();  
  const router = useRouter();
  const defaultLang = "en";

  const dict =
    lang === "de"
      ? DeDict
      : lang === "tr"
      ? TrDict
      : lang === "en"
      ? EnDict : EnDict


  const setLanguage = (newLang: string) => {
    if (newLang !== lang) {
      const currentPath = window.location.pathname;
      const localizedUrl = getLocalizedUrl(currentPath, newLang);
      router.push(localizedUrl);
    }
  };

  return {
    t: (key: string) => getNestedTranslation(dict, key) || key,
    locale: lang || defaultLang,
    setLanguage,
  };
};
