import Sidebar from "@/modules/feed/ui/sections/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full max-w-7xl mx-auto">
      <aside className="hidden md:block md:w-[240px] lg:w-[300px] xl:w-[350px] min-h-screen sticky top-0">
        <Sidebar />
      </aside>
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
};

export default MainLayout;
