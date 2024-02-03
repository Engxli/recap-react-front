import React from "react";
import Skeleton from "./Skeleton";

const Button = ({
  lable = "label",
  onClick = () => {},
  isLoading = false,
  disable = false,
}) => {
  if (disable) {
    return (
      <div className="w-full border border-black px-5 py-2 rounded-lg text-center  hover:bg-gray-300  cursor-not-allowed">
        {lable}
      </div>
    );
  }
  if (isLoading)
    return (
      <div className="w-full rounded-lg text-center cursor-pointer hover:bg-gray-300 h-[40px] overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
    );
  return (
    <div
      onClick={onClick}
      className="w-full border border-black px-5 py-2 rounded-lg text-center cursor-pointer hover:bg-gray-300"
    >
      {lable}
    </div>
  );
};

export default Button;
