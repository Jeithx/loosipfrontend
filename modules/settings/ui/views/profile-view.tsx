"use client";
import AvatarProfile from "@/components/custom/avatar-profile";
import Head from "../components/head";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputElement from "@/components/custom/form-elements/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, Camera, Upload } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { maxDate } from "@/lib/utils";
import { minDate } from "@/lib/utils";
import CustomSelect from "@/components/custom/form-elements/custom-select";
import { Gender, GenderPronoun } from "@/lib/types";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";
import { get, getByParams, putFormData, updateByParams } from "@/app/[lang]/helpers/httpEntity.service";
import { APIURLS } from "@/app/[lang]/helpers/APIURLS";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string().min(1),
  displayName: z.string().min(1),
  birthdate: z.date(),
  creationDate: z.date(),
  lastLoginAt: z.date(),
  phoneNumber: z.string().min(1),
  email: z.string().min(1),
  genderId: z.string().min(1),
  cityId: z.string().min(1),
  countryId: z.string().min(1),
  prefferedLanguageId: z.string().min(1),
  coverPictureUrl: z.string(),
  profilePictureUrl: z.string(),
  biography: z.string().optional(),
});

interface Country {
  id: number;
  name: string;
  languageId: number;
  isActive: boolean;
}

interface City {
  id: number;
  name: string;
  countryId: number;
  isActive: boolean;
}

