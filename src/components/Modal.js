import React from "react";
import Button from "./Button";

const Modal = ({ show = false, close = () => {}, children }) => {
  if (!show) return null;
  return (
    <div className="w-screen h-screen flex justify-center items-center absolute z-[3] inset-0 ">
      <div
        onClick={() => {
          close();
        }}
        className="w-full h-full bg-[#00000090] absolute inset-0 z-[3]"
      ></div>
      <div className="border border-black rounded-lg w-[40%] h-[40%] bg-white z-[4] overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default Modal;
