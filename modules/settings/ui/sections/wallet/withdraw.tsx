"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import InputElement from "@/components/custom/form-elements/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import CustomSelect from "@/components/custom/form-elements/custom-select";
import { useTranslation } from "@/hooks/use-translation";

const withdrawSchema = z
  .object({
    amount: z
      .number({ invalid_type_error: "Amount is required" })
      .min(20, "Minimum $20")
      .max(500, "Maximum $500"),
    paymentMethod: z.string().min(1, "Select a payment method"),
    bankAccount: z.string().optional(),
    message: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "bank") {
        return !!data.bankAccount && data.bankAccount.length > 0;
      }
      return true;
    },
    {
      message: "Bank account is required for bank transfer",
      path: ["bankAccount"],
    }
  );

type WithdrawFormValues = z.infer<typeof withdrawSchema>;

const WithdrawSection = () => {
  const { t } = useTranslation();
  const form = useForm<WithdrawFormValues>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      amount: 20,
      paymentMethod: "bank",
      bankAccount: "",
      message: "",
    },
  });

  const onSubmit = (data: WithdrawFormValues) => {
    console.log(data);
  };

  const selected = form.watch("paymentMethod");
  const pendingBalance = 11067.04;

  const paymentOptions = [
    { label: t("settingsPages.wallet.withdraw.bank"), value: "bank" },
    { label: t("settingsPages.wallet.withdraw.paypal"), value: "paypal" },
    { label: t("settingsPages.wallet.withdraw.stripe"), value: "stripe" },
    { label: t("settingsPages.wallet.withdraw.crypto"), value: "crypto" },
  ];

  return (
    <motion.div
      className="w-full p-5 flex flex-col gap-6"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-base text-gray-500 flex items-center gap-1">
          {t("settingsPages.wallet.withdraw.pendingBalance")} (
          <span className="font-bold text-gray-700">
            $
            {pendingBalance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
          )
        </span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="flex items-center h-12 py-0 bg-white rounded-lg overflow-hidden border border-slate-200 focus-within:ring-2 focus-within:ring-blue-400">
            <span className="flex items-center my-0 bg-slate-100 h-12 w-12 justify-center text-slate-500 text-xl">
              <span role="img" aria-label="money">
                💵
              </span>
            </span>
            <InputElement
              form={form}
              name="amount"
              className="h-auto flex-1 py-3 px-2 bg-transparent shadow-none outline-none border-0 text-lg text-slate-700 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder={t("settingsPages.wallet.withdraw.amountPlaceholder")}
              type="number"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <Label className="text-sm text-gray-600 mb-1">
                {t("settingsPages.wallet.withdraw.paymentMethod")}
              </Label>
              <CustomSelect
                value={form.watch("paymentMethod")}
                onChange={(value: any) => form.setValue("paymentMethod", value)}
                options={paymentOptions}
                placeholder={t("settingsPages.wallet.withdraw.selectPayment")}
                height="44px"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-sm text-gray-600 mb-1">
                {t("settingsPages.wallet.withdraw.bankAccount")}
              </Label>
              <InputElement
                form={form}
                name="bankAccount"
                placeholder={t(
                  "settingsPages.wallet.withdraw.bankAccountPlaceholder"
                )}
                className="h-11"
                disabled={selected !== "bank"}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-sm text-gray-600 mb-1">
              {t("settingsPages.wallet.withdraw.message")}
            </Label>
            <textarea
              {...form.register("message")}
              className="h-20 px-3 py-2 rounded-lg border border-slate-200 bg-white text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 transition resize-none"
              placeholder={t(
                "settingsPages.wallet.withdraw.messagePlaceholder"
              )}
            />
          </div>
          <Button
            type="submit"
            className="mt-2 w-full text-sm h-11 font-semibold bg-pink-600 hover:bg-pink-700"
          >
            {t("settingsPages.wallet.withdraw.request")}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
};

export default WithdrawSection;
