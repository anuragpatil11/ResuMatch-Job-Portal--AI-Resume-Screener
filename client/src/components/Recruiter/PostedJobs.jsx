import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Briefcase, MapPin, Calendar, DollarSign, Users, ArrowRight ,Tag} from "lucide-react";
import Recruiter from "@/Sidebar/Recruiter";
import { useNavigate } from "react-router-dom";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please log in to view your posted jobs.");
          navigate("/login");
          return;
        }
        const res = await axios.get(`${SERVER_URL}/job/postedJobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        setJobs(res.data.jobs || []);
      } catch (error) {
        console.error("Error fetching posted jobs:", error);
        toast.error(error.response?.data?.message || "Failed to fetch posted jobs.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 items-center justify-center pt-16 md:pt-20 lg:ml-72">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
          <span>Loading your posted jobs...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Recruiter />
      <div className="flex-1 p-6 pt-16 md:pt-20 lg:ml-72">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Your Posted <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Jobs</span>
              </h1>
              <p className="text-gray-600 text-lg">Manage and review your job listings</p>
            </div>
          </div>

          {jobs.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 text-center">
              <p className="text-gray-600 text-lg">You haven’t posted any jobs yet.</p>
              <a
                href="/recruiter/post-job"
                className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Post a Job
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {job.title || "Untitled Job"}
                    </h2>
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-medium ${
                        job.status === "Open"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {job.status || "Unknown"}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <p className="flex items-center gap-2 text-gray-600">
                      <Briefcase className="w-5 h-5 text-gray-400" />
                      <span>{job.company || "N/A"}</span>
                    </p>
                    <p className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span>{job.location || "N/A"}</span>
                    </p>
                    <p className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="w-5 h-5 text-gray-400" />
                      <span>
                        {job.salaryRange || "N/A"} • {job.employmentType || "N/A"}
                      </span>
                    </p>
                    <p className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span>
                        Deadline: {job.deadline ? new Date(job.deadline).toLocaleDateString() : "N/A"}
                      </span>
                    </p>
                    <p className="flex items-center gap-2 text-gray-600">
                      <Users className="w-5 h-5 text-gray-400" />
                      <span>Applications: {job.applications?.length || 0}</span>
                    </p>
                  </div>

                  {job.skillsRequired?.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Tag className="w-5 h-5 text-gray-400" />
                        <span className="font-semibold">Skills:</span>
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

                  <div className="mt-6 flex gap-3">
                    <button
                      className="group flex-1 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                      onClick={() => navigate(`/recruiter/ranked-applicants/${job._id}`)}
                    >
                      View Applications
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-200 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                      onClick={() => navigate(`/recruiter/edit-job/${job._id}`)}
                    >
                      Edit Job
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostedJobs;