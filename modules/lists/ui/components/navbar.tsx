import NewListModal from "@/components/custom/modals/new-list-modal";
import { DictionaryType } from "@/lib/utils/getDictionary";
import { Plus } from "lucide-react";

interface NavbarProps {
  dict: DictionaryType;
  onAddList: (name: string) => void;
}

const Navbar = ({ dict, onAddList }: NavbarProps) => {
  return (
    <div className="flex items-center justify-between w-full p-4 border-b border-gray-200">
      <span className="text-xl font-medium">{dict["listPage"]["title"]}</span>
      <NewListModal onAddList={onAddList}>
        <Plus className="size-5 text-primary cursor-pointer" />
      </NewListModal>
    </div>
  );
};

export default Navbar;
