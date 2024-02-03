import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { me } from "../apis/auth";
import ImgaePicker from "./ImgaePicker";
import Button from "./Button";
import { removeToken } from "../apis/storage";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const UserNav = ({ setShowModal }) => {
  const { data } = useQuery({
    queryKey: ["myProfile"],
    queryFn: () => me(),
  });

  const navigate = useNavigate();

  const [user, setUser] = useContext(UserContext);
  const logout = () => {
    removeToken();
    setUser(false);
    return navigate("/login");
  };

  return (
    <div className="h-[200px] bg-red-500 flex gap-5 justify-start items-center">
      <div className="w-[150px] overflow-hidden h-[150px] rounded-full">
        <ImgaePicker />
      </div>
      <div>{data?.username}</div>
      <div>
        <Button lable="Logout" onClick={logout} />
      </div>
      <div className="ml-auto mr-[50px]">
        <div>
          <Button
            lable="New Tweet"
            onClick={() => {
              setShowModal(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserNav;
