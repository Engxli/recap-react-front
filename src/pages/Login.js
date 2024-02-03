import React, { useContext, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate, Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../apis/auth";
import Skeleton from "../components/Skeleton";
import { storeToken } from "../apis/storage";
import UserContext from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [user, setUser] = useContext(UserContext);
  const handleUserInput = (e) => {
    {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  };

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => login(userInfo),
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
      <div className="w-[30%] h-[35%] border border-black rounded-lg flex flex-col justify-around items-center gap-3">
        <h1 className="text-[30px]">Login</h1>
        <div className="flex flex-col gap-2 w-[70%]">
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
            error={JSON.stringify(error?.response?.data)}
          />
        </div>
        <div className="w-[70%] flex justify-end items-center gap-3">
          <div>
            You don't have an account?{" "}
            <span
              className="cursor-pointer text-blue-600"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </span>
          </div>
          <div className="w-[30%]">
            <Button lable="Login" onClick={mutate} isLoading={isPending} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
