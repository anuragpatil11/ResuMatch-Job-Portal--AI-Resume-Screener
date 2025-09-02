// import App from "@/App";
// import Applicant from "@/Sidebar/Applicant";
// import { JOB_API_URL } from "@/utils/constant";
// import axios from "axios";
// import React, { useEffect, useState, useContext } from "react";
// import AuthContext from "@/context/AuthContext";
// import { Upload } from "lucide-react";
// import UploadResume from "./UploadResume";
// const Jobs = () => {
//   const { token } = useContext(AuthContext);
//   const [allJobs, setAllJobs] = useState([]);
//   useEffect(() => {
//     // Fetch jobs from API or perform any side effects
//     const fetchAllJobs = async () => {
//       try {
//         // console.log(token);

//         const res = await axios.get(`${JOB_API_URL}/allJob`, {
//           headers: {
//             Authorization: `Bearer ${token}`,

//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         });

//         if (res.data.success) {
//           setAllJobs(res.data.jobs);
//         }
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//       }
//     };
//     fetchAllJobs();
//   }, []);

//   return (
//     <div className="flex">
//       <Applicant />
//       <div className="p-6 w-full">
//         <div>
//           {/* <h1>Job Recommendation Based on Resume</h1> */}
//           <UploadResume />
//         </div>

//         <h1 className="text-2xl font-bold mb-4">Available Jobs</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {allJobs.map((job) => (
//             <div
//               key={job.id}
//               className="border rounded-xl shadow p-5 hover:shadow-lg transition"
//             >
//               <h2 className="text-xl font-semibold">{job.title}</h2>
//               <p className="text-gray-700">
//                 {job.company} - {job.location}
//               </p>
//               <p className="text-sm text-gray-500">
//                 {job.employmentType} • {job.salaryRange} • {job.experienceLevel}
//               </p>
//               <p className="mt-2 text-gray-600">{job.description}</p>
//               {/* <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//               Apply Now
//             </button> */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Jobs;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "@/context/AuthContext";
import Applicant from "@/Sidebar/Applicant";
import UploadResume from "./UploadResume";
import { Briefcase, MapPin, DollarSign, Clock, Tag, ArrowRight ,Upload} from "lucide-react";
import { useNavigate } from "react-router-dom";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const Jobs = () => {
  const { token } = useContext(AuthContext);
  const [allJobs, setAllJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/job/allJob`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (res.data.success) {
          setAllJobs(res.data.jobs || []);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    if (token) {
      fetchAllJobs();
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Available <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Jobs</span>
              </h1>
              <p className="text-gray-600 text-lg">Explore opportunities tailored to your skills</p>
            </div>
          </div>

          {/* Upload Resume Section */}
          <div className="mb-12 bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Upload Your Resume</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Upload your resume to get personalized job recommendations based on your skills and experience.
            </p>
            <UploadResume />
          </div>

          {/* Jobs List */}
          {allJobs.length === 0 ? (
            <div className="text-center bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <p className="text-gray-600 text-lg">
                No jobs available at the moment. Check back later!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allJobs.map((job) => (
                <div
                  key={job._id}
                  className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 transform hover:-translate-y-2"
                >
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                    {job.title || "Untitled Job"}
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Briefcase className="w-5 h-5 text-gray-400" />
                      <span>
                        <strong>Company:</strong> {job.company || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span>
                        <strong>Location:</strong> {job.location || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="w-5 h-5 text-gray-400" />
                      <span>
                        <strong>Salary:</strong> {job.salaryRange || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span>
                        <strong>Experience:</strong> {job.experienceLevel || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Tag className="w-5 h-5 text-gray-400" />
                      <span>
                        <strong>Type:</strong> {job.employmentType || "N/A"}
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-600 line-clamp-3">{job.description || "No description available."}</p>

                  {/* Skills */}
                  {job.skillsRequired?.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Tag className="w-5 h-5 text-gray-400" />
                        <strong>Skills:</strong>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {job.skillsRequired.map((skill, idx) => (
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

                  {/* Apply Now Button */}
                  <button
                    className="mt-4 w-full group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    onClick={() => navigate(`/applicant/view-details/${job._id}`)}
                  >
                    Apply Now
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

export default Jobs;