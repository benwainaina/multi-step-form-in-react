import { useEffect, useState } from "react";

export const InputFieldComponent = ({
  type,
  placeholder,
  initialValue,
  onChange,
}: {
  type: string;
  placeholder: string;
  initialValue: any;
  onChange: Function;
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (initialValue !== undefined) {
      setValue(initialValue);
    }
  }, [initialValue]);

  return (
    <input
      className="w-full py-5 pl-2 outline outline-1 outline-slate-200 rounded-2xl font-poppins"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={({ target: { value: newTextValue } }) => onChange(newTextValue)}
    />
  );
};
