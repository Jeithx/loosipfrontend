"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { VERIFY_CODE_SCHEMA } from "@/lib/constants/form.constants";
import { useTranslation } from "@/hooks/use-translation";

type VerifyFormValues = z.infer<typeof VERIFY_CODE_SCHEMA>;

const VerifyForm = () => {
  const { t } = useTranslation();
  const form = useForm<VerifyFormValues>({
    resolver: zodResolver(VERIFY_CODE_SCHEMA),
    defaultValues: { code: "" },
  });

  const onSubmit = (values: VerifyFormValues) => {
    console.log(values);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6 items-start justify-center w-full"
    >
      <div className="text-left text-gray-500 text-base font-medium">
        {t('verify.instructions')}
      </div>
      <InputOTP
        maxLength={6}
        value={form.watch("code")}
        onChange={(value) => form.setValue("code", value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
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
        {t('verify.verify')}
      </Button>
    </form>
  );
};

export default VerifyForm;
