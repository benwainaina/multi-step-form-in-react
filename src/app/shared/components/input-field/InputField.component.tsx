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
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={({ target: { value: newTextValue } }) => onChange(newTextValue)}
    />
  );
};
