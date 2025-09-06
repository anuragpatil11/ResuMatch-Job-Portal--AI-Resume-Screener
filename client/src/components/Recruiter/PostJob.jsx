// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Recruiter from "@/Sidebar/Recruiter";
// import { JOB_API_URL } from "@/utils/constant";

// const PostJob = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();
//   const [loading, setLoading] = useState(false);
//   // const [sidebarOpen, setSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("Please log in to post a job.");
//         navigate("/login");
//         return;
//       }
//       console.log(data);

//       // Transform comma-separated strings to arrays
//       const payload = {
//         ...data,
//         skillsRequired: data.skillsRequired.split(",").map((s) => s.trim()),
//         responsibilities: data.responsibilities.split(",").map((r) => r.trim()),
//         qualifications: data.qualifications.split(",").map((q) => q.trim()),
//       };

//       const response = await axios.post(`${JOB_API_URL}/createJob`, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       });

//       toast.success(response.data.message || "Job posted successfully!");
//       reset();
//       navigate("/recruiter");
//     } catch (error) {
//       console.log("Error response:", error.response?.data);
//       toast.error(error.response?.data?.message || "Failed to post job.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row ">
//       <Recruiter />

//       {/* Main Content */}
//       <main className="flex-1 p-6 ">
//         {/* Hamburger Menu Button for Mobile */}
//         <button
//           className="md:hidden mb-6 p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
//           onClick={() => setSidebarOpen(true)}
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h16m-7 6h7"
//             />
//           </svg>
//         </button>

//         <h1 className="text-3xl font-bold text-gray-800 mb-6">
//           Post a New Job
//         </h1>

//         <div className="bg-white shadow-md rounded-2xl p-8 max-w-2xl mx-auto">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* Title */}
//             <div>
//               <label
//                 htmlFor="title"
//                 className="block text-sm font-medium text-gray-800"
//               >
//                 Job Title
//               </label>
//               <input
//                 id="title"
//                 type="text"
//                 {...register("title", { required: "Job title is required" })}
//                 placeholder="e.g., Software Engineer - Backend"
//                 className="mt-1 block w-full rounded-md px-4 py-2 text-gray-800 border border-gray-300 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
//               />
//               {errors.title && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.title.message}
//                 </p>
//               )}
//             </div>

//             {/* Company */}
//             <div>
//               <label
//                 htmlFor="company"
//                 className="block text-sm font-medium text-gray-800"
//               >
//                 Company
//               </label>
//               <input
//                 id="company"
//                 type="text"
//                 {...register("company", {
//                   required: "Company name is required",
//                 })}
//                 placeholder="e.g., CodeCraft Labs"
//                 className="mt-1 block w-full rounded-md px-4 py-2 text-gray-800 border border-gray-300 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
//               />
//               {errors.company && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.company.message}
//                 </p>
//               )}
//             </div>

//             {/* Location */}
//             <div>
//               <label
//                 htmlFor="location"
//                 className="block text-sm font-medium text-gray-800"
//               >
//                 Location
//               </label>
//               <input
//                 id="location"
//                 type="text"
//                 {...register("location", { required: "Location is required" })}
//                 placeholder="e.g., Bangalore, Karnataka, India"
//                 className="mt-1 block w-full rounded-md px-4 py-2 text-gray-800 border border-gray-300 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
//               />
//               {errors.location && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.location.message}
//                 </p>
//               )}
//             </div>

//             {/* Employment Type */}
//             <div>
//               <label
//                 htmlFor="employmentType"
//                 className="block text-sm font-medium text-gray-800"
//               >
//                 Employment Type
//               </label>
//               <select
//                 id="employmentType"
//                 {...register("employmentType", {
//                   required: "Employment type is required",
//                 })}
//                 className="mt-1 block w-full rounded-md px-4 py-2 text-gray-800 border border-gray-300 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
//               >
//                 <option value="">Select Employment Type</option>
//                 <option value="Full-time">Full-time</option>
//                 <option value="Part-time">Part-time</option>
//                 <option value="Contract">Contract</option>
//                 <option value="Internship">Internship</option>
//               </select>
//               {errors.employmentType && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.employmentType.message}
//                 </p>
//               )}
//             </div>

//             {/* Experience Level */}
//             <div>
//               <label
//                 htmlFor="experienceLevel"
//                 className="block text-sm font-medium text-gray-800"
//               >
//                 Experience Level
//               </label>
//               <select
//                 id="experienceLevel"
//                 {...register("experienceLevel", {
//                   required: "Experience level is required",
//                 })}
//                 className="mt-1 block w-full rounded-md px-4 py-2 text-gray-800 border border-gray-300 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
//               >
//                 <option value="">Select Experience Level</option>
//                 <option value="Entry-level">Entry-level</option>
//                 <option value="Mid-level">Mid-level</option>
//                 <option value="Senior-level">Senior-level</option>
//               </select>
//               {errors.experienceLevel && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.experienceLevel.message}
//                 </p>
//               )}
//             </div>

