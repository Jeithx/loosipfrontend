import Logo from "@/components/logo";
import ResetForm from "../components/reset-form";

const ResetPasswordView = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-start justify-center gap-10 w-full max-w-md">
        <Logo width={200} height={200} />
        <ResetForm />
      </div>
    </div>
  );
};

export default ResetPasswordView;
