"use client";
import { pageUrls } from "@/lib/enums/page-urls";
import { ChevronLeft, ListFilter } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import InputElement from "@/components/custom/form-elements/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import CustomSelect from "@/components/custom/form-elements/custom-select";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  search: z.string().min(1),
});

const genderOptions = [
  { label: "All", value: "all" },
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const SearchBox = ({ activeTab }: { activeTab: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  const [filterOpen, setFilterOpen] = useState(false);
  const [gender, setGender] = useState("all");
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(99);
  const [location, setLocation] = useState("");
  return (
    <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between gap-5 relative">
      <Link href={pageUrls.FEED} prefetch className="cursor-pointer">
        <ChevronLeft className="size-5 text-gray-500" />
      </Link>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <InputElement
            name="search"
            form={form}
            placeholder="Search"
            className="rounded-lg text-base shadow-none w-full h-11 bg-white border border-gray-100 lg:border-gray-200 focus:border-[#cb0c9f] focus:ring-2 focus:ring-[#cb0c9f]/20 transition"
          />
        </form>
      </Form>
      {activeTab === "people" && (
        <Popover open={filterOpen} onOpenChange={setFilterOpen}>
          <PopoverTrigger asChild>
            <button type="button">
              <ListFilter className="size-5 text-gray-500 cursor-pointer" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" sideOffset={8} className="w-[340px] p-5 bg-white border border-gray-200 rounded-xl shadow-xl flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 text-base font-medium">Gender</label>
              <CustomSelect
                value={gender}
                onChange={setGender}
                options={genderOptions}
                placeholder="All"
                className="h-11"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col flex-1 gap-2">
                <label className="text-gray-700 text-base font-medium">Min age</label>
                {(() => {
                  const inputProps = { min: 18, max: maxAge, type: 'number' as const };
                  return (
                    <Input
                      {...inputProps}
                      value={minAge.toString()}
                      onChange={e => setMinAge(Number(e.target.value))}
                      className="shadow-none h-10 rounded-lg border border-gray-200 px-3 text-base focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none bg-white"
                    />
                  );
                })()}
              </div>
              <div className="flex flex-col flex-1 gap-2">
                <label className="text-gray-700 text-base font-medium">Max age</label>
                {(() => {
                  const inputProps = { min: minAge, max: 99, type: 'number' as const };
                  return (
                    <Input
                      {...inputProps}
                      value={maxAge.toString()}
                      onChange={e => setMaxAge(Number(e.target.value))}
                      className="shadow-none h-10 rounded-lg border border-gray-200 px-3 text-base focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none bg-white"
                    />
                  );
                })()}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 text-base font-medium">Location</label>
              <Input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Location"
                className="shadow-none h-10 rounded-lg border border-gray-200 px-3 text-base focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none bg-white"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setFilterOpen(false);
              }}
              className="mt-2 w-full h-10 rounded-lg bg-pink-600 text-white font-semibold text-base hover:bg-pink-700 transition"
            >
              Filter
            </button>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default SearchBox;