//             {/* Salary Range */}
//             <div>
//               <label
//                 htmlFor="salaryRange"
//                 className="block text-sm font-medium text-gray-800"
//               >
//                 Salary Range
//               </label>
//               <input
//                 id="salaryRange"
//                 type="text"
//                 {...register("salaryRange", {
//                   required: "Salary range is required",
//                 })}
//                 placeholder="e.g., 4-5 LPA"
//                 className="mt-1 block w-full rounded-md px-4 py-2 text-gray-800 border border-gray-300 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
//               />
//               {errors.salaryRange && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.salaryRange.message}
//                 </p>
//               )}
//             </div>

//             {/* Skills Required */}
//             <div>
//               <label
//                 htmlFor="skillsRequired"
//                 className="block text-sm font-medium text-gray-800"
//               >
//                 Skills Required (comma-separated)
//               </label>
//               <textarea
//                 id="skillsRequired"
//                 {...register("skillsRequired", {
//                   required: "Skills are required",
//                 })}
//                 placeholder="e.g., Node.js, Express.js, MongoDB"
//                 className="mt-1 block w-full rounded-md px-4 py-2 text-gray-800 border border-gray-300 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
//                 rows="3"
//               />
//               {errors.skillsRequired && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.skillsRequired.message}
//                 </p>
//               )}
//             </div>

//             {/* Description */}
//             <div>
//               <label
//                 htmlFor="description"
//                 className="block text-sm font-medium text-gray-800"
//               >
//                 Job Description
//               </label>
//               <textarea
//                 id="description"
//                 {...register("description", {
//                   required: "Job description is required",
//                 })}
//                 placeholder="e.g., Join our backend engineering team..."
//                 className="mt-1 block w-full rounded-md px-4 py-2 text-gray-800 border border-gray-300 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
//                 rows="5"
//               />
//               {errors.description && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.description.message}
//                 </p>
//               )}
//             </div>

//             {/* Responsibilities */}
//             <div>
//               <label
//                 htmlFor="responsibilities"
//                 className="block text-sm font-medium text-gray-800"
//               >
//                 Responsibilities (comma-separated)
//               </label>
//               <textarea
//                 id="responsibilities"
//                 {...register("responsibilities", {
//                   required: "Responsibilities are required",
//                 })}
//                 placeholder="e.g., Design and implement RESTful APIs, Maintain backend services..."
//                 className="mt-1 block w-full rounded-md px-4 py-2 text-gray-800 border border-gray-300 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
//                 rows="3"
//               />
//               {errors.responsibilities && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.responsibilities.message}
//                 </p>
//               )}
//             </div>

//             {/* Qualifications */}
//             <div>
//               <label
//                 htmlFor="qualifications"
//                 className="block text-sm font-medium text-gray-800"
//               >
//                 Qualifications (comma-separated)
//               </label>
//               <textarea
//                 id="qualifications"
//                 {...register("qualifications", {
//                   required: "Qualifications are required",
//                 })}
//                 placeholder="e.g., Bachelor’s degree in Computer Science, Strong understanding of JavaScript..."
//                 className="mt-1 block w-full rounded-md px-4 py-2 text-gray-800 border border-gray-300 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
//                 rows="3"
//               />
//               {errors.qualifications && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.qualifications.message}
//                 </p>
//               )}
//             </div>

//             {/* Deadline */}
//             <div>
//               <label
//                 htmlFor="deadline"
//                 className="block text-sm font-medium text-gray-800"
//               >
//                 Application Deadline
//               </label>
//               <input
//                 id="deadline"
//                 type="date"
//                 {...register("deadline", { required: "Deadline is required" })}
//                 className="mt-1 block w-full rounded-md px-4 py-2 text-gray-800 border border-gray-300 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
//               />
//               {errors.deadline && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.deadline.message}
//                 </p>
//               )}
//             </div>

