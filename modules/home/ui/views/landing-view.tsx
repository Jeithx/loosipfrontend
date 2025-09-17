import { Locale } from "@/configs/i18n";
import Footer from "../components/footer";
import Header from "../components/header";
import AskQuestion from "../sections/ask-question";
import BecomeCreator from "../sections/become-creator";
import Featured from "../sections/featured";
import Features from "../sections/features";
import Hero from "../sections/hero";
import { DictionaryType } from "@/lib/utils/getDictionary";

const LandingView = ({ dict }: { dict: DictionaryType }) => {
  return (
    <>
      <Header dict={dict} />
      <Hero />
      <BecomeCreator />
      <Features />
      <Featured />
      <AskQuestion dict={dict}  />
      <Footer />
    </>
  );
};

export default LandingView;
