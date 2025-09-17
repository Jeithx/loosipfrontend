"use client";
import { Form } from "@/components/ui/form";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SIGN_UP_SCHEMA } from "@/lib/constants/form.constants";
import InputElement from "@/components/custom/form-elements/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { pageUrls } from "@/lib/enums/page-urls";
import { useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { useRouter } from "next/navigation";
import { PhoneNumberInput } from "@/components/custom/form-elements/phone-number";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon, Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AnimatePresence, motion } from "framer-motion";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { maxDate, minDate } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";
import { APIURLS } from "@/app/[lang]/helpers/APIURLS";
import { postByParams } from "@/app/[lang]/helpers/httpEntity.service";
import { se } from "date-fns/locale";

type SignUpFormValues = typeof SIGN_UP_SCHEMA extends import("zod").ZodTypeAny
  ? import("zod").infer<typeof SIGN_UP_SCHEMA>
  : never;

const SignUpForm = ({ role }: { role?: string }) => {
  const { t } = useTranslation();
  const [localRole, setLocalRole] = useState<string | undefined>(
    role ?? "creator"
  );
  const router = useRouter();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SIGN_UP_SCHEMA),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
      phone: "",
      userName: "",
      displayName: "",
      birthDate: undefined,
      genderId: undefined,
    },
  });

  const [step, setStep] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const step1Fields: string[] = [
    "email",
    "password",
    "confirmPassword",
  ];

  const handleDateChange = (date: Date | undefined) => {
    form.setValue("birthDate", date);
    setOpen(false);
  };

  const { mutate: registerContentCreator, isPending: isRegisteringCreator } =
    trpc.auth.registerContentCreator.useMutation({
      onSuccess: (response) => {
        toast.success("Content creator registered successfully");
        const { token, expiration } = response.data;
        useAuthStore.getState().setToken(token, expiration);
        router.push(pageUrls.AUTH.VERIFY);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to register content creator");
      },
    });

  const { mutate: registerFan, isPending: isRegisteringFan } =
    trpc.auth.registerFan.useMutation({
      onSuccess: (response) => {
        toast.success("Fan registered successfully");
        const { token, expiration } = response.data;
        useAuthStore.getState().setToken(token, expiration);
        router.push(pageUrls.FEED);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to register fan");
      },
    });

  const onSubmit = async (values: SignUpFormValues) => {
    if (form.getValues("terms") === false) {
      toast.error("You must agree to the terms of use");
      return;
    }
    setLoading(true);
    const payload = {
      ...values,
      birthDate: values.birthDate ? values.birthDate.toISOString() : undefined,
      countryId: 178,
      cityId: 1,
      prefferedLanguageId: 1,
    };
    // if (localRole === "creator") {
    //   registerContentCreator(payload);
    // } else {
    //   registerFan(payload);
    // }
    try {
      if (localRole === "creator") {
        const response = await postByParams(APIURLS.AUTH_REGISTER_CREATOR, payload);
        if (response.success) {
          const { token, expiration } = response.data;
          useAuthStore.getState().setToken(token, expiration);
          router.push(pageUrls.FEED);
        }
        setLoading(false);
      } else {
        const response = await postByParams(APIURLS.AUTH_REGISTER_FAN, payload);
        if (response.success) {
          const { token, expiration } = response.data;
          useAuthStore.getState().setToken(token, expiration);
          router.push(pageUrls.FEED);
        }
        setLoading(false);
      }
      setLoading(false);
    } catch (exx: any) {
      toast.error(exx.response.data.message || "Failed to register");
      setLoading(false);
    }

  };

  return (
    <BlurFade
      key={localRole || "user"}
      duration={0.5}
      direction="up"
      className="w-full"
    >
      <Form {...form}>
        {localRole === "creator" && (
          <div className="w-full mb-4 flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold text-gradient bg-gradient-to-tr from-[#7928ca] to-[#ff0080] bg-clip-text text-transparent mb-2">
              {t('signUp.becomeCreator')}
            </h2>
            <p className="text-gray-500 max-w-xs">
              {t('signUp.creatorDescription')}
            </p>
          </div>
        )}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 items-center justify-center w-full min-h-[340px]"
        >
          <AnimatePresence mode="wait" initial={false}>
            {step === 1 ? (
              <motion.div
                key="step1-motion"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full flex flex-col gap-4"
              >
                <InputElement
                  form={form}
                  name="email"
                  placeholder={t('signUp.emailPlaceholder')}
                  type="email"
                />
                <InputElement
                  form={form}
                  name="password"
                  placeholder={t('signUp.passwordPlaceholder')}
                  type="password"
                />
                <InputElement
                  form={form}
                  name="confirmPassword"
                  placeholder={t('signUp.confirmPasswordPlaceholder')}
                  type="password"
                />
              </motion.div>
            ) : (
              <motion.div
                key="step2-motion"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full flex flex-col gap-4"
              >
                <PhoneNumberInput
                  form={form}
                  name="phone"
                  label={t('signUp.phoneLabel')}
                />
                <InputElement
                  form={form}
                  name="userName"
                  placeholder={t('signUp.usernamePlaceholder')}
                />
                <InputElement
                  form={form}
                  name="displayName"
                  placeholder={t('signUp.displayNamePlaceholder')}
                />
                <div className="w-full flex gap-3">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="flex-1 justify-between font-normal border-gray-200"
                      >
                        {form.getValues("birthDate")
                          ? (
                            form.getValues("birthDate") as Date
                          ).toLocaleDateString()
                          : t('signUp.birthdate')}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0 border-gray-200"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={form.getValues("birthDate") as Date}
                        captionLayout="dropdown"
                        onSelect={handleDateChange}
                        fromDate={minDate}
                        toDate={maxDate}
                        defaultMonth={maxDate}
                        disabled={(date) =>
                          date > maxDate ||
                          date < minDate
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <Controller
                    control={form.control}
                    name="genderId"
                    render={({ field }) => (
                      <div className="flex-1">
                        <Select
                          value={field.value?.toString() || ""}
                          onValueChange={(val) => field.onChange(Number(val))}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={t('signUp.selectGender')} />
                          </SelectTrigger>
                          <SelectContent className="border-gray-200">
                            <SelectItem value="0">{t('signUp.gender.notSpecified')}</SelectItem>
                            <SelectItem value="1">{t('signUp.gender.male')}</SelectItem>
                            <SelectItem value="2">{t('signUp.gender.female')}</SelectItem>
                            <SelectItem value="3">{t('signUp.gender.other')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-fit px-6 h-10 text-base rounded-2xl font-medium border border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100 hover:shadow-sm transition-all mt-2"
                  onClick={() => setStep(1)}
                >
                  ← Back
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          {step === 2 && (
            <div className="flex items-center gap-2 w-full">
              <Checkbox
                id="terms"
                className="w-5 h-5 rounded border-gray-300 focus:ring-2 focus:ring-[#7928ca] transition-all duration-200 checked:bg-gradient-to-tr checked:from-[#7928ca] checked:to-[#ff0080] checked:border-none checked:text-white"
                onCheckedChange={(checked) => {
                  form.setValue("terms", !!checked);
                }}
              />
              <label
                htmlFor="terms"
                className="font-normal text-gray-500 select-none"
              >
                I agree to the{" "}
                <Link
                  href="#"
                  style={{ color: "rgb(203, 12, 159)" }}
                  className="hover:underline"
                >
                  {t('signUp.termsOfUse')}
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  style={{ color: "rgb(203, 12, 159)" }}
                  className="hover:underline"
                >
                  {t('signUp.privacyPolicy')}
                </Link>
                .
              </label>
            </div>
          )}
          {step === 1 ? (
            <Button
              type="button"
              onClick={async () => {
                const valid = await form.trigger(step1Fields as any);
                if (valid) setStep(2);
              }}
              className="w-full px-6 h-12 text-base rounded-lg font-semibold shadow-md text-white border-0 hover:opacity-90 transition-all duration-200"
              style={{
                backgroundColor: "rgb(203, 12, 159)",
                backgroundImage:
                  "linear-gradient(310deg, rgb(121, 40, 202), rgb(255, 0, 128))",
                boxShadow: "0 2px 16px 0 rgba(121,40,202,0.10)",
              }}
            >
              {t('signUp.next')}
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full px-6 h-12 text-base rounded-lg font-semibold shadow-md text-white border-0 hover:opacity-90 transition-all duration-200"
              style={{
                backgroundColor: "rgb(203, 12, 159)",
                backgroundImage:
                  "linear-gradient(310deg, rgb(121, 40, 202), rgb(255, 0, 128))",
                boxShadow: "0 2px 16px 0 rgba(121,40,202,0.10)",
              }}
              disabled={ loading}
            >
              {isRegisteringCreator || isRegisteringFan ? (
                <Loader2 className="animate-spin" />
              ) : (
                t('signUp.signUp')
              )}
            </Button>
          )}
        </form>
        <div className="flex flex-col items-center justify-center w-full">
          <Separator className="w-full" />
          <p className="text-gray-500 text-center w-full pt-4">
            {t('signUp.alreadyHaveAccount')}
            <Link
              href={pageUrls.AUTH.SIGN_IN}
              prefetch
              className="text-[#7928ca] hover:underline"
            >
              {t('signUp.signIn')}
            </Link>
          </p>
          {role === "creator" ? (
            <p className="text-sm text-gray-500 text-center w-full pt-2.5">
              {t('signUp.wantUser')}
              <button
                type="button"
                className="text-[#ff0080] font-semibold hover:underline bg-transparent border-0 outline-none cursor-pointer"
                onClick={() => {
                  setLocalRole("user");
                  router.push(`${pageUrls.AUTH.SIGN_UP}?role=user`);
                }}
              >
                {t('signUp.clickHere')}
              </button>
            </p>
          ) : (
            <p className="text-sm text-gray-500 text-center w-full pt-2.5">
              {t('signUp.wantCreator')}
              <button
                type="button"
                className="text-[#ff0080] font-semibold hover:underline bg-transparent border-0 outline-none cursor-pointer"
                onClick={() => {
                  setLocalRole("creator");
                  router.push(`${pageUrls.AUTH.SIGN_UP}?role=creator`);
                }}
              >
                {t('signUp.clickHere')}
              </button>
            </p>
          )}
        </div>
      </Form>
    </BlurFade>
  );
};

export default SignUpForm;
