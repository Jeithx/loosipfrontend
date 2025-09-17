import AvatarProfile from "@/components/custom/avatar-profile";
import { Ellipsis } from "lucide-react";

const ChatHeader = ({ user }: { user: any }) => {
  const goUser=(name:string)=>{
    window.location.href = `/${name}`;
  }
  return (
    <div className="flex items-center justify-between px-8 py-[1.125rem] bg-gradient-to-r from-white via-slate-50 to-white rounded-t-2xl border-b border-slate-200">
      <div className="flex items-center gap-4">
        <div className="relative" onClick={() => goUser(user.username)} style={{ cursor: 'pointer' }}>
          <AvatarProfile name={user.name} image={user.image} size="sm" />
          {user.online && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full shadow" />
          )}
        </div>
        <span className="font-semibold text-gray-800 text-base tracking-tight">
          {user.name}
        </span>
      </div>
      <Ellipsis className="size-5 text-gray-400" />
    </div>
  );
};

export default ChatHeader;
