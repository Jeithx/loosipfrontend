import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";

interface Props
  extends Omit<InputProps, "form" | "name" | "label" | "placeholder"> {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  errorMsg?: boolean;
  textarea?: boolean;
}

export function InputElement({
  form,
  name,
  label,
  placeholder,
  disabled,
  onFocus,
  errorMsg = true,
  textarea = false,
  ...props
}: Props) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        // input ve textarea için field'ı ayır
        const { value, name: fieldName, ref, onChange: fieldOnChange, ...inputFieldProps } = field;
        const inputProps = {
          placeholder,
          disabled,
          onFocus: onFocus as React.FocusEventHandler<HTMLInputElement>,
          value,
          name: fieldName,
          ref,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => fieldOnChange(e.target.value),
          ...inputFieldProps,
          ...props,
        };
        const textareaProps = {
          className: cn(
            "block w-full rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-pink-500 focus:ring-pink-500 disabled:bg-gray-100 disabled:cursor-not-allowed",
            props.className
          ),
          placeholder,
          disabled,
          onFocus: onFocus as React.FocusEventHandler<HTMLTextAreaElement>,
          value,
          name: fieldName,
          ref,
          onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => fieldOnChange(e.target.value),
          rows: 4,
        };
        return (
          <FormItem
            className={cn("w-full", {
              "space-y-0.5": (label?.length ?? 0) > 0,
              "space-y-0": (label?.length ?? 0) === 0,
            })}
          >
            {label && (
              <FormLabel>
                <div className="truncate flex w-full justify-start">
                  <span className={cn("text-sm text-gray-500")}>{label}</span>
                </div>
              </FormLabel>
            )}
            <FormControl>
              {textarea ? (
                <textarea {...textareaProps} />
              ) : (
                <Input {...inputProps} />
              )}
            </FormControl>
            {errorMsg && <FormMessage />}
          </FormItem>
        );
      }}
    />
  );
}

export default InputElement;
