// import Applicant from "@/Sidebar/Applicant";
// import { JOB_API_URL } from "@/utils/constant";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// const Job = () => {
//   const { jobId } = useParams();
//   const [job, setJob] = useState(null);
//   const [isApplying, setIsApplying] = useState(false);
//   const [hasApplied, setHasApplied] = useState(false);

//   useEffect(() => {
//     const fetchJob = async () => {
//       try {
//         const res = await axios.get(`${JOB_API_URL}/${jobId}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           withCredentials: true,
//         });

//         if (res.data.success) {
//           setJob(res.data.job);
//         }
//       } catch (error) {
//         console.error("Error fetching job:", error);
//         toast.error("Failed to load job details");
//       }
//     };

//     fetchJob();
//   }, [jobId]);

//   const applyToJob = async (jobId) => {
//     try {
//       setIsApplying(true);

//       const res = await axios.post(
//         `${JOB_API_URL}/apply/${jobId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         toast.success("Application submitted successfully!");
//         setJob((prev) => ({ ...prev, status: "Closed" }));
//         setHasApplied(true);
//       } else {
//         toast.error(res.data.message || "Failed to apply to job");
//       }
//     } catch (error) {
//       console.error("Apply error:", error);
//       toast.error(error?.response?.data?.message || "Failed to apply to job");
//     } finally {
//       setIsApplying(false);
//     }
//   };

//   if (!job) return <p>Loading...</p>;

//   return (
//     <div className="flex">
//       <Applicant />
//       <div className="max-w-4xl p-6 bg-white shadow-lg rounded-xl">
//         {/* Title & Company */}
//         <p>{job._id}</p>
//         <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
//         <p className="text-lg text-gray-600">{job.company}</p>
//         <p className="text-sm text-gray-500">{job.location}</p>

//         {/* Job Info */}
//         <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
//           <p>
//             <strong>Employment:</strong> {job.employmentType}
//           </p>
//           <p>
//             <strong>Experience:</strong> {job.experienceLevel}
//           </p>
//           <p>
//             <strong>Salary:</strong> {job.salaryRange}
//           </p>
//           <p>
//             <strong>Status:</strong> {job.status}
//           </p>
//         </div>

//         {/* Skills */}
//         <div className="mt-4">
//           <h2 className="font-semibold">Skills Required:</h2>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {job.skillsRequired.map((skill, idx) => (
//               <span
//                 key={idx}
//                 className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
//               >
//                 {skill}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Description */}
//         <div className="mt-6">
//           <h2 className="font-semibold">Job Description:</h2>
//           <p className="text-gray-700 mt-2">{job.description}</p>
//         </div>

//         {/* Responsibilities */}
//         <div className="mt-6">
//           <h2 className="font-semibold">Responsibilities:</h2>
//           <ul className="list-disc pl-5 text-gray-700 mt-2">
//             {job.responsibilities.map((res, idx) => (
//               <li key={idx}>{res}</li>
//             ))}
//           </ul>
//         </div>

//         {/* Qualifications */}
//         <div className="mt-6">
//           <h2 className="font-semibold">Qualifications:</h2>
//           <ul className="list-disc pl-5 text-gray-700 mt-2">
//             {job.qualifications.map((qual, idx) => (
//               <li key={idx}>{qual}</li>
//             ))}
//           </ul>
//         </div>

//         {/* Deadline */}
//         <p className="mt-6 text-sm text-gray-500">
//           <strong>Deadline:</strong> {new Date(job.deadline).toDateString()}
//         </p>

//         {/* Apply Button */}
//         <button
//           className={`mt-6 px-6 py-2 rounded-lg font-medium transition duration-200 ${
//             hasApplied
//               ? "bg-gray-400 text-white cursor-not-allowed"
//               : "bg-blue-600 text-white hover:bg-blue-700"
//           }`}
//           onClick={() => applyToJob(job._id)}
//           disabled={isApplying || hasApplied}
//         >
//           {isApplying ? "Applying..." : hasApplied ? "Applied" : "Apply Now"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Job;

