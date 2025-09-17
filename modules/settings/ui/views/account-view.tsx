"use client";
import { Form } from "@/components/ui/form";
import Head from "../components/head";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputElement from "@/components/custom/form-elements/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";
import { update } from "@/app/[lang]/helpers/httpEntity.service";
import { APIURLS } from "@/app/[lang]/helpers/APIURLS";
import { toast } from "sonner";

const formSchema = z.object({
  password: z.string().min(8),
  newPassword: z.string().min(8),
  confirmPassword: z.string().min(8),
});

const AccountView = () => {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await update(APIURLS.CHANGE_PASSWORD, {
        password: data.password,
        newPassword: data.newPassword,
        newPasswordRepeat: data.confirmPassword,
      });
      if (response) {
        toast.success(t('Şifre değiştirildi'));
        form.reset();
      }

    } catch (error: any) {
      toast.error(t(error.response.data.message));
    }
  }

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Head title={t('settingsPages.account.headTitle')} description={t('settingsPages.account.headDescription')} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full mt-5 px-5">
          <div className="flex flex-col gap-5">
            <InputElement form={form} name="password" label={t('settingsPages.account.currentPassword')} placeholder={t('settingsPages.account.currentPasswordPlaceholder')} className="shadow-none h-11" />
            <InputElement form={form} name="newPassword" label={t('settingsPages.account.newPassword')} placeholder={t('settingsPages.account.newPasswordPlaceholder')} className="shadow-none h-11" />
            <InputElement form={form} name="confirmPassword" label={t('settingsPages.account.confirmPassword')} placeholder={t('settingsPages.account.confirmPasswordPlaceholder')} className="shadow-none h-11" />
            <Button type="submit" className="w-full">{t('settingsPages.account.save')}</Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default AccountView; 