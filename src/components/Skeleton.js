import React from "react";

const Skeleton = ({ className = "w-[70px] h-[70px]" }) => {
  return (
    <div className={`animate-pulse w-full h-full`}>
      <div className={`bg-gray-500 ${className}`}></div>
    </div>
  );
};

export default Skeleton;