// import Applicant from "@/Sidebar/Applicant";
// import { JOB_API_URL } from "@/utils/constant";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   MapPin,
//   Clock,
//   DollarSign,
//   Building2,
//   Calendar,
//   Users,
//   Briefcase,
//   GraduationCap,
//   CheckCircle2,
//   ArrowLeft,
//   Send,
//   Bookmark,
//   Share2,
//   AlertCircle,
//   Target,
//   Award,
//   TrendingUp,
//   Star,
//   Eye,
//   Heart,
//   ExternalLink,
// } from "lucide-react";

// const Job = () => {
//   const { jobId } = useParams();
//   const navigate = useNavigate();
//   const [job, setJob] = useState(null);
//   const [isApplying, setIsApplying] = useState(false);
//   const [hasApplied, setHasApplied] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isBookmarked, setIsBookmarked] = useState(false);

//   useEffect(() => {
//     const fetchJob = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(`${JOB_API_URL}/${jobId}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           withCredentials: true,
//         });

//         if (res.data.success) {
//           setJob(res.data.job);
//           // Check if already applied (you can modify this logic based on your backend)
//           // setHasApplied(res.data.job.applications?.includes(currentUserId));
//         }
//       } catch (error) {
//         console.error("Error fetching job:", error);
//         toast.error("Failed to load job details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJob();
//   }, [jobId]);

//   const applyToJob = async (jobId) => {
//     try {
//       setIsApplying(true);

//       const res = await axios.post(
//         `${JOB_API_URL}/apply/${jobId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         toast.success("Application submitted successfully!");
//         setJob((prev) => ({ ...prev, status: "Closed" }));
//         setHasApplied(true);
//       } else {
//         toast.error(res.data.message || "Failed to apply to job");
//       }
//     } catch (error) {
//       console.error("Apply error:", error);
//       toast.error(error?.response?.data?.message || "Failed to apply to job");
//     } finally {
//       setIsApplying(false);
//     }
//   };

//   const handleBookmark = () => {
//     setIsBookmarked(!isBookmarked);
//     toast.success(
//       isBookmarked ? "Removed from bookmarks" : "Added to bookmarks"
//     );
//   };

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: job.title,
//         text: `Check out this job opportunity: ${job.title} at ${job.company}`,
//         url: window.location.href,
//       });
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       toast.success("Job link copied to clipboard!");
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "open":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "closed":
//         return "bg-red-100 text-red-800 border-red-200";
//       case "paused":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   const isJobExpired = job && new Date(job.deadline) < new Date();
//   const daysUntilDeadline = job
//     ? Math.ceil((new Date(job.deadline) - new Date()) / (1000 * 60 * 60 * 24))
//     : 0;

//   if (loading) {
//     return (
//       <div className="flex bg-gray-50 min-h-screen">
//         <Applicant />
//         <div className="flex-1 p-6">
//           <div className="max-w-5xl mx-auto animate-pulse">
//             <div className="bg-white rounded-2xl shadow-sm border p-8">
//               <div className="h-8 bg-gray-200 rounded-lg w-1/4 mb-4"></div>
//               <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
//               <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
//               <div className="grid grid-cols-2 gap-4 mb-6">
//                 {[1, 2, 3, 4].map((item) => (
//                   <div key={item} className="h-4 bg-gray-200 rounded"></div>
//                 ))}
//               </div>
//               <div className="space-y-6">
//                 {[1, 2, 3].map((item) => (
//                   <div key={item} className="space-y-2">
//                     <div className="h-5 bg-gray-200 rounded w-1/4"></div>
//                     <div className="space-y-1">
//                       <div className="h-4 bg-gray-200 rounded"></div>
//                       <div className="h-4 bg-gray-200 rounded w-5/6"></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!job) {
//     return (
//       <div className="flex bg-gray-50 min-h-screen">
//         <Applicant />
//         <div className="flex-1 p-6">
//           <div className="max-w-5xl mx-auto">
//             <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
//               <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                 Job Not Found
//               </h2>
//               <p className="text-gray-600 mb-6">
//                 The job you're looking for might have been removed or doesn't
//                 exist.
//               </p>
//               <button
//                 onClick={() => navigate("/applicant/jobs")}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
//               >
//                 Browse All Jobs
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
//       <Applicant />
//       <div className="flex-1 p-6">
//         <div className="max-w-5xl mx-auto">
//           {/* Back Button */}
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-200"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             <span className="font-medium">Back to Jobs</span>
//           </button>