//             {/* Category */}
//             <div>
//               <label
//                 htmlFor="category"
//                 className="block text-sm font-medium text-gray-800"
//               >
//                 Job Category
//               </label>
//               <select
//                 id="category"
//                 {...register("category", {
//                   required: "Job category is required",
//                 })}
//                 className="mt-1 block w-full rounded-md px-4 py-2 text-gray-800 border border-gray-300 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
//               >
//                 <option value="">Select Job Category</option>
//                 <option value="Software Development">
//                   Software Development
//                 </option>
//                 <option value="Data Science">Data Science</option>
//                 <option value="DevOps">DevOps</option>
//                 <option value="Product Management">Product Management</option>
//                 <option value="Design">Design</option>
//                 <option value="Other">Other</option>
//               </select>
//               {errors.category && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.category.message}
//                 </p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full rounded-full px-5 py-2 text-sm font-medium text-white ${
//                   loading
//                     ? "bg-blue-400 cursor-not-allowed"
//                     : "bg-blue-600 hover:bg-blue-700"
//                 } transition`}
//               >
//                 {loading ? "Posting Job..." : "Post Job"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PostJob;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Recruiter from "@/Sidebar/Recruiter";
import {
  Briefcase,
  Building,
  MapPin,
  Clock,
  DollarSign,
  Code,
  FileText,
  List,
  GraduationCap,
  Calendar,
  Tag,
  ArrowRight,
} from "lucide-react";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const PostJob = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to post a job.");
        navigate("/login");
        return;
      }

      // Transform comma-separated strings to arrays
      const payload = {
        ...data,
        skillsRequired: data.skillsRequired
          ? data.skillsRequired
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s)
          : [],
        responsibilities: data.responsibilities
          ? data.responsibilities
              .split(",")
              .map((r) => r.trim())
              .filter((r) => r)
          : [],
        qualifications: data.qualifications
          ? data.qualifications
              .split(",")
              .map((q) => q.trim())
              .filter((q) => q)
          : [],
      };

      const response = await axios.post(
        `${SERVER_URL}/job/createJob`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(response.data.message || "Job posted successfully!");
      reset();
      navigate("/recruiter/posted-jobs");
    } catch (error) {
      console.error("Error posting job:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to post job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Recruiter />
      <main className="flex-1 p-6 pt-16 md:pt-20 lg:ml-72">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Post a New{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Job
                </span>
              </h1>
              <p className="text-gray-600 text-lg">
                Create a job listing to attract top talent
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1"
                >
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  Job Title
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title", { required: "Job title is required" })}
                  placeholder="e.g., Software Engineer - Backend"
                  className={`block w-full rounded-xl px-4 py-3 text-gray-800 border ${
                    errors.title ? "border-red-300" : "border-gray-300"
                  } focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300 sm:text-sm`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="company"
                  className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1"
                >
                  <Building className="w-4 h-4 text-gray-400" />
                  Company
                </label>
                <input
                  id="company"
                  type="text"
                  {...register("company", {
                    required: "Company name is required",
                  })}
                  placeholder="e.g., CodeCraft Labs"
                  className={`block w-full rounded-xl px-4 py-3 text-gray-800 border ${
                    errors.company ? "border-red-300" : "border-gray-300"
                  } focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300 sm:text-sm`}
                />
                {errors.company && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.company.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1"
                >
                  <MapPin className="w-4 h-4 text-gray-400" />
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  placeholder="e.g., Bangalore, Karnataka, India"
                  className={`block w-full rounded-xl px-4 py-3 text-gray-800 border ${
                    errors.location ? "border-red-300" : "border-gray-300"
                  } focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300 sm:text-sm`}
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Employment Type */}
              <div>
                <label
                  htmlFor="employmentType"
                  className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1"
                >
                  <Clock className="w-4 h-4 text-gray-400" />
                  Employment Type
                </label>
                <select
                  id="employmentType"
                  {...register("employmentType", {
                    required: "Employment type is required",
                  })}
                  className={`block w-full rounded-xl px-4 py-3 text-gray-800 border ${
                    errors.employmentType ? "border-red-300" : "border-gray-300"
                  } focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300 sm:text-sm`}
                >
                  <option value="">Select Employment Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
                {errors.employmentType && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.employmentType.message}
                  </p>
                )}
              </div>

              {/* Experience Level */}
              <div>
                <label
                  htmlFor="experienceLevel"
                  className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1"
                >
                  <Tag className="w-4 h-4 text-gray-400" />
                  Experience Level
                </label>
                <select
                  id="experienceLevel"
                  {...register("experienceLevel", {
                    required: "Experience level is required",
                  })}
                  className={`block w-full rounded-xl px-4 py-3 text-gray-800 border ${
                    errors.experienceLevel
                      ? "border-red-300"
                      : "border-gray-300"
                  } focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300 sm:text-sm`}
                >
                  <option value="">Select Experience Level</option>
                  <option value="Entry-level">Entry-level</option>
                  <option value="Mid-level">Mid-level</option>
                  <option value="Senior-level">Senior-level</option>
                </select>
                {errors.experienceLevel && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.experienceLevel.message}
                  </p>
                )}
              </div>

              {/* Salary Range */}
              <div>
                <label
                  htmlFor="salaryRange"
                  className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1"
                >
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  Salary Range
                </label>
                <input
                  id="salaryRange"
                  type="text"
                  {...register("salaryRange", {
                    required: "Salary range is required",
                  })}
                  placeholder="e.g., 4-5 LPA"
                  className={`block w-full rounded-xl px-4 py-3 text-gray-800 border ${
                    errors.salaryRange ? "border-red-300" : "border-gray-300"
                  } focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300 sm:text-sm`}
                />
                {errors.salaryRange && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.salaryRange.message}
                  </p>
                )}
              </div>

              {/* Skills Required */}
              <div>
                <label
                  htmlFor="skillsRequired"
                  className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1"
                >
                  <Code className="w-4 h-4 text-gray-400" />
                  Skills Required (comma-separated)
                </label>
                <textarea
                  id="skillsRequired"
                  {...register("skillsRequired", {
                    required: "Skills are required",
                  })}
                  placeholder="e.g., Node.js, Express.js, MongoDB"
                  className={`block w-full rounded-xl px-4 py-3 text-gray-800 border ${
                    errors.skillsRequired ? "border-red-300" : "border-gray-300"
                  } focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300 sm:text-sm`}
                  rows="3"
                />
                {errors.skillsRequired && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.skillsRequired.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1"
                >
                  <FileText className="w-4 h-4 text-gray-400" />
                  Job Description
                </label>
                <textarea
                  id="description"
                  {...register("description", {
                    required: "Job description is required",
                  })}
                  placeholder="e.g., Join our backend engineering team..."
                  className={`block w-full rounded-xl px-4 py-3 text-gray-800 border ${
                    errors.description ? "border-red-300" : "border-gray-300"
                  } focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300 sm:text-sm`}
                  rows="5"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Responsibilities */}
              <div>
                <label
                  htmlFor="responsibilities"
                  className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1"
                >
                  <List className="w-4 h-4 text-gray-400" />
                  Responsibilities (comma-separated)
                </label>
                <textarea
                  id="responsibilities"
                  {...register("responsibilities", {
                    required: "Responsibilities are required",
                  })}
                  placeholder="e.g., Design and implement RESTful APIs, Maintain backend services..."
                  className={`block w-full rounded-xl px-4 py-3 text-gray-800 border ${
                    errors.responsibilities
                      ? "border-red-300"
                      : "border-gray-300"
                  } focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300 sm:text-sm`}
                  rows="3"
                />
                {errors.responsibilities && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.responsibilities.message}
                  </p>
                )}
              </div>

              {/* Qualifications */}
              <div>
                <label
                  htmlFor="qualifications"
                  className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1"
                >
                  <GraduationCap className="w-4 h-4 text-gray-400" />
                  Qualifications (comma-separated)
                </label>
                <textarea
                  id="qualifications"
                  {...register("qualifications", {
                    required: "Qualifications are required",
                  })}
                  placeholder="e.g., Bachelor’s degree in Computer Science, Strong understanding of JavaScript..."
                  className={`block w-full rounded-xl px-4 py-3 text-gray-800 border ${
                    errors.qualifications ? "border-red-300" : "border-gray-300"
                  } focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300 sm:text-sm`}
                  rows="3"
                />
                {errors.qualifications && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.qualifications.message}
                  </p>
                )}
              </div>

              {/* Deadline */}
              <div>
                <label
                  htmlFor="deadline"
                  className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1"
                >
                  <Calendar className="w-4 h-4 text-gray-400" />
                  Application Deadline
                </label>
                <input
                  id="deadline"
                  type="date"
                  {...register("deadline", {
                    required: "Deadline is required",
                    validate: {
                      futureDate: (value) => {
                        const today = new Date().setHours(0, 0, 0, 0);
                        const inputDate = new Date(value).setHours(0, 0, 0, 0);
                        return (
                          inputDate >= today ||
                          "Deadline must be today or in the future"
                        );
                      },
                    },
                  })}
                  className={`block w-full rounded-xl px-4 py-3 text-gray-800 border ${
                    errors.deadline ? "border-red-300" : "border-gray-300"
                  } focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300 sm:text-sm`}
                />
                {errors.deadline && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.deadline.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1"
                >
                  <Tag className="w-4 h-4 text-gray-400" />
                  Job Category
                </label>
                <select
                  id="category"
                  {...register("category", {
                    required: "Job category is required",
                  })}
                  className={`block w-full rounded-xl px-4 py-3 text-gray-800 border ${
                    errors.category ? "border-red-300" : "border-gray-300"
                  } focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300 sm:text-sm`}
                >
                  <option value="">Select Job Category</option>
                  <option value="Software Development">
                    Software Development
                  </option>
                  <option value="Data Science">Data Science</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Product Management">Product Management</option>
                  <option value="Design">Design</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
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
                  {loading ? "Posting Job..." : "Post Job"}
                  {!loading && (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostJob;
