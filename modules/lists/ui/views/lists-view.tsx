"use client";
import { useState } from "react";
import Navbar from "../components/navbar";
import List from "../sections/list";
import { initialLists } from "@/lib/mockData";
import { toast } from "sonner";
import { DictionaryType } from "@/lib/utils/getDictionary";

const ListsView = ({ dict }: { dict: DictionaryType }) => {
  const [lists, setLists] = useState(initialLists);

  const handleAddList = (name: string) => {
    const exists = lists.some(
      (l) => l.title.trim().toLowerCase() === name.trim().toLowerCase()
    );
    if (exists) {
      toast.error("A list with this name already exists");
      return;
    }
    setLists((prev) => [
      ...prev,
      {
        key: name.toLowerCase().replace(/\s+/g, "-"),
        title: name,
        people: 0,
        posts: 0,
        avatars: [],
      },
    ]);
    toast.success("List created successfully");
  };

  return (
    <div className="border-r border-l border-gray-200 h-full">
      <Navbar onAddList={handleAddList} dict={dict} />
      <List lists={lists} />
    </div>
  );
};

export default ListsView;
