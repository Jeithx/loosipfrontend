"use client";
import { TRPCProvider } from "@/trpc/client";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import AgeModal from "@/components/custom/modals/age-modal";
import Preloader from "@/components/custom/preloader";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 600); // min 600ms göster
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <TRPCProvider>
      <Toaster />
      <AgeModal />
      {loading && <Preloader />}
      <NuqsAdapter>
        <main>{children}</main>
      </NuqsAdapter>
    </TRPCProvider>
  );
};

export default Provider;
