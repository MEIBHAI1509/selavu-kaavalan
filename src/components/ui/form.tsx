"use client";

import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

export const Form = FormProvider;

export function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(props: ControllerProps<TFieldValues, TName>) {
  return <Controller {...props} />;
}

export function FormItem({
  children,
}: React.PropsWithChildren) {
  return (
    <div className="space-y-2">
      {children}
    </div>
  );
}

export function FormLabel({
  children,
}: React.PropsWithChildren) {
  return (
    <label className="text-sm font-medium">
      {children}
    </label>
  );
}

export function FormControl({
  children,
}: React.PropsWithChildren) {
  return children;
}

export function FormDescription({
  children,
}: React.PropsWithChildren) {
  return (
    <p className="text-sm text-muted-foreground">
      {children}
    </p>
  );
}

export function FormMessage() {
  const {
    formState: { errors },
  } = useFormContext();

  const firstError = Object.values(errors)[0];

  if (!firstError) return null;

  return (
    <p className="text-sm text-red-500">
      {String(firstError.message)}
    </p>
  );
}