import React from "react";

const MyProfile = () => {
  return (
    <div className="w-screen h-screen bg-red-500 flex justify-center items-center">
      <div className="w-[300px] h-[300px] bg-[#ffffff90] flex justify-center items-center relative ">
        <div className="w-full h-full bg-green-300 rounded-lg absolute z-[-1]"></div>
        <div className="w-[100px] h-[100px] bg-yellow-400 absolute top-[-40px] right-[-40px] rounded-full z-[-20]"></div>
      </div>
    </div>
  );
};

export default MyProfile;
