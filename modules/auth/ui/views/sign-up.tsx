"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Logo from "@/components/logo";
import SignUpForm from "../components/signup-form";

interface SignUpViewProps {
  role?: string;
}

const SignUpView = ({ role }: SignUpViewProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRole, setSelectedRole] = useState<string | undefined>(role);

  useEffect(() => {
    setSelectedRole(role);
  }, [role]);

  const handleRoleSelect = (newRole: string) => {
    setSelectedRole(newRole);
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("role", newRole);
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-start justify-center gap-10 w-full max-w-md">
        <Logo width={200} height={200} />
        {!selectedRole && (
          <div className="flex flex-col gap-4 w-full">
            <button
              className="w-full py-4 rounded-lg font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md hover:opacity-90 transition-all"
              onClick={() => handleRoleSelect("user")}
            >
              Hayran olarak kayıt ol
            </button>
            <button
              className="w-full py-4 rounded-lg font-bold text-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md hover:opacity-90 transition-all"
              onClick={() => handleRoleSelect("creator")}
            >
              İçerik üreticisi olarak kayıt ol
            </button>
          </div>
        )}
        {selectedRole && (
          <>
            <SignUpForm role={selectedRole} />
            <button
              className="mt-4 text-sm text-gray-500 underline hover:text-pink-600"
              onClick={() => handleRoleSelect("")}
              type="button"
            >
              Rolü değiştir
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUpView;
