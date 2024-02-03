import { instance } from ".";

const login = async (userInfo) => {
  const res = await instance.post("/api/auth/login", userInfo);
  return res.data;
};

const register = async (userInfo) => {
  const res = await instance.post("/api/auth/register", userInfo);
  return res.data;
};

const me = async () => {
  const res = await instance.get("/api/auth/me");
  return res.data;
};

export { login, register, me };
