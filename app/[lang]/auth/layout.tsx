import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-center justify-center">
      <div className="w-full md:w-1/2 flex items-start px-5 lg:px-10 z-10">
        {children}
      </div>
      <div
        className="hidden md:block w-1/2 h-full"
        style={{
          backgroundImage:
            "linear-gradient(310deg, rgb(121, 40, 202), rgb(255, 0, 128))",
          backgroundRepeat: "repeat-x",
          boxSizing: "border-box",
          color: "rgb(72, 73, 74)",
        }}
      >
        <Image
          src="/assets/svgs/auth-layout.svg"
          alt="auth-bg"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Layout;
