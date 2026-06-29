"use client";

import {
  Control,
  FieldPath,
  FieldValues,
} from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

interface FormInputProps<
  TFieldValues extends FieldValues,
> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
}

export function FormInput<
  TFieldValues extends FieldValues,
>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: FormInputProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Input
              {...field}
              value={field.value ?? ""}
              type={type}
              placeholder={placeholder}
              onChange={(e) => {
                if (type === "number") {
                  field.onChange(
                    e.target.value === ""
                      ? undefined
                      : Number(e.target.value)
                  );
                } else {
                  field.onChange(e.target.value);
                }
              }}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}