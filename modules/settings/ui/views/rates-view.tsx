"use client";
import Head from "../components/head";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import InputElement from "@/components/custom/form-elements/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "@/hooks/use-translation";

const ratesSchema = z.object({
  paidProfile: z.boolean(),
  monthly: z.string().min(1),
  threeMonths: z.string().min(1),
  sixMonths: z.string().min(1),
  yearly: z.string().min(1),
  offerEnabled: z.boolean().optional(),
  offerUntil: z.date().optional(),
});

type RatesFormValues = z.infer<typeof ratesSchema>;

const RatesView = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [offerChecked, setOfferChecked] = useState(false);
  const form = useForm<RatesFormValues>({
    resolver: zodResolver(ratesSchema),
    defaultValues: {
      paidProfile: true,
      monthly: "5.99",
      threeMonths: "9.99",
      sixMonths: "14.99",
      yearly: "24.99",
      offerEnabled: false,
      offerUntil: undefined,
    },
  });

  const onSubmit = (data: RatesFormValues) => {
    console.log(data);
  };

  const offerUntil = form.watch("offerUntil");

  return (
    <motion.div
      className="w-full bg-white flex flex-col gap-6"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Head title={t('settingsPages.rates.headTitle')} description={t('settingsPages.rates.headDescription')} />
      <div className="flex items-center gap-3 px-4">
        <Switch
          checked={form.watch("paidProfile")}
          onCheckedChange={(val) => form.setValue("paidProfile", val)}
          id="paidProfile"
          className="data-[state=checked]:bg-pink-600"
        />
        <Label
          htmlFor="paidProfile"
          className="text-base font-medium text-gray-700"
        >
          {t('settingsPages.rates.paidProfile')}
        </Label>
      </div>
      {form.watch("paidProfile") && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 p-4 pt-0"
          >
            <>
              <InputElement
                form={form}
                name="monthly"
                label={t('settingsPages.rates.monthly')}
                className="h-11"
                type="number"
              />
              <InputElement
                form={form}
                name="threeMonths"
                label={t('settingsPages.rates.threeMonths')}
                className="h-11"
                type="number"
              />
              <InputElement
                form={form}
                name="sixMonths"
                label={t('settingsPages.rates.sixMonths')}
                className="h-11"
                type="number"
              />
              <InputElement
                form={form}
                name="yearly"
                label={t('settingsPages.rates.yearly')}
                className="h-11"
                type="number"
              />
              <div className="flex flex-col gap-1">
                <Label className="text-base font-medium text-gray-700 mb-1">
                  {t('settingsPages.rates.isOfferUntil')}
                </Label>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={offerChecked}
                    onCheckedChange={(checked) => {
                      setOfferChecked(!!checked);
                      form.setValue("offerEnabled", !!checked);
                      if (!checked) form.setValue("offerUntil", undefined);
                    }}
                    id="offerEnabled"
                  />
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-40 justify-start font-normal border-gray-200"
                        disabled={!offerChecked}
                      >
                        {offerUntil
                          ? offerUntil.toLocaleDateString()
                          : t('settingsPages.rates.selectDate')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0 border-gray-200"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={offerUntil as Date}
                        onSelect={(date) => {
                          form.setValue("offerUntil", date);
                          setOpen(false);
                        }}
                        fromDate={new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {t('settingsPages.rates.promoInfo')}
                </span>
              </div>
            </>
            <Button
              type="submit"
              className="mt-2 w-full h-11 text-base font-semibold bg-pink-600 hover:bg-pink-700"
            >
              {t('settingsPages.rates.save')}
            </Button>
          </form>
        </Form>
      )}
    </motion.div>
  );
};

export default RatesView;
