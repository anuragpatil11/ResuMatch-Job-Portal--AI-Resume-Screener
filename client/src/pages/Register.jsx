// // import React from "react";
// // import { useState } from "react";
// // const Register = () => {
// //   const [input, setInput] = useState({
// //     fullName: "",
// //     email: "",
// //     password: "",
// //     role: "",
// //     phone: "",
// //     DateOfBirth: "",
// //     Location: "",
// //   });

// //   const changeHandler = (e) => {
// //     const { name, value } = e.target;
// //     setInput((prev) => ({ ...prev, [name]: value }));
// //   };
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     console.log(input);
// //     setInput({
// //       fullName: "",
// //       email: "",
// //       password: "",
// //       role: "",
// //       phone: "",
// //       DateOfBirth: "",
// //       Location: "",
// //     });
// //   };
// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
// //       <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
// //         {/* Heading */}
// //         <div className="flex items-center justify-center">
// //           <h1 className="text-2xl font-bold text-gray-800">
// //             Create your <span className="text-blue-600">ResuMatch</span> Account
// //           </h1>
// //         </div>

// //         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
// //           <form
// //             action="#"
// //             method="POST"
// //             className="space-y-5"
// //             onSubmit={handleSubmit}
// //           >
// //             {/* Full Name */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-900">
// //                 Full Name
// //               </label>
// //               <input
// //                 type="text"
// //                 name="fullName"
// //                 value={input.fullName}
// //                 onChange={changeHandler}
// //                 required
// //                 placeholder="John Doe"
// //                 className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
// //               />
// //             </div>

// //             {/* Email */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-900">
// //                 Email address
// //               </label>
// //               <input
// //                 type="email"
// //                 name="email"
// //                 value={input.email}
// //                 onChange={changeHandler}
// //                 required
// //                 placeholder="example@xyz.com"
// //                 className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
// //               />
// //             </div>

// //             {/* Password */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-900">
// //                 Password
// //               </label>
// //               <input
// //                 type="password"
// //                 name="password"
// //                 value={input.password}
// //                 onChange={changeHandler}
// //                 required
// //                 placeholder="Enter your password"
// //                 className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
// //               />
// //             </div>

// //             {/* Role */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-900">
// //                 Role
// //               </label>
// //               <div className="mt-2 flex space-x-6">
// //                 <label className="flex items-center">
// //                   <input
// //                     type="radio"
// //                     name="role"
// //                     value="applicant"
// //                     checked={input.role === "applicant"}
// //                     onChange={changeHandler}
// //                     required
// //                     className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
// //                   />
// //                   <span className="ml-2 text-gray-700">Applicant</span>
// //                 </label>

// //                 <label className="flex items-center">
// //                   <input
// //                     type="radio"
// //                     name="role"
// //                     value="recruiter"
// //                     checked={input.role === "recruiter"}
// //                     onChange={changeHandler}
// //                     required
// //                     className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
// //                   />
// //                   <span className="ml-2 text-gray-700">Recruiter</span>
// //                 </label>
// //               </div>
// //             </div>

// //             {/* Phone */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-900">
// //                 Phone
// //               </label>
// //               <input
// //                 type="tel"
// //                 name="phone"
// //                 value={input.phone}
// //                 onChange={changeHandler}
// //                 placeholder="9876543210"
// //                 className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
// //               />
// //             </div>

// //             {/* Date of Birth */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-900">
// //                 Date of Birth
// //               </label>
// //               <input
// //                 type="date"
// //                 name="DateOfBirth"
// //                 value={input.DateOfBirth}
// //                 onChange={changeHandler}
// //                 required
// //                 className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
// //               />
// //             </div>

// //             {/* Location */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-900">
// //                 Location
// //               </label>
// //               <input
// //                 type="text"
// //                 name="Location"
// //                 value={input.Location}
// //                 onChange={changeHandler}
// //                 placeholder="Pune, India"
// //                 className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
// //               />
// //             </div>

// //             {/* Submit Button */}
// //             <div>
// //               <button
// //                 type="submit"
// //                 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
// //               >
// //                 Register
// //               </button>
// //             </div>
// //           </form>

// //           {/* Redirect */}
// //           <p className="mt-6 text-sm text-gray-500 text-center">
// //             Already have an account?{" "}
// //             <a
// //               href="/login"
// //               className="text-blue-600 font-medium hover:underline"
// //             >
// //               Login
// //             </a>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Register;
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { USER_API_URL } from "@/utils/constant.js";

// const Register = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       // Map 'recruiter' to 'admin' for backend
//       // const payload = {
//       //   ...data,
//       //   role: data.role === "recruiter" ? "admin" : data.role,
//       // };
//       console.log(data);

