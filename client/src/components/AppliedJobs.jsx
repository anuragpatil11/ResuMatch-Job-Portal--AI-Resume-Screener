// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Applicant from "../Sidebar/Applicant"; // your sidebar or profile component
// import { APPLICATION_API_URL } from "../utils/constant";
// import AuthContext from "@/context/AuthContext";
// import { useNavigate } from "react-router-dom";
// const AppliedJobs = () => {
//   const { token } = useContext(AuthContext);
//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAppliedJobs = async () => {
//       try {
//         const res = await axios.get(
//           `${APPLICATION_API_URL}/myApplications`, // 🔹 updated route
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//             withCredentials: true,
//           }
//         );

//         if (res.data.success) {
//           setAppliedJobs(res.data.applications || []);
//         } else {
//           toast.error(res.data.message || "Failed to fetch applied jobs");
//         }
//       } catch (error) {
//         console.error("Error fetching applied jobs:", error);
//         toast.error(
//           error.response?.data?.message || "Error fetching applied jobs"
//         );
//       }
//     };

//     fetchAppliedJobs();
//   }, [token]); // 🔹 added token as dependency

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <Applicant />

//       {/* Main content */}
//       <div className="flex-1 p-6">
//         <h2 className="text-2xl font-bold mb-6">My Applied Jobs</h2>

//         {appliedJobs.length === 0 ? (
//           <p className="text-gray-600">You haven’t applied to any jobs yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {appliedJobs.map((app) => (
//               <div
//                 key={app._id}
//                 className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition"
//               >
//                 <h3 className="text-xl font-semibold text-gray-800">
//                   {app.job?.title || "Untitled Job"}
//                 </h3>
//                 <p className="text-gray-600">
//                   <strong>Company:</strong> {app.job?.company || "N/A"}
//                 </p>
//                 <p className="text-gray-600">
//                   <strong>Location:</strong> {app.job?.location || "N/A"}
//                 </p>
//                 <p className="text-gray-600">
//                   <strong>Type:</strong> {app.job?.employmentType || "N/A"}
//                 </p>
//                 <p className="text-gray-600">
//                   <strong>Status:</strong>{" "}
//                   <span
//                     className={`px-2 py-1 rounded text-sm ${
//                       app.status === "Hired"
//                         ? "bg-green-100 text-green-600"
//                         : app.status === "Rejected"
//                         ? "bg-red-100 text-red-600"
//                         : app.status === "Shortlisted"
//                         ? "bg-blue-100 text-blue-600"
//                         : "bg-gray-100 text-gray-600"
//                     }`}
//                   >
//                     {app.status}
//                   </span>
//                 </p>
//                 <p className="text-gray-600">
//                   <strong>Applied At:</strong>{" "}
//                   {app.appliedAt
//                     ? new Date(app.appliedAt).toLocaleDateString()
//                     : "N/A"}
//                 </p>

//                 {/* Skills */}
//                 {app.job?.skillsRequired?.length > 0 && (
//                   <div className="mt-3">
//                     <strong className="text-gray-700">Skills:</strong>
//                     <div className="flex flex-wrap gap-2 mt-1">
//                       {app.job.skillsRequired.map((skill, idx) => (
//                         <span
//                           key={idx}
//                           className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-sm"
//                         >
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* View Details */}
//                 <button
//                   className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
//                   onClick={() =>
//                     navigate(`/applicant/view-details/${app.job._id}`)
//                   }
//                 >
//                   View Details
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AppliedJobs;

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Applicant from "@/Sidebar/Applicant";
import AuthContext from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Briefcase, MapPin, Calendar, Tag, ArrowRight } from "lucide-react";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const AppliedJobs = () => {
  const { token } = useContext(AuthContext);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/application/myApplications`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (res.data.success) {
          setAppliedJobs(res.data.applications || []);
        } else {
          toast.error(res.data.message || "Failed to fetch applied jobs");
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
        toast.error(
          error.response?.data?.message || "Error fetching applied jobs"
        );
      }
    };

    if (token) {
      fetchAppliedJobs();
    }
  }, [token]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Applicant />
      <div className="flex-1 p-6 pt-16 md:pt-20 lg:ml-72">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                My Applied <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Jobs</span>
              </h2>
              <p className="text-gray-600 text-lg">Track your job applications</p>
            </div>
          </div>

          {appliedJobs.length === 0 ? (
            <div className="text-center bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <p className="text-gray-600 text-lg">
                You haven’t applied to any jobs yet.{' '}
                <a
                  href="/applicant/jobs"
                  className="text-blue-600 hover:text-blue-700 font-medium underline"
                >
                  Browse jobs now
                </a>
                !
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appliedJobs.map((app) => (
                <div
                  key={app._id}
                  className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 transform hover:-translate-y-2"
                >
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                    {app.job?.title || "Untitled Job"}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Briefcase className="w-5 h-5 text-gray-400" />
                      <span>
                        <strong>Company:</strong> {app.job?.company || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span>
                        <strong>Location:</strong> {app.job?.location || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Tag className="w-5 h-5 text-gray-400" />
                      <span>
                        <strong>Type:</strong> {app.job?.employmentType || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span>
                        <strong>Applied At:</strong>{" "}
                        {app.appliedAt
                          ? new Date(app.appliedAt).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 font-semibold">Status:</span>
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                          app.status === "Hired"
                            ? "bg-green-100 text-green-600"
                            : app.status === "Rejected"
                            ? "bg-red-100 text-red-600"
                            : app.status === "Shortlisted"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>
                  </div>

                  {/* Skills */}
                  {app.job?.skillsRequired?.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Tag className="w-5 h-5 text-gray-400" />
                        <strong>Skills:</strong>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {app.job.skillsRequired.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* View Details Button */}
                  <button
                    className="mt-4 w-full group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    onClick={() =>
                      navigate(`/applicant/view-details/${app.job._id}`)
                    }
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;