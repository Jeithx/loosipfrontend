import SignUpView from "@/modules/auth/ui/views/sign-up";

const Page = async ({ searchParams }: { searchParams: Promise<{ role: string }> }) => {
  const { role } = await searchParams;
  return <SignUpView role={role} />;
};

export default Page;