//       const response = await axios.post(`${USER_API_URL}/register`, data, {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       });
//       if (response.data.success) {
//         toast.success(response.data.message || "Registration successful!");
//         navigate("/login");
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message ||
//           "Registration failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
//       <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
//         <div className="flex items-center justify-center">
//           <h1 className="text-2xl font-bold text-gray-800">
//             Create your Resu<span className="text-blue-600">Match</span> Account
//           </h1>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
//           {/* Full Name */}
//           <div>
//             <label
//               htmlFor="fullName"
//               className="block text-sm font-medium text-gray-800"
//             >
//               Full Name
//             </label>
//             <input
//               id="fullName"
//               type="text"
//               {...register("fullName", { required: "Full name is required" })}
//               placeholder="John Doe"
//               className="mt-1 block w-full rounded-md px-4 py-2 text-gray-800 border border-gray-300 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
//             />
//             {errors.fullName && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.fullName.message}
//               </p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-800"
//             >
//               Email address
//             </label>
//             <input
//               id="email"
//               type="email"
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                   message: "Invalid email format",
//                 },
//               })}
//               placeholder="example@xyz.com"
//               className="mt-1 block w-full rounded-md px-4 py-2 text-gray-800 border border-gray-300 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
//             />
//             {errors.email && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-800"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               {...register("password", {
//                 required: "Password is required",
//                 minLength: {
//                   value: 6,
//                   message: "Password must be at least 6 characters",
//                 },
//               })}
//               placeholder="Enter your password"
//               className="mt-1 block w-full rounded-md px-4 py-2 text-gray-800 border border-gray-300 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
//             />
//             {errors.password && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.password.message}
//               </p>
//             )}
//           </div>

//           {/* Role */}
//           <div>
//             <label
//               htmlFor="role"
//               className="block text-sm font-medium text-gray-800"
//             >
//               Role
//             </label>
//             <div className="mt-2 flex space-x-6">
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   value="applicant"
//                   {...register("role", { required: "Role is required" })}
//                   className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-600"
//                 />
//                 <span className="ml-2 text-gray-700">Applicant</span>
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   value="recruiter"
//                   {...register("role", { required: "Role is required" })}
//                   className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-600"
//                 />
//                 <span className="ml-2 text-gray-700">Recruiter</span>
//               </label>
//             </div>
//             {errors.role && (
//               <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
//             )}
//           </div>

//           {/* Phone */}
//           <div>
//             <label
//               htmlFor="phone"
//               className="block text-sm font-medium text-gray-800"
//             >
//               Phone (Optional)
//             </label>
//             <input
//               id="phone"
//               type="tel"
//               {...register("phone", {
//                 pattern: {
//                   value: /^[0-9]{10}$/,
//                   message: "Invalid phone number (10 digits required)",
//                 },
//               })}
//               placeholder="9876543210"
//               className="mt-1 block w-full rounded-md px-4 py-2 text-gray-800 border border-gray-300 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
//             />
//             {errors.phone && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.phone.message}
//               </p>
//             )}
//           </div>

//           {/* Date of Birth */}
//           <div>
//             <label
//               htmlFor="DateOfBirth"
//               className="block text-sm font-medium text-gray-800"
//             >
//               Date of Birth
//             </label>
//             <input
//               id="dateOfBirth"
//               type="date"
//               {...register("dateOfBirth", {
//                 required: "Date of birth is required",
//                 validate: {
//                   validAge: (value) => {
//                     const today = new Date();
//                     const birthDate = new Date(value);
//                     const age = today.getFullYear() - birthDate.getFullYear();
//                     return age >= 16 || "You must be at least 16 years old";
//                   },
//                 },
//               })}
//               className="mt-1 block w-full rounded-md px-4 py-2 text-gray-800 border border-gray-300 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
//             />
//             {errors.dateOfBirth && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.dateOfBirth.message}
//               </p>
//             )}
//           </div>

//           {/* Location */}
//           <div>
//             <label
//               htmlFor="Location"
//               className="block text-sm font-medium text-gray-800"
//             >
//               Location (Optional)
//             </label>
//             <input
//               id="location"
//               type="text"
//               {...register("location")}
//               placeholder="Pune, India"
//               className="mt-1 block w-full rounded-md px-4 py-2 text-gray-800 border border-gray-300 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
//             />
//           </div>

//           {/* Submit Button */}
//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full rounded-full px-5 py-2 text-sm font-medium text-white ${
//                 loading
//                   ? "bg-blue-400 cursor-not-allowed"
//                   : "bg-blue-600 hover:bg-blue-700"
//               } transition`}
//             >
//               {loading ? "Registering..." : "Register"}
//             </button>
//           </div>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-600">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-blue-600 font-medium hover:underline"
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;

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