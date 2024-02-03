import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import MyProfile from "./pages/MyProfile";
import UserProfile from "./pages/UserProfile";
import NotFoundPage from "./pages/NotFoundPage";
import UserContext from "./context/UserContext";
import { getToken } from "./apis/storage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  { path: "/profile", element: <MyProfile /> },
  { path: "/profile/:userId", element: <UserProfile /> },
  { path: "/*", element: <NotFoundPage /> },
]);
function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setUser(true);
    }
  }, []);

  return (
    <div>
      <UserContext.Provider value={[user, setUser]}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