//           {/* Main Job Card */}
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//             {/* Header Section */}
//             <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-8 text-white relative">
//               <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-4 mb-4">
//                     <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
//                       <Building2 className="w-8 h-8 text-white" />
//                     </div>
//                     <div>
//                       <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
//                       <p className="text-xl text-blue-100 font-medium">
//                         {job.company}
//                       </p>
//                       <div className="flex items-center gap-2 text-blue-100 mt-1">
//                         <MapPin className="w-4 h-4" />
//                         <span>{job.location}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={handleBookmark}
//                     className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
//                       isBookmarked
//                         ? "bg-yellow-500 text-white"
//                         : "bg-white bg-opacity-20 text-white hover:bg-opacity-30"
//                     }`}
//                   >
//                     <Bookmark className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={handleShare}
//                     className="w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl flex items-center justify-center text-white transition-all duration-200"
//                   >
//                     <Share2 className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               {/* Job Stats */}
//               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white border-opacity-20">
//                 <div className="text-center">
//                   <Briefcase className="w-6 h-6 mx-auto mb-2 text-blue-200" />
//                   <p className="text-sm text-blue-200">Type</p>
//                   <p className="font-semibold">{job.employmentType}</p>
//                 </div>
//                 <div className="text-center">
//                   <TrendingUp className="w-6 h-6 mx-auto mb-2 text-blue-200" />
//                   <p className="text-sm text-blue-200">Experience</p>
//                   <p className="font-semibold">{job.experienceLevel}</p>
//                 </div>
//                 <div className="text-center">
//                   <DollarSign className="w-6 h-6 mx-auto mb-2 text-blue-200" />
//                   <p className="text-sm text-blue-200">Salary</p>
//                   <p className="font-semibold">{job.salaryRange}</p>
//                 </div>
//                 <div className="text-center">
//                   <Clock className="w-6 h-6 mx-auto mb-2 text-blue-200" />
//                   <p className="text-sm text-blue-200">Deadline</p>
//                   <p className="font-semibold">
//                     {daysUntilDeadline > 0
//                       ? `${daysUntilDeadline} days`
//                       : "Expired"}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Content Section */}
//             <div className="p-8">
//               {/* Status and Apply Section */}
//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8 p-6 bg-gray-50 rounded-2xl">
//                 <div className="flex items-center gap-4">
//                   <div
//                     className={`px-4 py-2 rounded-xl border font-medium ${getStatusColor(
//                       job.status
//                     )}`}
//                   >
//                     {job.status}
//                   </div>
//                   {isJobExpired && (
//                     <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-xl border border-red-200">
//                       <AlertCircle className="w-4 h-4" />
//                       <span className="font-medium">
//                         Application Deadline Passed
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex gap-3">
//                   {hasApplied ? (
//                     <div className="flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-xl font-medium border border-green-200">
//                       <CheckCircle2 className="w-5 h-5" />
//                       Application Submitted
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => applyToJob(job._id)}
//                       disabled={
//                         isApplying ||
//                         isJobExpired ||
//                         job.status?.toLowerCase() === "closed"
//                       }
//                       className={`flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all duration-200 transform ${
//                         isApplying ||
//                         isJobExpired ||
//                         job.status?.toLowerCase() === "closed"
//                           ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                           : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105"
//                       }`}
//                     >
//                       <Send className="w-5 h-5" />
//                       {isApplying ? "Applying..." : "Apply Now"}
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Skills Section */}
//               <div className="mb-8">
//                 <div className="flex items-center gap-2 mb-4">
//                   <Award className="w-6 h-6 text-blue-600" />
//                   <h2 className="text-xl font-bold text-gray-800">
//                     Required Skills
//                   </h2>
//                 </div>
//                 <div className="flex flex-wrap gap-3">
//                   {job.skillsRequired.map((skill, idx) => (
//                     <span
//                       key={idx}
//                       className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl font-medium border border-blue-100 hover:bg-blue-100 transition-colors duration-200"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Description Section */}
//               <div className="mb-8">
//                 <div className="flex items-center gap-2 mb-4">
//                   <Eye className="w-6 h-6 text-green-600" />
//                   <h2 className="text-xl font-bold text-gray-800">
//                     Job Description
//                   </h2>
//                 </div>
//                 <div className="bg-gray-50 rounded-2xl p-6">
//                   <p className="text-gray-700 leading-relaxed whitespace-pre-line">
//                     {job.description}
//                   </p>
//                 </div>
//               </div>

