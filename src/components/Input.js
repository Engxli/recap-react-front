import React from "react";
import Skeleton from "./Skeleton";

const Input = ({
  label = "label",
  placeholder = "placeholder",
  error = false,
  onChange = () => {},
  name,
  type = "text",
  isLoading = false,
  value = "",
}) => {
  if (isLoading)
    return (
      <div>
        <div className="flex flex-col w-full gap-1">
          <h4 className="text-[17px] w-[100px] h-[25px] rounded-lg overflow-hidden">
            <Skeleton className="w-full h-full" />
          </h4>
          <div className=" w-full h-[40px] rounded-lg overflow-hidden">
            <Skeleton className="w-full h-full" />
          </div>
          {error && <h4 className=" text-red-600">{error}</h4>}
        </div>
      </div>
    );
  return (
    <div className="flex flex-col w-full gap-1">
      <h4 className="text-[17px] ">{label}</h4>
      <input
        type={type}
        name={name}
        value={value ? value : undefined}
        placeholder={placeholder}
        className="border border-black rounded-lg px-5 h-10"
        onChange={onChange}
      />
      {error && <h4 className=" text-red-600">{error}</h4>}
    </div>
  );
};

export default Input;
