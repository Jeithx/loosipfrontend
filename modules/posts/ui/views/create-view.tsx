"use client";
import { RefObject, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreatePostHead from "../sections/create-post/head";
import { containerVariants, itemVariants } from "../animations";
import Files from "../sections/create-post/files";
import Footer from "../sections/create-post/footer";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SetPriceModal from "@/components/custom/modals/set-price";
import PoolModal from "@/components/custom/modals/pool-modal";
import PostSchedulingModal from "@/components/custom/modals/post-scheduling";
import { toast } from "sonner";
import { postFormData } from "@/app/[lang]/helpers/httpEntity.service";
import { APIURLS } from "@/app/[lang]/helpers/APIURLS";
import { useTranslation } from "@/hooks/use-translation";
import { getTokenFromCookie } from "@/app/server/action";
import { useRouter } from "next/navigation";
import type { PostFormType } from "@/lib/types";

const postSchema = z.object({
  content: z.string().min(1, "Content is required"),
  files: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        size: z.number(),
        type: z.string(),
        previewUrl: z.string().optional(),
        file: z.any(),
      })
    )
    // .min(1, "At least one file is required") // Dosya zorunluluğu kaldırıldı
    .optional(),
  // price: z.string().optional(), // price alanı yoruma alındı
  // poll: z
  //   .object({
  //     options: z.array(z.string().min(1)).min(2),
  //   })
  //   .optional(),
  // scheduling: z
  //   .object({
  //     releaseDate: z.date().optional(),
  //     expireDate: z.date().optional(),
  //   })
  //   .optional(),
});

const PostCreateView = () => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const methods = useForm<PostFormType>({
    resolver: zodResolver(postSchema),
    defaultValues: { content: "", files: [] },
    mode: "onChange",
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const files = watch("files") || [];
  const content = watch("content");
  // const price = watch("price"); // kaldırıldı
  // const poll = watch("poll"); // kaldırıldı
  // const scheduling = watch("scheduling"); // kaldırıldı

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newFiles = e.target.files;
    if (!newFiles) return;
    const droppedFiles = Array.from(newFiles);
    const fileObjects = droppedFiles.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl: URL.createObjectURL(file),
      file: file,
    }));
    setValue("files", [...files, ...fileObjects], { shouldValidate: true });
    if (e.target) e.target.value = "";
  };

  const handlePhotoIconClick = () => {
    fileInputRef.current?.click();
  };

  const closeModal = () => setActiveModal(null);

  const mapToApi = (data: PostFormType) => {
    const files = data.files || [];
    let mediaType = 4; // Text
    if (files.length > 0) {
      const fileType = files[0].type;
      if (fileType.startsWith("image/")) mediaType = 0; // Image
      else if (fileType.startsWith("video/")) mediaType = 1; // Video
    }
    return {
      id: 0,
      userId: 0,
      mediaType: mediaType, 
      visibility: 1,
      isActive: true,
      isPinned: false,
      isScheduled: false, 
      isNsfw: false,
      likeCount: 0,
      commentCount: 0,
      viewCount: 0,
      creationDate: new Date().toISOString(),
      tipCount: 0,
      type: 0,
      postTags: [
        {
          id: 0,
          postId: 0,
          tagId: 1,
          tag: "test",
        },
      ],
      postMedias: files.map((file, idx) => ({
        id: 0,
        postId: 0,
        mediaUrl: file.previewUrl || "",
        file: file.file,
        type: file.type.startsWith("image/") ? 0 : file.type.startsWith("video/") ? 1 : 4, // EPostMediaType
        order: idx,
        creationDate: new Date().toISOString(),
        isActive: true,
      })),
      content: data.content,
    };
  };
  const [currentUserName, setCurrentUserName] = useState("");
  function parseJwt(token: any) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('JWT parsing error:', e);
      return null;
    }
  }
  const getToken = async () => {
    const token = await getTokenFromCookie();
    const decodedToken = parseJwt(token);
    const name = decodedToken?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    setCurrentUserName(name);

  };
  useEffect(() => {
    getToken();
  }, []);

  const createPost = async (data: any) => {
    setIsPending(true);
    try {
      const formData = new FormData();
      formData.append('title', data.content);
      formData.append('price', data.price || '0');
      formData.append('isScheduled', data.isScheduled ? 'true' : 'false');
      formData.append('postTags', data.postTags);
      formData.append('isActive', 'true');
      formData.append('visibility', '1');
      formData.append('mediaType', data.mediaType);

      if (data.postMedias && data.postMedias.length > 0) {
        data.postMedias.forEach((file: any, index: number) => {
          formData.append(`PostMedias[${index}].mediaUrl`, file.mediaUrl || '');
          formData.append(`PostMedias[${index}].file`, file.file);
          formData.append(`PostMedias[${index}].type`, file.type);
          formData.append(`PostMedias[${index}].order`, file.order);
          formData.append('isActive', 'true');
          formData.append('visibility', '1');
        });
      }
      const response = await postFormData(APIURLS.POST, formData);

      if (response.success) {
        toast("Post oluşturuldu!");
        router.push(`/${currentUserName}`);
      }
      else {
        toast("hata: " + response.message);
      }
      return response;
    } catch (error) {

      toast("Bir hata oluştu,lütfen tekrar deneyin.");
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  const onSubmit = async (data: PostFormType) => {
    try {
      await createPost(mapToApi(data));
    } catch (error) {
      console.log("Error:", error);
    }
  };


  return (
    <FormProvider {...methods}>
      <motion.div
        className="min-h-screen p-4 md:p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <CreatePostHead />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              accept="image/*,video/*"
              className="hidden"
            />
            <motion.div
              className="bg-white/70 w-full backdrop-blur-sm rounded-xl shadow-lg shadow-slate-200/50 border border-gray-200 overflow-hidden"
              variants={itemVariants}
            >
              <motion.div
                className="relative transition-all duration-300 w-full"
                whileHover={{ scale: 1.002 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-6 md:p-8 w-full">
                  <div className="relative w-full">
                    <motion.textarea
                      {...methods.register("content")}
                      placeholder={t("createPost.placeholder")}
                      className="w-full min-h-[120px] md:min-h-[150px] resize-none border-none outline-none bg-transparent text-slate-700 placeholder-slate-400 text-base md:text-lg leading-relaxed font-light"
                      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <AnimatePresence>
                      {content.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute bottom-2 right-2 text-xs text-slate-400"
                        >
                          {content.length}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {errors.content && (
                    <div className="text-red-500 text-xs mt-1">{errors.content.message}</div>
                  )}
                </div>
                <Files fileInputRef={fileInputRef as RefObject<HTMLInputElement>} />
                <Footer
                  onPhotoIconClick={handlePhotoIconClick}
                  isPending={isPending}
                />
              </motion.div>
            </motion.div>
          </div>
        </form>
        <SetPriceModal
          open={false} // price kaldırıldığı için kapalı
          onOpenChange={closeModal}
          setValue={methods.setValue}
        />
        <PoolModal
          open={false} // pool kaldırıldığı için kapalı
          onOpenChange={closeModal}
          setValue={methods.setValue}
        />
        <PostSchedulingModal
          open={false} // schedule kaldırıldığı için kapalı
          onOpenChange={closeModal}
          setValue={methods.setValue}
        />
      </motion.div>
    </FormProvider>
  );
};

export default PostCreateView;