//               {/* Two Column Layout for Responsibilities and Qualifications */}
//               <div className="grid lg:grid-cols-2 gap-8 mb-8">
//                 {/* Responsibilities */}
//                 <div>
//                   <div className="flex items-center gap-2 mb-4">
//                     <Target className="w-6 h-6 text-purple-600" />
//                     <h2 className="text-xl font-bold text-gray-800">
//                       Key Responsibilities
//                     </h2>
//                   </div>
//                   <div className="bg-purple-50 rounded-2xl p-6">
//                     <ul className="space-y-3">
//                       {job.responsibilities.map((responsibility, idx) => (
//                         <li
//                           key={idx}
//                           className="flex items-start gap-3 text-gray-700"
//                         >
//                           <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
//                           <span className="leading-relaxed">
//                             {responsibility}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>

//                 {/* Qualifications */}
//                 <div>
//                   <div className="flex items-center gap-2 mb-4">
//                     <GraduationCap className="w-6 h-6 text-orange-600" />
//                     <h2 className="text-xl font-bold text-gray-800">
//                       Qualifications
//                     </h2>
//                   </div>
//                   <div className="bg-orange-50 rounded-2xl p-6">
//                     <ul className="space-y-3">
//                       {job.qualifications.map((qualification, idx) => (
//                         <li
//                           key={idx}
//                           className="flex items-start gap-3 text-gray-700"
//                         >
//                           <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
//                           <span className="leading-relaxed">
//                             {qualification}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>

//               {/* Deadline Warning */}
//               {!isJobExpired && daysUntilDeadline <= 7 && (
//                 <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8">
//                   <div className="flex items-center gap-3">
//                     <AlertCircle className="w-6 h-6 text-yellow-600" />
//                     <div>
//                       <h3 className="font-semibold text-yellow-800">
//                         Application Deadline Approaching
//                       </h3>
//                       <p className="text-yellow-700 mt-1">
//                         Only {daysUntilDeadline} day
//                         {daysUntilDeadline !== 1 ? "s" : ""} left to apply.
//                         Deadline:{" "}
//                         <strong>
//                           {new Date(job.deadline).toLocaleDateString("en-US", {
//                             weekday: "long",
//                             year: "numeric",
//                             month: "long",
//                             day: "numeric",
//                           })}
//                         </strong>
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Bottom Action Section */}
//               <div className="border-t border-gray-200 pt-8">
//                 <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//                   <div className="flex items-center gap-4 text-sm text-gray-600">
//                     <div className="flex items-center gap-1">
//                       <Calendar className="w-4 h-4" />
//                       <span>
//                         Posted:{" "}
//                         {new Date(
//                           job.createdAt || Date.now()
//                         ).toLocaleDateString()}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Users className="w-4 h-4" />
//                       <span>Job ID: {job._id}</span>
//                     </div>
//                   </div>

//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => navigate("/applicant/jobs")}
//                       className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200"
//                     >
//                       Browse More Jobs
//                     </button>

//                     {!hasApplied &&
//                       !isJobExpired &&
//                       job.status?.toLowerCase() !== "closed" && (
//                         <button
//                           onClick={() => applyToJob(job._id)}
//                           disabled={isApplying}
//                           className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
//                         >
//                           <Send className="w-5 h-5" />
//                           {isApplying ? "Applying..." : "Apply Now"}
//                         </button>
//                       )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Job;


import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Applicant from "@/Sidebar/Applicant";
import {
  MapPin,
  Clock,
  DollarSign,
  Building2,
  Calendar,
  Users,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  ArrowLeft,
  Send,
  Bookmark,
  Share2,
  AlertCircle,
  Target,
  Award,
  TrendingUp,
  Eye,
  ArrowRight,
} from "lucide-react";

