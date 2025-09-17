import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface AvatarProfileProps {
  image?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const gradients = [
  "from-[#ff5f96] via-[#ff80bf] to-[#ffb6ea]",
  "from-[#ff80bf] via-[#ff5f96] to-[#ffb6ea]",
  "from-[#ffb6ea] via-[#ff5f96] to-[#ff80bf]",
  "from-[#ff5f96] via-[#ff80bf] to-[#ff61a6]",
  "from-[#ff61a6] via-[#ff80bf] to-[#ffb6ea]",
  "from-[#ff80bf] via-[#ff61a6] to-[#ffb6ea]",
];

function getGradientIndex(name: string) {
  let hash = 0;
  for (let i = 0; i < name?.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % gradients.length;
}

const AvatarProfile = ({
  image,
  name,
  size = "md",
  className,
}: AvatarProfileProps) => {
  const hasImage = Boolean(image);
  const gradient = gradients[getGradientIndex(name)];
  return (
    <Avatar
      className={cn(
        "w-10 h-10",
        size === "sm" && "w-8 h-8",
        size === "lg" && "w-12 h-12",
        !hasImage &&
          `bg-gradient-to-tr ${gradient} text-white font-bold flex items-center justify-center`,
        className
      )}
    >
      {hasImage ? <AvatarImage src={image} /> : null}
      <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarProfile;
