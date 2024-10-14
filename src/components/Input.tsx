import React from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input = ({ value, onChange, label, ...props }: InputProps) => {
  return (
    <label>
      {label}
      <input
        {...props}
        className="myInput"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
