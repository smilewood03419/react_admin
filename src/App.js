import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.scss";

import AdminPage from "./layout/Admin";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UpdateProfile from "./pages/updateProfile";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContext } from "./utils/userContext";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<AdminPage />}>
          <Route index element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/profile" element={<UpdateProfile />} />
        </Route>
      </Routes>
      <ToastContainer />
    </UserContext.Provider>
  );
}

export default App;
