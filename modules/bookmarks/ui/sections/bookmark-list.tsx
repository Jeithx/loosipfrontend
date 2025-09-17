"use client"
import { bookmarkPosts } from "@/lib/mockData";
import PostItem from "@/modules/feed/ui/components/post-item";
import { useQueryState } from "nuqs";

const BookmarkList = () => {
    const [tab] = useQueryState("tab", { defaultValue: "all" });

    const filtered = bookmarkPosts.filter((post) => {
        if (tab === "all") return true;
        if (tab === "photos") return post.media?.some(m => m.type === "image");
        if (tab === "videos") return post.media?.some(m => m.type === "video");
        if (tab === "audio") return post.media?.some(m => m.type === "audio");
        if (tab === "locked") return true; // TODO: add locked logic if needed
        return true;
    });

    return (
        <div className="flex-1 flex flex-col divide-y divide-gray-100 overflow-y-auto h-screen scrollbar-hide">
            {filtered.length === 0 ? (
                <div className="p-8 text-center text-gray-400">No bookmarks found.</div>
            ) : (
                filtered.map((post) => <PostItem key={post.id} post={post as any} />)
            )}
        </div>
    );
}

export default BookmarkList;