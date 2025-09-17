"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { Shield, AlertTriangle, ExternalLink } from "lucide-react";
import { setCookie, parseCookies } from "nookies";
import React from "react";

const MotionButton = motion(Button);

const AgeModal = () => {
  const [open, setOpen] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const cookies = parseCookies();
    if (cookies.age_verified !== "true") {
      setOpen(true);
    }
  }, []);

  const handleOpenChange = (v: boolean) => {
    if (!v) {
      modalRef.current?.style.setProperty("--shake", "1");
      setTimeout(() => {
        modalRef.current?.style.setProperty("--shake", "0");
      }, 500);
      setOpen(true);
    }
  };

  const handleYes = () => {
    setCookie(null, "age_verified", "true", { maxAge: 60 * 60 * 24 * 30, path: "/" });
    setOpen(false);
  };

  const handleNo = () => {
    setCookie(null, "age_verified", "false", { maxAge: 60 * 60 * 24 * 30, path: "/" });
    setIsRejecting(true);
    setTimeout(() => {
      setOpen(false);
      window.location.href = "https://www.google.com";
    }, 1000);
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
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
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -20,
      transition: { duration: 0.2 },
    },
    shake: {
      x: [0, -8, 8, -8, 8, -4, 4, 0],
      transition: { duration: 0.5 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { type: "spring" as const, stiffness: 400, damping: 25 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  };

  const rejectionVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateX: 90,
      transition: { duration: 0.8, ease: easeInOut },
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogContent
            className="max-w-[450px] rounded-3xl p-0 bg-gradient-to-br from-white via-white to-slate-50 backdrop-blur-xl border-0 shadow-2xl overflow-hidden"
            style={{ pointerEvents: "auto" }}
            ref={modalRef}
          >
            <motion.div
              variants={isRejecting ? rejectionVariants : modalVariants}
              initial="hidden"
              animate={isRejecting ? "exit" : "visible"}
              exit="exit"
              className="relative"
              style={
                {
                  "--shake": "0",
                  transform: "translateX(calc(var(--shake) * 10px))",
                } as any
              }
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-red-500/5 pointer-events-none" />

              <DialogHeader className="relative">
                <DialogTitle className="flex flex-col items-center gap-4 pt-8 pb-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2,
                    }}
                    className="relative"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="absolute -inset-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl -z-10"
                    />
                  </motion.div>

                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl font-bold text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
                  >
                    Age Verification Required
                  </motion.span>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    You must be 18+ to continue
                  </motion.div>
                </DialogTitle>
              </DialogHeader>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="px-8 pb-6"
              >
                <div className="bg-gray-50/70 rounded-2xl p-5 mb-6 backdrop-blur-sm">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Important Notice
                  </h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>This site may contain adult content</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Demo purposes only - not a commercial site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Contact us for content removal requests</span>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-4 mb-4">
                  <MotionButton
                    className="flex-1 w-full h-12 rounded-2xl font-bold text-base bg-gradient-to-r from-purple-600 via-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl border-0 relative overflow-hidden group"
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleYes}
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">Yes, I'm 18+</span>
                  </MotionButton>
                  <MotionButton
                    className="flex-1 w-full h-12 rounded-2xl font-bold text-base bg-white/80 text-gray-700 border-2 border-gray-200 shadow-md hover:bg-gray-50 hover:shadow-lg backdrop-blur-sm"
                    variant="outline"
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleNo}
                    disabled={isRejecting}
                  >
                    {isRejecting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full"
                      />
                    ) : (
                      "No, take me away"
                    )}
                  </MotionButton>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center text-gray-500 text-sm"
                >
                  By continuing, you agree to our{" "}
                  <motion.a
                    href="#"
                    className="text-purple-600 hover:text-purple-700 underline underline-offset-2 inline-flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    Terms of Service
                    <ExternalLink className="w-3 h-3" />
                  </motion.a>
                </motion.div>
              </motion.div>

              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl" />
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl" />
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default AgeModal;
