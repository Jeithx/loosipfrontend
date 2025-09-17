"use client";
import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
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

interface ComboboxOption {
  value: string;
  label: string;
}

interface CustomMultiComboboxProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
  buttonClassName?: string;
  contentClassName?: string;
}

const CustomMultiCombobox: React.FC<CustomMultiComboboxProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  className,
  buttonClassName,
  contentClassName,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleRemove = (val: string) => {
    onChange(value.filter((v) => v !== val));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between border-gray-200 w-full flex-wrap min-h-[44px]", buttonClassName)}
        >
          <div className="flex flex-wrap gap-1 items-center flex-1">
            {value.length === 0 && (
              <span className="text-gray-400">{placeholder}</span>
            )}
            {value.map((val) => {
              const opt = options.find((o) => o.value === val);
              if (!opt) return null;
              return (
                <span key={val} className="flex items-center bg-pink-100 text-pink-700 rounded-full px-2 py-0.5 text-xs font-medium mr-1">
                  {opt.label}
                  <button
                    type="button"
                    className="ml-1 text-pink-500 hover:text-pink-700"
                    onClick={e => {
                      e.stopPropagation();
                      handleRemove(val);
                    }}
                    tabIndex={-1}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0 w-full min-w-[200px]", contentClassName)}>
        <Command className={className}>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    if (value.includes(option.value)) {
                      onChange(value.filter((v) => v !== option.value));
                    } else {
                      onChange([...value, option.value]);
                    }
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value.includes(option.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CustomMultiCombobox; 