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
import { FORGOT_PASSWORD_SCHEMA } from "@/lib/constants/form.constants";
import { useTranslation } from "@/hooks/use-translation";

type ForgotPasswordFormValues = z.infer<typeof FORGOT_PASSWORD_SCHEMA>;

const ForgotPasswordForm = () => {
  const { t } = useTranslation();
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(FORGOT_PASSWORD_SCHEMA),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ForgotPasswordFormValues) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 items-center justify-center w-full"
      >
        <InputElement form={form} name="email" placeholder={t('forgot.emailPlaceholder')} type="email" />
        <Button
          type="submit"
          className="w-full px-6 h-12 text-base rounded-lg font-semibold shadow-md text-white border-0 hover:opacity-90 transition-all duration-200"
          style={{
            backgroundColor: "rgb(203, 12, 159)",
            backgroundImage: "linear-gradient(310deg, rgb(121, 40, 202), rgb(255, 0, 128))",
            boxShadow: "0 2px 16px 0 rgba(121,40,202,0.10)",
          }}
        >
          {t('forgot.resetPassword')}
        </Button>
      </form>
      <div className="flex flex-col items-center justify-center w-full">
        <Separator className="w-full" />
        <p className="text-gray-500 text-center w-full pt-4">
          {t('forgot.remembered')}
          <Link
            href={pageUrls.AUTH.SIGN_IN}
            prefetch
            className="text-[#7928ca] hover:underline"
          >
            {t('forgot.signIn')}
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default ForgotPasswordForm;
