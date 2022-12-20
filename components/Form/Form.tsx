import React from "react"
import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form"

type FormProps<TFormValues> = {
  onSubmit: SubmitHandler<TFormValues>
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode
}

export function Form<TFormValues extends Record<string, unknown>>({
  onSubmit,
  children,
}: FormProps<TFormValues>) {
  const methods = useForm<TFormValues>()
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>
  )
}
