import Logo from "@/components/logo";
import VerifyForm from "../components/verify-form";
import { ChevronLeft } from "lucide-react";
import { pageUrls } from "@/lib/enums/page-urls";
import Link from "next/link";

const VerifyView = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-start justify-center gap-10 w-full max-w-md">
        <div className="flex items-center gap-2 w-full">
          <ChevronLeft className="w-4 h-4 stroke-[1.5px] text-muted-foreground" />
          <Link
            href={pageUrls.AUTH.SIGN_IN}
            className="text-muted-foreground hover:underline"
          >
            Back to Sign In
          </Link>
        </div>
        <Logo width={200} height={200} />
        <VerifyForm />
      </div>
    </div>
  );
};

export default VerifyView;
