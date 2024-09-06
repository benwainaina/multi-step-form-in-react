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
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  return (
    <div className="flex gap-y-2 flex-col">
      <input
        className="w-full py-4 pl-2 outline outline-1 outline-slate-200 rounded-lg font-poppins"
        type={type}
        value={value}
        onChange={({ target: { value: newTextValue } }) =>
          onChange(newTextValue)
        }
      />
      <span className="font-poppins text-xs text-slate-500 font-bold">
        {placeholder}
      </span>
    </div>
  );
};
