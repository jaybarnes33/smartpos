import React, { ChangeEvent } from "react";

const Input = ({
  placeholder,
  type,
  onChange,
  name,
}: {
  placeholder?: string;
  type?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      className="block w-full p-2 mb-3 bg-gray-100 placeholder:capitalize rounded"
      placeholder={placeholder}
      name={name}
      type={type ? type : "text"}
      onChange={onChange}
    />
  );
};

export default Input;
