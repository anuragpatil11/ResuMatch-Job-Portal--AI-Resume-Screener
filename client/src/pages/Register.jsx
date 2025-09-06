import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { User, Mail, Lock, Phone, Calendar, MapPin, ArrowRight } from "lucide-react";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${SERVER_URL}/user/register`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success(response.data.message || "Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed. Please try again."
      );
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
              Create Your Resu<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Match</span> Account
            </h1>
            <p className="text-gray-600 text-lg">Join us to start your journey</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1">
              <User className="w-4 h-4 text-gray-400" />
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              {...register("fullName", { required: "Full name is required" })}
              placeholder="John Doe"
              className={`block w-full rounded-xl px-4 py-3 text-gray-800 border ${
                errors.fullName ? "border-red-300" : "border-gray-300"
              } focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300 sm:text-sm`}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1">
              <Mail className="w-4 h-4 text-gray-400" />
              Email address
            </label>
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
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1">
              <Lock className="w-4 h-4 text-gray-400" />
              Password
            </label>
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
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1">
              <User className="w-4 h-4 text-gray-400" />
              Role
            </label>
            <div className="mt-2 flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="applicant"
                  {...register("role", { required: "Role is required" })}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-600 transition-all duration-300"
                />
                <span className="ml-2 text-gray-700">Applicant</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="recruiter"
                  {...register("role", { required: "Role is required" })}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-600 transition-all duration-300"
                />
                <span className="ml-2 text-gray-700">Recruiter</span>
              </label>
            </div>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1">
              <Phone className="w-4 h-4 text-gray-400" />
              Phone (Optional)
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone", {
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number (10 digits required)",
                },
              })}
              placeholder="9876543210"
              className={`block w-full rounded-xl px-4 py-3 text-gray-800 border ${
                errors.phone ? "border-red-300" : "border-gray-300"
              } focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300 sm:text-sm`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dateOfBirth" className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              {...register("dateOfBirth", {
                required: "Date of birth is required",
                validate: {
                  validAge: (value) => {
                    const today = new Date();
                    const birthDate = new Date(value);
                    const age = today.getFullYear() - birthDate.getFullYear();
                    return age >= 16 || "You must be at least 16 years old";
                  },
                },
              })}
              className={`block w-full rounded-xl px-4 py-3 text-gray-800 border ${
                errors.dateOfBirth ? "border-red-300" : "border-gray-300"
              } focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300 sm:text-sm`}
            />
            {errors.dateOfBirth && (
              <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1">
              <MapPin className="w-4 h-4 text-gray-400" />
              Location (Optional)
            </label>
            <input
              id="location"
              type="text"
              {...register("location")}
              placeholder="Pune, India"
              className={`block w-full rounded-xl px-4 py-3 text-gray-800 border ${
                errors.location ? "border-red-300" : "border-gray-300"
              } focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300 sm:text-sm`}
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:from-blue-700 hover:to-purple-700"
              }`}
            >
              {loading ? "Registering..." : "Register"}
              {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition-all duration-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;