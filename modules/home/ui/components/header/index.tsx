import Logo from "@/components/logo";
import Menu from "./menu";
import { DictionaryType } from "@/lib/utils/getDictionary";

const Header = ({ dict }: { dict: DictionaryType }) => {
  return (
    <header className="bg-white w-full px-5 md:px-10 py-5 border-b border-gray-100 shadow-sm flex items-center justify-between">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <Logo width={150} height={150} />
        <Menu dict={dict} />
      </div>
    </header>
  );
};

export default Header;
