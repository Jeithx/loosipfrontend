"use client";
import { formatFileSize } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { File, FileVideo, Image, X } from "lucide-react";
import { File as FileType } from "@/lib/types";
import { useEffect, useState, RefObject } from "react";
import PreviewModal from "@/components/custom/modals/preview-modal";
import { useFormContext } from "react-hook-form";

interface FilesProps {
  fileInputRef: RefObject<HTMLInputElement>;
}

const Files = ({ fileInputRef }: FilesProps) => {
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
  const { watch, setValue } = useFormContext();
  const files: FileType[] = watch("files");

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.previewUrl) {
          URL.revokeObjectURL(file.previewUrl);
        }
      });
    };
  }, [files]);

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return Image;
    if (type.includes("video")) return FileVideo;
    return File;
  };

  const removeFile = (id: number) => {
    setValue(
      "files",
      files.filter((file) => file.id !== id),
      { shouldValidate: true }
    );
  };

  return (
    <>
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 md:px-8 pb-4"
          >
            <div className="space-y-3">
              {files.map((file: FileType) => {
                const FileIconComponent = getFileIcon(file.type);
                const isImage = file.type.startsWith("image/");
                const isVideo = file.type.startsWith("video/");

                return (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="group flex items-center gap-3 p-3 bg-slate-50/70 rounded-2xl border border-slate-100 hover:bg-slate-100/70 transition-all duration-200 cursor-pointer"
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelectedFile(file)}
                  >
                    <div className="flex-shrink-0 p-2 bg-white rounded-xl shadow-sm w-16 h-16 flex items-center justify-center">
                      {isImage && file.previewUrl && (
                        <img
                          src={file.previewUrl}
                          alt={file.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      )}
                      {isVideo && file.previewUrl && (
                        <video
                          src={file.previewUrl}
                          className="w-full h-full object-cover rounded-lg"
                          muted
                          autoPlay
                          loop
                        />
                      )}
                      {!isImage && !isVideo && (
                        <FileIconComponent className="h-8 w-8 text-slate-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    <motion.button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(file.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded-full transition-all duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <PreviewModal
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
      />
    </>
  );
};

export default Files;
