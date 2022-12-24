import React from 'react'
import {
  DeepPartial,
  FieldValues,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from 'react-hook-form'

type FormProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode
  defaultValues: DeepPartial<TFormValues>
}

export function Form<TFormValues extends FieldValues>({
  defaultValues,
  onSubmit,
  children,
}: FormProps<TFormValues>) {
  const methods = useForm<TFormValues>({ defaultValues })
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>
  )
}
