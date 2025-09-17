"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import InputElement from "@/components/custom/form-elements/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaypal } from "react-icons/fa";
import { SiStripe, SiCoinbase, SiBitcoin } from "react-icons/si";
import { Banknote } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

const formSchema = z.object({
  amount: z.number().min(1),
  paymentMethod: z.string().min(1),
});

const DepositSection = () => {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      paymentMethod: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  const selected = form.watch("paymentMethod");

  const paymentMethods = [
    {
      value: "paypal",
      label: t('settingsPages.wallet.deposit.paypal'),
      icon: <FaPaypal className="text-[#003087] text-xl" />,
    },
    {
      value: "stripe",
      label: t('settingsPages.wallet.deposit.stripe'),
      icon: <SiStripe className="text-[#635bff] text-xl" />,
    },
    {
      value: "coinbase",
      label: t('settingsPages.wallet.deposit.coinbase'),
      icon: <SiCoinbase className="text-[#1652f0] text-xl" />,
    },
    {
      value: "nowpayments",
      label: t('settingsPages.wallet.deposit.nowpayments'),
      icon: <SiBitcoin className="text-[#f7931a] text-xl" />,
    },
    {
      value: "bank",
      label: t('settingsPages.wallet.deposit.bank'),
      icon: <Banknote className="text-green-600 text-xl" />,
    },
  ];

  return (
    <motion.div
      className="flex flex-col gap-6 p-4"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <span className="text-xl font-medium text-gray-600">
        {t('settingsPages.wallet.deposit.proceed')}
      </span>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center h-11 py-0 bg-white rounded-lg overflow-hidden border border-slate-200 focus-within:ring-2 focus-within:ring-blue-400">
            <span className="flex items-center my-0 bg-slate-100 h-11 w-11 justify-center text-slate-500 text-xl">
              $
            </span>
            <InputElement
              form={form}
              name="amount"
              className="h-auto flex-1 py-3 px-2 bg-transparent shadow-none outline-none border-0 text-lg text-slate-700 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder={t('settingsPages.wallet.deposit.enterAmount')}
              type="number"
            />
          </div>
          <RadioGroup
            value={selected}
            onValueChange={(val) => form.setValue("paymentMethod", val)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <AnimatePresence>
              {paymentMethods.map((method) => (
                <motion.div
                  key={method.value}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ scale: 1.03, boxShadow: "0 4px 24px 0 rgba(0,0,0,0.07)" }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative rounded-lg border flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200 bg-white shadow-sm
                    ${selected === method.value ? "border-pink-500 ring-2 ring-pink-200" : "border-slate-200 hover:border-pink-300"}`}
                  onClick={() => form.setValue("paymentMethod", method.value)}
                >
                  <RadioGroupItem
                    value={method.value}
                    id={method.value}
                    className="peer sr-only"
                  />
                  <span className="flex items-center justify-center w-7 h-7 shrink-0">
                    {method.icon}
                  </span>
                  <Label
                    htmlFor={method.value}
                    className="text-base font-medium text-gray-700 cursor-pointer"
                  >
                    {method.label}
                  </Label>
                  {selected === method.value && (
                    <motion.div
                      layoutId="payment-method-active"
                      className="absolute inset-0 rounded-lg border-2 border-pink-500 pointer-events-none"
                      style={{ zIndex: 1 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </RadioGroup>
          <Button type="submit" className="mt-2 w-full h-11 text-base font-semibold">
            {t('settingsPages.wallet.deposit.deposit')}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
};

export default DepositSection;
