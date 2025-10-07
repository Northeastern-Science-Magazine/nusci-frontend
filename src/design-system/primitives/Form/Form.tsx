"use client";

import { useForm, FormProvider, SubmitHandler, FieldValues, UseFormProps, RegisterOptions, Path } from "react-hook-form";
import { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ReactElement, cloneElement } from "react";

type FormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  options?: UseFormProps<T>;
  className?: string;
};

/**
 * Form Wraps <form>
 */
export function Form<T extends FieldValues>({ onSubmit, children, options, className }: FormProps<T>) {
  const methods = useForm<T>(options);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
}

/**
 * All form inputs must be "Controlled"
 *
 * Meaning that they have the props `value`
 * and `onChange`. This essentially means that
 * the state is handled outside of the
 * component itself.
 */
type ControlledChildProps = {
  value?: any;
  onChange?: (...args: any[]) => any;
};

type FormFieldProps<TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>> = {
  name: TName;
  label?: string;
  rules?: RegisterOptions<TFieldValues, TName>;
  children: ReactElement<ControlledChildProps>;
};

export function FormField<TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>({
  name,
  label,
  rules,
  children,
}: FormFieldProps<TFieldValues, TName>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const fieldError = (errors as any)[name];

  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={String(name)}>{label}</label>}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) =>
          cloneElement(children, {
            ...children.props,
            value: field.value,
            onChange: field.onChange,
          })
        }
      />

      {fieldError?.message && <span className="text-sm text-red-500">{String(fieldError.message)}</span>}
    </div>
  );
}
