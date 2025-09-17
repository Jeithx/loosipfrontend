import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder,
  className,
  height,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder: string;
  className?: string;
  height?: string;
}) => {
  return (
    <Select
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger className={cn("w-full", className)} style={{
        height: height,
      }}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="border-gray-200">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
