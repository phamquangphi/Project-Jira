import { HTMLInputTypeAttribute } from "react";
import { UseFormRegister } from "react-hook-form";

type InputProps = {
  register?: UseFormRegister<any>;
  error?: string;
  name?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  label?: string;
  className?: string;
  disabled?: boolean;
};
export const Input = ({
  register,
  error,
  name,
  placeholder,
  type,
  label,
  className,
  disabled,
}: InputProps) => {
  return (
    <div className={className}>
      {label && <p className="mb-3">{label}</p>}
      <input
        type={type}
        {...register(name)}
        disabled={disabled}
        placeholder={placeholder}
        className="outline-none block lg:w-full sm:w-full lg:p-3 sm:p-2  text-black rounded-xl backdrop-sepia bg-white/30 focus:text-black placeholder:text-black"
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
