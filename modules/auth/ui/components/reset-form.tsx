"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputElement from "@/components/custom/form-elements/input";
import { Button } from "@/components/ui/button";
import { RESET_PASSWORD_SCHEMA } from "@/lib/constants/form.constants";
import { useTranslation } from "@/hooks/use-translation";

type ResetFormValues = z.infer<typeof RESET_PASSWORD_SCHEMA>;

const ResetForm = () => {
  const { t } = useTranslation();
  const form = useForm<ResetFormValues>({
    resolver: zodResolver(RESET_PASSWORD_SCHEMA),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: ResetFormValues) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 items-center justify-center w-full"
      >
        <InputElement
          form={form}
          name="password"
          placeholder={t('reset.newPasswordPlaceholder')}
          type="password"
        />
        <InputElement
          form={form}
          name="confirmPassword"
          placeholder={t('reset.confirmNewPasswordPlaceholder')}
          type="password"
        />
        <Button
          type="submit"
          className="w-full px-6 h-12 text-base rounded-lg font-semibold shadow-md text-white border-0 hover:opacity-90 transition-all duration-200"
          style={{
            backgroundColor: "rgb(203, 12, 159)",
            backgroundImage:
              "linear-gradient(310deg, rgb(121, 40, 202), rgb(255, 0, 128))",
            boxShadow: "0 2px 16px 0 rgba(121,40,202,0.10)",
          }}
        >
          {t('reset.resetPassword')}
        </Button>
      </form>
    </Form>
  );
};

export default ResetForm;