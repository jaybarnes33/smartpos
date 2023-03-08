import React, { ChangeEvent } from "react";

const Input = ({
  placeholder,
  type,
  onChange,
  name,
  textarea,
  label,
  value,
}: {
  placeholder?: string;
  type?: string;
  name?: string;
  label?: string;
  value?: string | number;
  textarea?: boolean;
  onChange?: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
}) => {
  return (
    <div className="mt-2">
      <label htmlFor={name} className="capitalize text-sm text-neutral-500">
        {label}
      </label>
      {!textarea ? (
        <input
          id={name}
          className="block w-full p-2 mb-3 bg-gray-100 placeholder:capitalize rounded"
          placeholder={placeholder}
          name={name}
          value={value}
          type={type ? type : "text"}
          onChange={onChange}
        />
      ) : (
        <textarea
          id={name}
          className="block w-full p-2 mb-3 bg-gray-100 placeholder:capitalize rounded"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Input;
