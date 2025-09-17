"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import InputElement from "@/components/custom/form-elements/input";
import { Form } from "@/components/ui/form";
import { Paperclip, Upload, X } from "lucide-react";

const messageSchema = z.object({
  message: z.string().min(1, "Type a message..."),
  file: z.any().optional(),
});

type MessageForm = z.infer<typeof messageSchema>;

const ChatInput = ({ onSend }: { onSend: (data: MessageForm) => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useForm<MessageForm>({
    resolver: zodResolver(messageSchema),
    defaultValues: { message: "", file: undefined },
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue("file", file);
    }
  };

  const handleSend = form.handleSubmit((data) => {
    onSend(data);
    form.reset();
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  });

  return (
    <Form {...form}>
      <form
        onSubmit={handleSend}
        className="flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-white via-slate-50 to-white border-t border-slate-100 rounded-b-2xl shadow-sm"
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept="image/*,video/*,application/pdf"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-10 h-10 rounded-full bg-slate-100 hover:bg-pink-100 transition shadow-sm flex items-center justify-center focus:ring-2 focus:ring-pink-200"
          title="Attach file"
        >
          <Upload className="size-4 text-pink-400 group-hover:text-pink-500 transition" />
        </button>
        <div className="flex-1">
          <InputElement
            form={form}
            name="message"
            errorMsg={false}
            placeholder="Type your message..."
            className="h-11 shadow-none rounded-full bg-slate-100 px-4 border-0 focus:ring-2 focus:ring-pink-200 text-gray-700 placeholder:text-gray-400"
          />
        </div>
        <motion.button
          type="submit"
          className="ml-2 px-4 py-2 rounded-full bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 text-white font-semibold shadow-md hover:from-pink-500 hover:to-pink-700 transition flex items-center gap-2 focus:ring-2 focus:ring-pink-200"
          whileTap={{ scale: 0.97 }}
        >
          <span className="hidden sm:inline">Send</span>
        </motion.button>
        <AnimatePresence>
          {selectedFile && (
            <motion.div
              key="selected-file"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="ml-2 absolute bottom-28 left-3 flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-xl text-sm shadow-md border border-pink-200"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="truncate max-w-[140px] text-pink-700 font-semibold">
                  {selectedFile.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  form.setValue("file", undefined);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="text-pink-500 hover:text-pink-700 transition-colors duration-200"
                aria-label="Remove file"
              >
                <X className="size-3.5"/>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </Form>
  );
};

export default ChatInput;
