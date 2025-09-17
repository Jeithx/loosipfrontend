import { Button } from "@/components/ui/button";
import { DictionaryType } from "@/lib/utils/getDictionary";

const AskQuestion = ({ dict }: { dict: DictionaryType }) => {
  return (
    <section className="w-full py-16 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 max-w-xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold text-[#48494a]">
          {dict["HomePage"]["footer"]["gotQuestions"]}
        </h3>
        <span className="text-lg text-[#48494a] text-center">
          {dict["HomePage"]["footer"]["contactUs"]}
        </span>
        <Button
          className="mt-2 px-8 py-3 rounded-full bg-gradient-to-tr from-[#7928ca] to-[#ff0080] text-white font-semibold text-base shadow-md hover:opacity-90 transition-all duration-200"
          asChild
        >
          <span>{dict["HomePage"]["footer"]["contact"]}</span>
        </Button>
      </div>
    </section>
  );
};

export default AskQuestion;
