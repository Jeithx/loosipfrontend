import AvatarProfile from "@/components/custom/avatar-profile";
import moment from "moment";
import { Icons } from "@/components/icons";
import { Post } from "@/lib/types";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { deleteById } from "@/app/[lang]/helpers/httpEntity.service";
import { APIURLS } from "@/app/[lang]/helpers/APIURLS";
import { useState, useRef, useEffect } from "react";

interface PostHeaderProps {
  post: Post;
  onPostDeleted?: () => void;
}

const PostHeader = ({ post, onPostDeleted }: PostHeaderProps) => {
  const pathname = usePathname();
  const isFeedPage = pathname.includes('/feed');
  const params = useParams();
  const username = params?.username;
  const user = useAuthStore((state) => state.user);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentUserName = user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] as string | undefined;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const deletePost = async (postId: number) => {
    if (!confirm("Bu postu silmek istediğinizden emin misiniz?")) {
      return;
    }

    setIsDeleting(true);
    setShowDropdown(false);
    try { 
      const response = await deleteById(APIURLS.POST, postId);
      onPostDeleted?.();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Post silinirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDotsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    deletePost(post.id);
  };
    const router = useRouter();
const routeUser = (username: string) => {
    router.push(`/${username}`);
};
  return (
    <div className="flex items-center gap-3 px-4 pt-4 pb-2">
      <AvatarProfile  name={post.userDisplayName} size="md" />
      <div
         onClick={() => routeUser(post.userName)}
      className="flex flex-col flex-1 min-w-0">
        <span className="font-semibold text-base truncate">{post.userDisplayName}</span>
        <span className="text-xs text-gray-500 truncate">
          @{post.userName}
        </span>
      </div>
      {post.isNsfw && (
        <span className="bg-[#cb0c9f] text-white text-xs font-bold rounded-xl px-3 py-1 mr-2">
          PPV
        </span>
      )}
      <span className="text-xs text-gray-400 whitespace-nowrap">
        {moment(post.creationDate).fromNow(true)} ago
      </span>
      {(!isFeedPage && currentUserName == username) && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={handleDotsClick}
            disabled={isDeleting}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
            title="Seçenekler"
          >
            <Icons.dots className="size-4 text-gray-500" />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px] z-50">
              <button
                onClick={handleDeleteClick}
                disabled={isDeleting}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Icons.trash className="size-4" />
                {isDeleting ? "Siliniyor..." : "Sil"}
              </button>
              {/* Gelecekte düzenleme seçeneği buraya eklenebilir */}
              {/* 
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Icons.edit className="size-4" />
                Düzenle
              </button>
              */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostHeader;