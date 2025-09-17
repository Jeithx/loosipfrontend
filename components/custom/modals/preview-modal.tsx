import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { File as FileType } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { Download, FileText, Film, Image as ImageIcon, X } from "lucide-react";
import { formatFileSize } from "@/lib/utils";

interface PreviewModalProps {
  selectedFile: FileType | null;
  setSelectedFile: (file: FileType | null) => void;
}

const PreviewModal = ({ selectedFile, setSelectedFile }: PreviewModalProps) => {
  const isImage = selectedFile?.type.startsWith("image/");
  const isVideo = selectedFile?.type.startsWith("video/");

  const handleDownload = () => {
    if (selectedFile?.previewUrl) {
      const a = document.createElement("a");
      a.href = selectedFile.previewUrl;
      a.download = selectedFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <AnimatePresence>
      {selectedFile && (
        <Dialog
          open={!!selectedFile}
          onOpenChange={(isOpen) => !isOpen && setSelectedFile(null)}
        >
          <DialogPortal>
            <DialogOverlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </DialogOverlay>
            <DialogContent className="bg-transparent border border-white/10 shadow-sm shadow-white/10 p-2 max-w-5xl w-full outline-none">
              <DialogTitle asChild>
                <span className="sr-only">{selectedFile?.name || "File preview"}</span>
              </DialogTitle>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative w-full h-full flex flex-col items-center justify-center"
              >
                <div className="w-full h-auto max-h-[80vh] flex items-center justify-center">
                  {isImage && selectedFile.previewUrl && (
                    <img
                      src={selectedFile.previewUrl}
                      alt={selectedFile.name}
                      className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    />
                  )}
                  {isVideo && selectedFile.previewUrl && (
                    <video
                      src={selectedFile.previewUrl}
                      className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                      controls
                      autoPlay
                    />
                  )}
                </div>

                <div className="absolute top-0 right-0 p-4 flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDownload}
                    className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                    title="Download"
                  >
                    <Download className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedFile(null)}
                    className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-between rounded-b-lg text-white"
                >
                  <div className="flex items-center gap-3">
                    {isImage && <ImageIcon className="w-5 h-5 opacity-80" />}
                    {isVideo && <Film className="w-5 h-5 opacity-80" />}
                    {!isImage && !isVideo && <FileText className="w-5 h-5 opacity-80" />}
                    <span className="font-medium truncate">{selectedFile.name}</span>
                  </div>
                  <span className="text-sm opacity-80">{formatFileSize(selectedFile.size)}</span>
                </motion.div>
              </motion.div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default PreviewModal;
