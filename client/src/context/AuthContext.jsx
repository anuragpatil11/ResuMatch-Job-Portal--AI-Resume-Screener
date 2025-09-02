import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("role") || "");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  // ✅ login function
  const login = async (email, password, role) => {
    //     `${USER_API_URL}/login`,
    //     { email, password },
    //     {
    //       headers: { "Content-Type": "application/json" },
    //       withCredentials: true,
    //     }
    //   );

    //   if (response.data.success) {
    //     navigate("/");
    //     toast.success(response.data.message || "Login successful!");
    //     localStorage.setItem("token", response.data.token);
    //     localStorage.setItem("role", response.data.user.role);
    //     // navigate(response.data.user.role === "admin" ? "/admin" : "/applicant");
    //   }
    // } catch (error) {
    //   toast.error(
    //     error.response?.data?.message || "Login failed. Please try again."
    //   );
    // }
    try {
      const res = await axios.post(
        `${SERVER_URL}/user/login`,
        { email, password, role },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setUser(res.data.user.role);
        setToken(res.data.token);

        // localStorage me token save karo
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);

        // ✅ success toast
        // toast.success("Login Successfully!");

        toast.success(res.data.message || "Login successful!");

        // ✅ navigate to homepage
        navigate("/");
      } else {
        toast.error(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error("Something went wrong!");
    }
  };
  // ✅ logout function
  const logout = () => {
    setToken("");
    setUser("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully");
    navigate("/login");
  };
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
