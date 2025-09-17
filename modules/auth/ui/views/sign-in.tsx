import Logo from "@/components/logo";
import SignInForm from "../components/signin-form";

const SignInView = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-start justify-center gap-10 w-full max-w-md">
        <Logo width={200} height={200} />
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInView;
