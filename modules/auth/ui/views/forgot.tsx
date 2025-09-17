import Logo from "@/components/logo";
import ForgotForm from "../components/forgot-password-form";

const ForgotView = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-start justify-center gap-10 w-full max-w-md">
        <Logo width={200} height={200} />
        <ForgotForm />
      </div>
    </div>
  );
};

export default ForgotView;
