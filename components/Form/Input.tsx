import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react"
import React from "react"

import { mapValueToLabel } from "lib/form"

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  ChakraInputProps & { errors?: { name?: { message: string } } }

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    return (
      <FormControl isInvalid={!!props.errors?.[props.name]}>
        <FormLabel htmlFor={props.name}>
          {mapValueToLabel[props.name] || props.name}{" "}
        </FormLabel>
        <ChakraInput ref={ref} {...props} />
        <FormErrorMessage>
          {props.errors?.[props.name] && props.errors?.[props.name].message}
        </FormErrorMessage>
      </FormControl>
    )
  }
)

type Option = {
  label: React.ReactNode
  value: string | number
}

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & { options: Option[] }

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ options, ...props }, ref) {
    return (
      <select ref={ref} {...props}>
        {options.map(({ label, value }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>
    )
  }
)
