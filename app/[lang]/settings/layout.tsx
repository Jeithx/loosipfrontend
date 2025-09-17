import MainLayout from "@/components/main-layout";
import Sidebar from "@/modules/settings/ui/components/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MainLayout>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="flex-1 w-full border-l border-r border-gray-200 pb-10 overflow-y-auto h-screen scrollbar-hide">
          {children}
        </div>
      </div>
    </MainLayout>
  );
};

export default Layout;
