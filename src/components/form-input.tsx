import { InputHTMLAttributes } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";


type FormInputProps<TFieldValues extends FieldValues> = {
    control: Control<TFieldValues>,
    formControlName: keyof TFieldValues,
    label: string,
    type: InputHTMLAttributes<HTMLInputElement>['type'],
    placeholder?: string,
    formItemClassName?: string,
    formLabelClassName?: string,
    formControlClassName?: string,
    formInputClassName?: string,
    formMessageClassName?: string,
}

const FormInput = <TFieldValues extends FieldValues>({control, formControlName, label, type, placeholder, formControlClassName, formInputClassName, formItemClassName, formLabelClassName, formMessageClassName}: FormInputProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={formControlName as Path<TFieldValues>}
      render={({ field }) => (
        <FormItem className={formItemClassName}>
          <FormLabel className={formLabelClassName}>{label}</FormLabel>
          <FormControl className={formControlClassName}>
            <Input type={type} className={formInputClassName}  placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage className={formMessageClassName}/>
        </FormItem>
      )}
    />
  );
};

export default FormInput;
