
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password, data.role);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 sm:px-6 lg:px-8 pt-16 md:pt-20">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Login to Resu
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Match
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              Access your account to continue
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1"
            >
              <Mail className="w-4 h-4 text-gray-400" />
              Email address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                placeholder="example@xyz.com"
                className={`block w-full rounded-xl px-4 py-3 text-gray-800 border ${
                  errors.email ? "border-red-300" : "border-gray-300"
                } focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300 sm:text-sm`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1"
            >
              <Lock className="w-4 h-4 text-gray-400" />
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Enter your password"
                className={`block w-full rounded-xl px-4 py-3 text-gray-800 border ${
                  errors.password ? "border-red-300" : "border-gray-300"
                } focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300 sm:text-sm`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label
              htmlFor="role"
              className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1"
            >
              <User className="w-4 h-4 text-gray-400" />
              Role
            </label>
            <div className="relative">
              <select
                id="role"
                {...register("role", { required: "Role is required" })}
                className={`block w-full rounded-xl px-4 py-3 text-gray-800 border ${
                  errors.role ? "border-red-300" : "border-gray-300"
                } focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300 sm:text-sm`}
              >
                <option value="">Select your role</option>
                <option value="applicant">Applicant</option>
                <option value="recruiter">Recruiter</option>
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.role.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:from-blue-700 hover:to-purple-700"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
              {!loading && (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition-all duration-300"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
