"use client";
import { Input } from "@/components/ui/input";
import Posts from "../sections/posts";
import Sidebar from "../sections/sidebar";
import Suggestions from "../sections/suggestions";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, User } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { getByParams } from "@/app/[lang]/helpers/httpEntity.service";
import { APIURLS } from "@/app/[lang]/helpers/APIURLS";
import { UserDetail } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const FeedView = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UserDetail[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [tab, setTab] = useState("followed");
  const searchRef = useRef<HTMLDivElement>(null);
const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const searchUsers = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await getByParams(APIURLS.USER_SEARCH, { username: query });
      setSearchResults([response.data] as UserDetail[]);
      setShowSearchResults(true);
    } catch (ex) {
      console.error("Error searching users:", ex);
      setSearchResults([]);
      setShowSearchResults(false);
    } finally {
      setIsSearching(false);
    }
  };
  const debouncedSearch = useCallback((query: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      searchUsers(query);
    }, 300);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      setIsSearching(false);
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      return;
    }
    setIsSearching(true);
    debouncedSearch(query);
  };

  const handleUserClick = (username: string) => {
    router.push(`/${username}`);
    setShowSearchResults(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearchFocus = () => {
    if (searchQuery.trim() && searchResults?.length > 0) {
      setShowSearchResults(true);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className="flex w-full justify-center h-screen overflow-hidden relative">
      <div className="absolute top-3 left-3 z-30 md:hidden">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <button aria-label="Open sidebar">
              <Menu className="size-6 text-gray-700" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[90vw] max-w-xs">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      <main className="flex-1 w-full  h-screen overflow-y-auto scrollbar-hide pt-6">
        <div className="mb-4 relative" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              className="rounded-xl text-base shadow-none pl-11 pr-5 py-3 bg-gray-50 border border-gray-100 lg:border-gray-200 focus:border-[#cb0c9f] focus:ring-2 focus:ring-[#cb0c9f]/20 transition"
            />
            {isSearching && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-[#cb0c9f]"></div>
              </div>
            )}
          </div>

          {showSearchResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-lg z-50 max-h-80 overflow-y-auto">
              {searchResults?.length > 0 ? (
                <div className="py-2">
                  {searchResults?.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleUserClick(user.userName)}
                      className="w-full px-4 py-3 hover:bg-gray-50 transition-colors duration-150 text-left flex items-center gap-3"
                    >
                      <div className="flex-shrink-0">
                        {user.profilePictureUrl ? (
                          <img
                            src={user.profilePictureUrl}
                            alt={user.displayName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {user.displayName}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          @{user.userName}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-6 text-center text-gray-500">
                  {isSearching ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-[#cb0c9f]"></div>
                      <span>Searching...</span>
                    </div>
                  ) : searchQuery.trim() ? (
                    <div>
                      <Search className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                      <p>No users found for "{searchQuery}"</p>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          )}
        </div>
        <Tabs value={tab} onValueChange={setTab} className="w-full  mx-auto mb-4">
          <TabsList className="w-full">
            <TabsTrigger value="followed" className="flex-1">Sana Özel</TabsTrigger>
            <TabsTrigger value="random" className="flex-1">Keşfet</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="w-full mx-auto">
          {tab === "followed" && <Posts type="followed" />}
          {tab === "random" && <Posts type="random" />}
        </div>
      </main>
    </div>
  );
};

export default FeedView;