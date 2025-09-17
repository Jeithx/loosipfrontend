"use client";
import { useRef } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputElement from "@/components/custom/form-elements/input";
import { Form } from "@/components/ui/form";
import { useTranslation } from "@/hooks/use-translation";

interface NewListModalProps {
  children: React.ReactNode;
  onAddList?: (name: string) => void;
}

const NewListModal = ({ children, onAddList }: NewListModalProps) => {
  const { t } = useTranslation();
  const listSchema = z.object({
    name: z.string().min(1, t('listPage.nameRequired')),
  });
  type ListForm = z.infer<typeof listSchema>;
  const ref = useRef<HTMLButtonElement>(null);
  const form = useForm<ListForm>({
    resolver: zodResolver(listSchema),
    defaultValues: { name: "" },
  });

  const handleSave = (data: ListForm) => {
    if (onAddList) onAddList(data.name);
    form.reset();
    ref.current?.click();
  };

  return (
    <Dialog>
      <DialogClose ref={ref} />
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-md rounded-2xl p-0 bg-white border-0 shadow-2xl overflow-hidden">
        <DialogHeader className="relative">
          <DialogTitle className="flex items-center gap-2 pt-5 pb-2 px-5 text-xl font-medium text-slate-800">
            {t('listPage.create')}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="px-5 pb-6 flex flex-col gap-6"
            onSubmit={form.handleSubmit(handleSave)}
          >
            <InputElement
              form={form}
              name="name"
              errorMsg={false}
              placeholder={t('listPage.namePlaceholder')}
              className="bg-white border border-gray-200 rounded-md shadow-none h-12 text-base"
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-8 py-2 shadow-none text-base"
              >
                {t('listPage.save')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewListModal;
