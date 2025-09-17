"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { countries } from "@/data/countries";

type CountryType = {
  [key: string]: {
    name: string;
    code: string;
  };
};

interface PhoneNumberInputProps {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function PhoneNumberInput({
  form,
  name,
  label,
  placeholder = "Enter phone number",
  disabled = false,
}: PhoneNumberInputProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedCountry, setSelectedCountry] =
    React.useState<keyof CountryType>("tr");

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    if (!match) return digits;

    const parts = match
      .slice(1)
      .map((x) => x.trim())
      .filter((x) => x.length > 0);
    return parts.join(" ");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    const countryCode =
      countries[selectedCountry as keyof typeof countries].code;
    form.setValue(name, `${countryCode} ${formattedValue}`, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleCountrySelect = (countryKey: string) => {
    setSelectedCountry(countryKey as keyof CountryType);
    setOpen(false);
    const currentValue = form.getValues(name);
    const phoneNumber = currentValue?.split(" ").slice(1).join(" ") || "";
    const countryCode = countries[countryKey as keyof typeof countries].code;
    form.setValue(name, `${countryCode} ${phoneNumber}`, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  React.useEffect(() => {
    const countryCode =
      countries[selectedCountry as keyof typeof countries].code;
    form.setValue(name, countryCode + " ", {
      shouldValidate: false,
    });
  }, [form, name, selectedCountry]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && (
            <Label className={cn("text-sm font-medium text-gray-900")}>
              {label}
            </Label>
          )}
          <div className="flex gap-2 w-full flex-1">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  disabled={disabled}
                  className="w-[140px] h-10 justify-between bg-white border-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://flagicons.lipis.dev/flags/4x3/${selectedCountry}.svg`}
                      alt={
                        countries[selectedCountry as keyof typeof countries]
                          .name
                      }
                      width={24}
                      height={24}
                      className="rounded-sm"
                    />
                    <span className={cn("text-sm")}>
                      {
                        countries[selectedCountry as keyof typeof countries]
                          .code
                      }
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[240px] p-0">
                <Command>
                  <CommandInput placeholder="Search country..." />
                  <CommandList>
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className="h-[200px]">
                        {Object.entries(countries).map(([key, country]) => (
                          <CommandItem
                            key={key}
                            value={country.name}
                            onSelect={() => handleCountrySelect(key)}
                          >
                            <div className="flex items-center gap-2">
                              <img
                                src={`https://flagicons.lipis.dev/flags/4x3/${key}.svg`}
                                alt={country.name}
                                width={24}
                                height={24}
                                className="rounded-sm"
                              />
                              <span className={cn("text-sm")}>
                                {country.name}
                              </span>
                              <span
                                className={cn("text-sm text-gray-500 ml-auto")}
                              >
                                {country.code}
                              </span>
                            </div>
                            <Check
                              className={cn(
                                "ml-2 h-4 w-4",
                                selectedCountry === key
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormControl className="w-full">
              <Input
                {...field}
                aria-disabled={disabled}
                placeholder={placeholder}
                onChange={handlePhoneChange}
                className={cn("flex-1 h-10 bg-white text-sm border-gray-200")}
                value={field.value?.split(" ").slice(1).join(" ") || ""}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
