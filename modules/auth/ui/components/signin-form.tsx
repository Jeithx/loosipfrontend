"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputElement from "@/components/custom/form-elements/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { pageUrls } from "@/lib/enums/page-urls";
import { SIGN_IN_SCHEMA } from "@/lib/constants/form.constants";
import { BlurFade } from "@/components/magicui/blur-fade";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { trpc } from "@/trpc/client";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { postByParams } from "@/app/[lang]/helpers/httpEntity.service";
import { APIURLS } from "@/app/[lang]/helpers/APIURLS";

type SignInFormValues = z.infer<typeof SIGN_IN_SCHEMA>;

const SignInForm = ({ role }: { role?: string }) => {
  const { t } = useTranslation();
  const [localRole, setLocalRole] = useState<string | undefined>(
    role ?? "creator"
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SIGN_IN_SCHEMA),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginContentCreator, isPending: isLoggingInCreator } =
    trpc.auth.loginContentCreator.useMutation({
      onSuccess: (response) => {
        const { token, expiration } = response.data;
        useAuthStore.getState().setToken(token, expiration);
        router.push(pageUrls.FEED);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to login");
      },
    });

  const { mutate: loginFan, isPending: isLoggingInFan } =
    trpc.auth.loginFan.useMutation({
      onSuccess: (response) => {
        const { token, expiration } = response.data;
        useAuthStore.getState().setToken(token, expiration);
        router.push(pageUrls.FEED);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to login");
      },
    });

  const onSubmit = async (values: SignInFormValues) => {
    setLoading(true);
    try {
      if (localRole === "creator") {
        const response = await postByParams(APIURLS.AUTH_LOGIN_CREATOR, values);
        if (response.success) {
          const { token, expiration } = response.data;
          useAuthStore.getState().setToken(token, expiration);
          router.push(pageUrls.FEED);
        }
        // loginContentCreator(values);
      } else {
        const response = await postByParams(APIURLS.AUTH_LOGIN_FAN, values);
        if (response.success) {
          const { token, expiration } = response.data;
          useAuthStore.getState().setToken(token, expiration);
          router.push(pageUrls.FEED);
        }
        //  loginFan(values);
      }
    }
    catch (exx:any) {
      console.error("Login error:", exx);
      toast.error( exx.response.data.message||"Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlurFade
      key={localRole || "fan"}
      duration={0.5}
      direction="up"
      className="w-full"
    >
      <Form {...form}>
        {localRole === "creator" && (
          <div className="w-full mb-4 flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold text-gradient bg-gradient-to-tr from-[#7928ca] to-[#ff0080] bg-clip-text text-transparent mb-2">
              {t('signIn.welcomeBackCreator')}
            </h2>
            <p className="text-gray-500 max-w-xs">
              {t('signIn.creatorDescription')}
            </p>
          </div>
        )}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 items-center justify-center w-full"
        >
          <InputElement
            form={form}
            name="email"
            placeholder={t('signIn.emailPlaceholder')}
            type="email"
          />
          <InputElement
            form={form}
            name="password"
            placeholder={t('signIn.passwordPlaceholder')}
            type="password"
          />
          <div className="w-full flex justify-end mb-2">
            <Link
              href={pageUrls.AUTH.FORGOT}
              className="text-sm text-[#7928ca] hover:underline"
            >
              {t('signIn.forgotPassword')}
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full px-6 h-12 text-base rounded-lg font-semibold shadow-md text-white border-0 hover:opacity-90 transition-all duration-200"
            style={{
              backgroundColor: "rgb(203, 12, 159)",
              backgroundImage:
                "linear-gradient(310deg, rgb(121, 40, 202), rgb(255, 0, 128))",
              boxShadow: "0 2px 16px 0 rgba(121,40,202,0.10)",
            }}
            disabled={isLoggingInCreator || isLoggingInFan || loading}
          >
            {(isLoggingInCreator || isLoggingInFan || loading) ? (
              <Loader2 className="animate-spin" />
            ) : (
              t('signIn.signIn')
            )}
          </Button>
        </form>
        <div className="flex flex-col items-center justify-center w-full">
          <Separator className="w-full" />
          <p className="text-gray-500 text-center w-full pt-4">
            {t('signIn.noAccount')}
            <Link
              href={pageUrls.AUTH.SIGN_UP}
              prefetch
              className="text-[#7928ca] hover:underline"
            >
              {t('signIn.signUp')}
            </Link>
          </p>
          {localRole === "creator" ? (
            <p className="text-sm text-gray-500 text-center w-full pt-2.5">
              {t('signIn.wantFan')}
              <button
                type="button"
                className="text-[#ff0080] font-semibold hover:underline bg-transparent border-0 outline-none cursor-pointer"
                onClick={() => {
                  setLocalRole("fan");
                  router.push(`${pageUrls.AUTH.SIGN_IN}?role=fan`);
                }}
              >
                {t('signIn.clickHere')}
              </button>
            </p>
          ) : (
            <p className="text-sm text-gray-500 text-center w-full pt-2.5">
              {t('signIn.wantCreator')}
              <button
                type="button"
                className="text-[#ff0080] font-semibold hover:underline bg-transparent border-0 outline-none cursor-pointer"
                onClick={() => {
                  setLocalRole("creator");
                  router.push(`${pageUrls.AUTH.SIGN_IN}?role=creator`);
                }}
              >
                {t('signIn.clickHere')}
              </button>
            </p>
          )}
        </div>
      </Form>
    </BlurFade>
  );
};

export default SignInForm;