const ProfileView = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>("");
  const [isUploadingProfile, setIsUploadingProfile] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  
  // New states for countries and cities
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<string>("0");
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  const profileFileInputRef = useRef<HTMLInputElement>(null);
  const coverFileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      displayName: "",
      birthdate: new Date(),
      genderId: "0",
      phoneNumber: "",
      email: "",
      coverPictureUrl: coverImage,
      profilePictureUrl: profileImage,
      creationDate: new Date(),
      lastLoginAt: new Date(),
      cityId: "0",
      countryId: "0",
      prefferedLanguageId: "0",
      biography: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      data.coverPictureUrl = coverImage;
      data.profilePictureUrl = profileImage;
      const response = await updateByParams(APIURLS.USER, data);
      if (response.success) {
        getProfile();
        toast.success(t('Güncellendi'));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const birthdate = form.watch("birthdate");
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      form.setValue("birthdate", date, { shouldDirty: true });
      setOpen(false);
    }
  };

  const getProfile = async () => {
    try {
      setIsLoading(true);
      const response = await get(APIURLS.USER);
      if (response.data && response.data.length > 0) {
        const profileData = response.data[0];
        
        form.setValue("username", profileData.userName || "");
        form.setValue("displayName", profileData.displayName || "");
        form.setValue("phoneNumber", profileData.phoneNumber || "");
        form.setValue("email", profileData.email || "");
        form.setValue("prefferedLanguageId", String(profileData.prefferedLanguageId || "0"));

        setProfileImage(profileData.profilePictureUrl || "");
        setCoverImage(profileData.coverPictureUrl || "");

        const genderValue = profileData.genderId || profileData.gender_id || profileData.GenderId || "0";
        form.setValue("genderId", String(genderValue));

        const countryValue = String(profileData.countryId || profileData.country?.id || "0");
        const cityValue = String(profileData.cityId || profileData.city?.id || "0");
        
        form.setValue("countryId", countryValue);
        form.setValue("cityId", cityValue);
        setSelectedCountryId(countryValue);

        // Load countries and cities after setting the values
        await getCountries();
        if (countryValue !== "0") {
          await getCities(countryValue);
        }

        if (profileData.birthDate) {
          const birthDate = new Date(profileData.birthDate);
          form.setValue("birthdate", birthDate);
        }
        if (profileData.creationDate) {
          const creationDate = new Date(profileData.creationDate);
          form.setValue("creationDate", creationDate);
        }
        if (profileData.lastLoginAt) {
          const lastLoginAt = new Date(profileData.lastLoginAt);
          form.setValue("lastLoginAt", lastLoginAt);
        }
        if (profileData.biography) {
          form.setValue("biography", profileData.biography);
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload file
      profilePhotoUpdate(file);
    }
  };

  const handleCoverImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload file
      coverPictureUpdate(file);
    }
  };

  const profilePhotoUpdate = async (file: File) => {
    try {
      setIsUploadingProfile(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await putFormData(APIURLS.USERPROFILEPHOTO, formData);
      if (response.success) {
        toast.success(t('Profil fotoğrafı güncellendi'));
        getProfile();
      } else {
        toast.error(t('Profil fotoğrafı güncellenirken hata oluştu'));
      }
    } catch (error) {
      console.error("Error updating profile photo:", error);
      toast.error(t('Profil fotoğrafı güncellenirken hata oluştu'));
    } finally {
      setIsUploadingProfile(false);
    }
  };

  const coverPictureUpdate = async (file: File) => {
    try {
      setIsUploadingCover(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await putFormData(APIURLS.USERCOVERPICTURE, formData);
      if (response.success) {
        toast.success(t('Kapak fotoğrafı güncellendi'));
        getProfile();
      } else {
        toast.error(t('Kapak fotoğrafı güncellenirken hata oluştu'));
      }
    } catch (error) {
      console.error("Error updating cover picture:", error);
      toast.error(t('Kapak fotoğrafı güncellenirken hata oluştu'));
    } finally {
      setIsUploadingCover(false);
    }
  };

  const getCountries = async () => {
    try {
      setIsLoadingCountries(true);
      const prefferedLanguageId = form.watch("prefferedLanguageId");
      const response = await getByParams(APIURLS.COUNTRIES, {
        languageId: prefferedLanguageId,
        notPagination: true
      });
      if (response.success && response.data) {
        setCountries(response.data);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    } finally {
      setIsLoadingCountries(false);
    }
  };

  const getCities = async (countryId: string) => {
    try {
      setIsLoadingCities(true);
      const response = await getByParams(APIURLS.CITIY, { 
        countryId: countryId,
        notPagination: true 
      });
      if (response.success && response.data) {
        setCities(response.data);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setIsLoadingCities(false);
    }
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountryId(value);
    form.setValue("countryId", value, { shouldDirty: true });
    
    form.setValue("cityId", "0", { shouldDirty: true });
    setCities([]);
    
    if (value !== "0") {
      getCities(value);
    }
  };

  const handleCityChange = (value: string) => {
    form.setValue("cityId", value, { shouldDirty: true });
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <div className="text-gray-500">Profil yükleniyor...</div>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Head title={t('settingsPages.profile.headTitle')} description={t('settingsPages.profile.headDescription')} />
      <div className="flex flex-col gap-10 w-full mt-3 px-5">
        <div className="relative">
          <div className="relative bg-[#63b3ed] w-full h-48 rounded-md overflow-hidden group">
            {coverImage ? (
              <img
                src={coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
            )}

            <button
              onClick={() => coverFileInputRef.current?.click()}
              disabled={isUploadingCover}
              className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
            >
              <div className="bg-white bg-opacity-90 rounded-full p-3 shadow-lg">
                {isUploadingCover ? (
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Upload className="w-6 h-6 text-gray-700" />
                )}
              </div>
            </button>

            <input
              ref={coverFileInputRef}
              type="file"
              accept="image/*"
              onChange={handleCoverImageSelect}
              className="hidden"
            />
          </div>

          <div className="absolute -bottom-10 left-5 group">
            <div className="relative">
              <AvatarProfile
                image={profileImage}
                name={form.watch("displayName") || "User"}
                className="w-28 h-28 border-4 border-white shadow-md"
              />

              <button
                onClick={() => profileFileInputRef.current?.click()}
                disabled={isUploadingProfile}
                className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full"
              >
                <div className="bg-white bg-opacity-90 rounded-full p-2 shadow-lg">
                  {isUploadingProfile ? (
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Camera className="w-4 h-4 text-gray-700" />
                  )}
                </div>
              </button>

              <input
                ref={profileFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfileImageSelect}
                className="hidden"
              />
            </div>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-full mt-5"
          >
            <InputElement
              form={form}
              name="username"
              label={t('settingsPages.profile.username')}
              className="h-11 shadow-none"
            />
            <InputElement
              form={form}
              name="displayName"
              label="Display Name"
              className="h-11 shadow-none"
            />
            <InputElement
              form={form}
              name="phoneNumber"
              label="Phone Number"
              className="h-11 shadow-none"
            />
            <InputElement
              form={form}
              name="biography"
              label={'Biography'}
              className="h-11 shadow-none"
              textarea // çok satırlı alan için
            />
            <div className="flex flex-col items-start gap-1">
              <Label className="text-sm text-gray-500">{t('settingsPages.profile.birthdate')}</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="flex-1 justify-between font-normal border-gray-200 w-full"
                  >
                    {birthdate ? birthdate.toLocaleDateString() : t('settingsPages.profile.selectDate')}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0 border-gray-200"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={birthdate as Date}
                    captionLayout="dropdown"
                    onSelect={handleDateChange}
                    fromDate={minDate}
                    toDate={maxDate}
                    defaultMonth={maxDate}
                    disabled={(date) => date > maxDate || date < minDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col items-start gap-1">
              <Label className="text-sm text-gray-500">{t('settingsPages.profile.gender')}</Label>
              <CustomSelect
                value={form.watch("genderId")}
                onChange={(value) => form.setValue("genderId", value, { shouldDirty: true })}
                options={[
                  { label: t('notSpecified'), value: "0" },
                  { label: t('male'), value: "1" },
                  { label: t('female'), value: "2" },
                  { label: t('other'), value: "3" },
                ]}
                placeholder={t('settingsPages.profile.selectGender')}
              />
            </div>
            
            {/* Country Selection */}
            <div className="flex flex-col items-start gap-1">
              <Label className="text-sm text-gray-500">{t('settingsPages.profile.country')}</Label>
              <CustomSelect
                value={form.watch("countryId")}
                onChange={handleCountryChange}
                options={[
                  { label: t('settingsPages.profile.selectCountry'), value: "0" },
                  ...countries.map(country => ({
                    label: country.name,
                    value: String(country.id)
                  }))
                ]}
                placeholder={t('settingsPages.profile.selectCountry')}
              />
            </div>

      <div className="flex flex-col items-start gap-1">
              <Label className="text-sm text-gray-500">{t('city')}</Label>
              <CustomSelect
                value={form.watch("cityId")}
                onChange={handleCityChange}
                options={[
                  { label: t('settingsPages.profile.selectCity'), value: "0" },
                  ...cities.map(city => ({
                    label: city.name,
                    value: String(city.id)
                  }))
                ]}
                placeholder={t('settingsPages.profile.selectCity')}
              />
            </div>

            <Button type="submit" className="w-full cursor-pointer">
              Profili Güncelle
            </Button>
          </form>
        </Form>
      </div>
    </motion.div>
  );
};

export default ProfileView;