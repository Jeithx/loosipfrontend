"use client";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X, Camera } from "lucide-react";

interface NewStreamModalProps {
  children: React.ReactNode;
}

const NewStreamModal = ({ children }: NewStreamModalProps) => {
  const [streamName, setStreamName] = useState("");
  const [accessPrice, setAccessPrice] = useState("");
  const [requiresSubscription, setRequiresSubscription] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [poster, setPoster] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLDialogElement>(null);

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPoster(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    ref.current?.click();
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.97, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
        duration: 0.4,
      },
    },
    exit: { opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      <Dialog>
        <DialogClose
          ref={ref as unknown as React.RefObject<HTMLButtonElement>}
        ></DialogClose>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="max-w-lg rounded-2xl p-0 bg-gradient-to-br from-white via-white to-slate-50 backdrop-blur-xl border-0 shadow-2xl overflow-hidden">
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative"
          >
            <DialogHeader className="relative">
              <DialogTitle className="flex items-center gap-2 pt-5 pb-2 px-5 text-xl font-medium text-slate-800">
                Start a new stream
              </DialogTitle>
            </DialogHeader>
            <form className="px-6 pb-6 pt-2 flex flex-col gap-5">
              <div>
                <Input
                  value={streamName}
                  onChange={(e) => setStreamName(e.target.value)}
                  placeholder="Stream name"
                  className="bg-white border border-gray-200 rounded-md h-10 text-base"
                />
              </div>
              <div>
                <div className="flex items-center bg-white rounded-md overflow-hidden border border-slate-200 focus-within:ring-2 focus-within:ring-blue-400">
                  <span className="flex items-center justify-center px-3 text-slate-500 text-xl">
                    $
                  </span>
                  <Input
                    type="text"
                    value={accessPrice}
                    onChange={(e) =>
                      setAccessPrice(e.target.value.replace(/[^0-9.]/g, ""))
                    }
                    placeholder="Access price"
                    className="h-10 flex-1 py-2 px-2 bg-transparent outline-none border-0 text-base text-slate-700 shadow-none border-l rounded-none placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-base font-medium text-slate-700 mb-1">
                  Stream Poster
                </label>
                <div className="w-full h-40 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handlePosterChange}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="flex flex-col items-center justify-center w-full h-full cursor-pointer relative"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label={poster ? 'Change poster' : 'Upload poster'}
                    tabIndex={0}
                  >
                    {poster ? (
                      <>
                        <Image
                          src={poster}
                          alt="Stream poster"
                          fill
                          className="object-contain rounded-lg"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-500 hover:text-red-500 rounded-full p-1 shadow transition z-10"
                          onClick={e => { e.stopPropagation(); setPoster(null); }}
                          aria-label="Remove poster"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <Image
                          src="/assets/svgs/stream.svg"
                          alt="Default stream poster"
                          width={120}
                          height={120}
                          className="opacity-80 mb-2"
                        />
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Camera className="w-4 h-4" /> Upload poster
                        </span>
                      </>
                    )}
                  </motion.div>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <label className="flex items-center gap-2 text-base font-medium text-slate-700">
                  <Switch
                    checked={requiresSubscription}
                    onCheckedChange={setRequiresSubscription}
                  />
                  Requires a subscription
                </label>
                <label className="flex items-center gap-2 text-base font-medium text-slate-700">
                  <Switch
                    checked={isPublic}
                    onCheckedChange={setIsPublic}
                    color="pink"
                  />
                  Is public stream
                </label>
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  type="button"
                  className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-8 py-2 shadow-none"
                  onClick={handleSave}
                >
                  SAVE
                </Button>
              </div>
            </form>
          </motion.div>
        </DialogContent>
      </Dialog>
    </AnimatePresence>
  );
};

export default NewStreamModal;
