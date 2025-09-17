"use client";
import Suggestions from "@/modules/feed/ui/sections/suggestions";
import SearchBox from "../components/search-box";
import TabsBar from "../components/tabs";
import { useQueryState } from "nuqs";
import Live from "../sections/live";
import Top from "../sections/top";
import People from "../sections/people";
import Photos from "../sections/photos";
import Videos from "../sections/videos";

const SearchView = () => {
  const [activeTab, setActiveTab] = useQueryState("tab", { defaultValue: "live" });
  const lowerCaseActiveTab = activeTab.toLowerCase();
  return (
    <div className="flex gap-5 items-start w-full">
      <div className="flex-1 border-r border-l border-gray-200 h-screen overflow-y-auto scrollbar-hide">
        <SearchBox activeTab={lowerCaseActiveTab} />
        <TabsBar activeTab={activeTab} setActiveTab={setActiveTab} />
        {lowerCaseActiveTab === "live" && <Live />}
        {lowerCaseActiveTab === "top" && <Top />}
        {lowerCaseActiveTab === "people" && <People />}
        {lowerCaseActiveTab === "photos" && <Photos />}
        {lowerCaseActiveTab === "videos" && <Videos />}
      </div>
      <Suggestions />
    </div>
  );
};

export default SearchView;
