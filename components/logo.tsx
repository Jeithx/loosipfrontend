import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo = ({ width = 100, height = 100 }: LogoProps) => {
  return (
    <Link href="/">
      <Image
        src="/assets/images/loosip-logo.png"
        alt="Loosip"
        width={width}
        height={height}
        className="pointer-events-none"
      />
    </Link>
  );
};

export default Logo;