const Job = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  useEffect(() => {
    const fetchJob = async () => {
      if (!token) {
        toast.error("Please log in to view job details.");
        navigate("/login");
        return;
      }
      setLoading(true);
      try {
        const res = await axios.get(`${SERVER_URL}/job/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (res.data.success) {
          setJob(res.data.job);
          // Check if already applied (assumes job.appliedJobIds contains job IDs)
          setHasApplied(res.data.job.appliedJobIds?.includes(jobId) || false);
          // Check if bookmarked (assumes job.bookmarked contains job IDs)
          setIsBookmarked(res.data.job.bookmarked?.includes(jobId) || false);
        } else {
          toast.error(res.data.message || "Failed to load job details");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        toast.error(error.response?.data?.message || "Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId, token, navigate]);

  const applyToJob = async (jobId) => {
    try {
      setIsApplying(true);
      const res = await axios.post(
        `${SERVER_URL}/job/apply/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Application submitted successfully!");
        setHasApplied(true);
        setJob((prev) => ({
          ...prev,
          appliedJobIds: [...(prev.appliedJobIds || []), jobId],
        }));
      } else {
        toast.error(res.data.message || "Failed to apply to job");
      }
    } catch (error) {
      console.error("Apply error:", error);
      toast.error(error.response?.data?.message || "Failed to apply to job");
    } finally {
      setIsApplying(false);
    }
  };

  const handleBookmark = async () => {
    try {
      const res = await axios.post(
        `${JOB_API_URL}/bookmark/${jobId}`,
        { bookmarked: !isBookmarked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setIsBookmarked(!isBookmarked);
        toast.success(
          isBookmarked ? "Removed from bookmarks" : "Added to bookmarks"
        );
      } else {
        toast.error(res.data.message || "Failed to update bookmark");
      }
    } catch (error) {
      console.error("Bookmark error:", error);
      toast.error(error.response?.data?.message || "Failed to update bookmark");
    }
  };

  const handleShare = () => {
    const shareData = {
      title: job?.title || "Job Opportunity",
      text: `Check out this job: ${job?.title} at ${job?.company}`,
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => {
        navigator.clipboard.writeText(shareData.url);
        toast.success("Job link copied to clipboard!");
      });
    } else {
      navigator.clipboard.writeText(shareData.url);
      toast.success("Job link copied to clipboard!");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "bg-green-100 text-green-700 border-green-200";
      case "closed":
        return "bg-red-100 text-red-700 border-red-200";
      case "paused":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const isJobExpired = job && new Date(job.deadline) < new Date();
  const daysUntilDeadline = job
    ? Math.ceil((new Date(job.deadline) - new Date()) / (1000 * 60 * 60 * 24))
    : 0;

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Applicant />
        <div className="flex-1 p-6 pt-16 md:pt-20 lg:ml-72">
          <div className="max-w-5xl mx-auto animate-pulse">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
              <div className="h-8 bg-gray-200 rounded-xl w-1/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Applicant />
        <div className="flex-1 p-6 pt-16 md:pt-20 lg:ml-72">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-12 text-center">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Job Not Found
              </h2>
              <p className="text-gray-600 mb-6">
                The job you're looking for might have been removed or doesn't exist.
              </p>
              <button
                onClick={() => navigate("/applicant/recommended-jobs")}
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Browse Recommended Jobs
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Applicant />
      <div className="flex-1 p-6 pt-16 md:pt-20 lg:ml-72">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold text-sm">Back to Jobs</span>
          </button>

          {/* Main Job Card */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white relative">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold mb-2">{job.title || "Untitled Job"}</h1>
                      <p className="text-lg text-blue-100 font-medium">{job.company || "N/A"}</p>
                      <p className="flex items-center gap-2 text-blue-100 mt-1 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location || "N/A"}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleBookmark}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                      isBookmarked
                        ? "bg-yellow-500 text-white hover:bg-yellow-600"
                        : "bg-white bg-opacity-20 text-white hover:bg-opacity-30"
                    }`}
                    title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-md"
                    title="Share Job"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Job Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white border-opacity-20">
                <div className="text-center">
                  <Briefcase className="w-6 h-6 mx-auto mb-2 text-blue-200" />
                  <p className="text-sm text-blue-200">Type</p>
                  <p className="font-semibold">{job.employmentType || "N/A"}</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-6 h-6 mx-auto mb-2 text-blue-200" />
                  <p className="text-sm text-blue-200">Experience</p>
                  <p className="font-semibold">{job.experienceLevel || "N/A"}</p>
                </div>
                <div className="text-center">
                  <DollarSign className="w-6 h-6 mx-auto mb-2 text-blue-200" />
                  <p className="text-sm text-blue-200">Salary</p>
                  <p className="font-semibold">{job.salaryRange || "N/A"}</p>
                </div>
                <div className="text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-blue-200" />
                  <p className="text-sm text-blue-200">Deadline</p>
                  <p className="font-semibold">
                    {daysUntilDeadline > 0 ? `${daysUntilDeadline} days` : "Expired"}
                  </p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              {/* Status and Apply Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-4 flex-wrap">
                  <div
                    className={`px-4 py-2 rounded-full font-semibold text-sm border ${getStatusColor(
                      job.status
                    )}`}
                  >
                    {job.status || "N/A"}
                  </div>
                  {isJobExpired && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-full text-sm font-semibold border border-red-200">
                      <AlertCircle className="w-4 h-4" />
                      <span>Application Deadline Passed</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  {hasApplied ? (
                    <div className="flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-full font-semibold text-sm border border-green-200">
                      <CheckCircle2 className="w-5 h-5" />
                      Application Submitted
                    </div>
                  ) : (
                    <button
                      onClick={() => applyToJob(job._id)}
                      disabled={
                        isApplying ||
                        isJobExpired ||
                        job.status?.toLowerCase() === "closed"
                      }
                      className={`group inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
                        isApplying ||
                        isJobExpired ||
                        job.status?.toLowerCase() === "closed"
                          ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      }`}
                    >
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      {isApplying ? "Applying..." : "Apply Now"}
                    </button>
                  )}
                </div>
              </div>

              {/* Skills Section */}
              {job.skillsRequired?.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Required Skills
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {job.skillsRequired.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold border border-blue-100 hover:bg-blue-100 transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description Section */}
              {job.description && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Eye className="w-6 h-6 text-green-600" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Job Description
                    </h2>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {job.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Two Column Layout for Responsibilities and Qualifications */}
              {(job.responsibilities?.length > 0 || job.qualifications?.length > 0) && (
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Responsibilities */}
                  {job.responsibilities?.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Target className="w-6 h-6 text-purple-600" />
                        <h2 className="text-xl font-semibold text-gray-900">
                          Key Responsibilities
                        </h2>
                      </div>
                      <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                        <ul className="space-y-3">
                          {job.responsibilities.map((responsibility, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-gray-700"
                            >
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="leading-relaxed">
                                {responsibility}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Qualifications */}
                  {job.qualifications?.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <GraduationCap className="w-6 h-6 text-orange-600" />
                        <h2 className="text-xl font-semibold text-gray-900">
                          Qualifications
                        </h2>
                      </div>
                      <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                        <ul className="space-y-3">
                          {job.qualifications.map((qualification, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-gray-700"
                            >
                              <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span className="leading-relaxed">
                                {qualification}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Deadline Warning */}
              {!isJobExpired && daysUntilDeadline <= 7 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                    <div>
                      <h3 className="font-semibold text-yellow-800">
                        Application Deadline Approaching
                      </h3>
                      <p className="text-yellow-700 mt-1">
                        Only {daysUntilDeadline} day
                        {daysUntilDeadline !== 1 ? "s" : ""} left to apply. Deadline:{" "}
                        <strong>
                          {new Date(job.deadline).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Action Section */}
              <div className="border-t border-gray-200 pt-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Posted: {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>Job ID: {job._id}</span>
                    </div>
                    {job.matchPercent && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>Match Score: {job.matchPercent}%</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate("/applicant/recommended-jobs")}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold text-sm hover:bg-gray-200 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      Browse More Jobs
                    </button>
                    {!hasApplied &&
                      !isJobExpired &&
                      job.status?.toLowerCase() !== "closed" && (
                        <button
                          onClick={() => applyToJob(job._id)}
                          disabled={isApplying}
                          className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          {isApplying ? "Applying..." : "Apply Now"}
                        </button>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;