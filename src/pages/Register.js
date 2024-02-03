import React, { useContext, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import ImgaePicker from "../components/ImgaePicker";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "../apis/auth";
import { storeToken } from "../apis/storage";
import UserContext from "../context/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [user, setUser] = useContext(UserContext);

  const handleUserInput = (e) => {
    {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  };

  const checkInput = () => {
    if (!userInfo.username) {
      return true;
    }
    if (!userInfo.password) {
      return true;
    }
    if (!userInfo.fullName) {
      return true;
    }
    if (!userInfo.confirmPassword) {
      return true;
    }

    if (userInfo.confirmPassword != userInfo.password) {
      return true;
    }

    return false;
  };

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["register"],
    mutationFn: () => register(userInfo),
    onSuccess: (data) => {
      storeToken(data.token);
      setUser(true);
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[35%] h-[60%] border border-black rounded-lg flex flex-col justify-around items-center gap-3">
        <h1 className="text-[30px]">Register </h1>
        <div className="flex flex-col gap-2 w-[70%]">
          <div className="flex justify-center items-center w-[100%]">
            <div className="w-[100px] h-[100px] overflow-hidden rounded-full border border-black">
              <ImgaePicker />
            </div>
          </div>
          <Input
            isLoading={isPending}
            onChange={handleUserInput}
            label="Full name"
            placeholder="Enter your full name"
            name={"fullName"}
          />
          <Input
            isLoading={isPending}
            onChange={handleUserInput}
            label="Username"
            placeholder="Enter your username"
            name={"username"}
          />
          <Input
            isLoading={isPending}
            onChange={handleUserInput}
            label="Password"
            placeholder="Enter your password"
            name={"password"}
            type="password"
          />
          <Input
            isLoading={isPending}
            onChange={handleUserInput}
            label="Confirm password"
            placeholder="Enter your password again"
            name={"confirmPassword"}
            type="password"
          />
        </div>
        <div className="w-[70%] flex justify-end items-center gap-5">
          <div>
            You have an account?
            <span
              onClick={() => {
                navigate("/login");
              }}
              className="cursor-pointer text-blue-600"
            >
              Login
            </span>
          </div>
          <div className="w-[30%]">
            <Button
              lable="Register"
              disable={checkInput()}
              onClick={mutate}
              isLoading={isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
