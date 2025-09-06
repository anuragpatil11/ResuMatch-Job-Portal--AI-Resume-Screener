import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { useParams, useNavigate } from "react-router-dom";
import Recruiter from "@/Sidebar/Recruiter";
import { User,Users, Mail, FileText, Calendar, Percent, Tag, ArrowRight, Briefcase } from "lucide-react";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const RankedApplicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const openModal = (app) => {
    setSelectedApp(app);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedApp(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please log in to view applicants.");
          navigate("/login");
          return;
        }
        const res = await axios.get(
          `${SERVER_URL}/application/rankedApplicants/${jobId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        if (!res.data.success) {
          toast.error(res.data.message || "Could not fetch applicants");
          return;
        }
        setJobData(res.data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
        toast.error(error.response?.data?.message || "Failed to fetch applicants.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jobId, navigate]);

  const handleUpdateStatus = async (applicationId, newStatus) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${SERVER_URL}/application/updateStatus/${applicationId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Status updated successfully");
        setJobData((prev) => ({
          ...prev,
          applications: prev.applications.map((app) =>
            app._id === applicationId ? { ...app, status: newStatus } : app
          ),
        }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 items-center justify-center pt-16 md:pt-20 lg:ml-72">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
          <span>Loading applicants...</span>
        </div>
      </div>
    );
  }

  if (!jobData || !jobData.jobId) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 items-center justify-center pt-16 md:pt-20 lg:ml-72">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 text-center">
          <p className="text-gray-600 text-lg">No job data found</p>
          <a
            href="/recruiter/posted-jobs"
            className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Back to Posted Jobs
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
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
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Ranked <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Applicants</span>
              </h1>
              <p className="text-gray-600 text-lg">Review applicants for {jobData.jobTitle}</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5 text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-900">{jobData.jobTitle}</h2>
            </div>
            <p className="text-gray-600">
              <span className="font-semibold">Job ID:</span> {jobData.jobId}
            </p>
            {jobData.requiredSkills?.length > 0 && (
              <div className="mt-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Tag className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold">Required Skills:</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {jobData.requiredSkills.map((skill, idx) => (
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
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">Applicants</h3>
          {jobData.applications.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 text-center">
              <p className="text-gray-600 text-lg">No applicants have applied yet.</p>
              <a
                href="/recruiter/posted-jobs"
                className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Back to Posted Jobs
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobData.applications.map((app) => (
                <div
                  key={app._id}
                  className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 transform hover:-translate-y-2"
                >
                  <h4 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {app.applicant?.name || "Unknown Applicant"}
                  </h4>
                  <div className="space-y-3">
                    <p className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span>{app.applicant?.email || "N/A"}</span>
                    </p>
                    <p className="flex items-center gap-2 text-gray-600">
                      <Percent className="w-5 h-5 text-gray-400" />
                      <span>Match Score: {app.matchPercent ? `${app.matchPercent}%` : "N/A"}</span>
                    </p>
                    <p className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span>Applied: {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "N/A"}</span>
                    </p>
                    {app.applicant?.extractedSkills?.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Tag className="w-5 h-5 text-gray-400" />
                          <span className="font-semibold">Skills:</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {app.applicant.extractedSkills.map((skill, idx) => (
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
                    <p className="flex items-center gap-2 text-gray-600">
                      <Tag className="w-5 h-5 text-gray-400" />
                      <span>
                        Status: <span className="px-2 py-1 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium">{app.status || "N/A"}</span>
                      </span>
                    </p>
                  </div>
                  {app.applicant?.resumeUrl && (
                    <a
                      href={app.applicant.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline transition-all duration-300"
                    >
                      <FileText className="w-5 h-5" />
                      View Resume
                    </a>
                  )}
                  <div className="mt-4">
                    <button
                      onClick={() => openModal(app)}
                      className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                      disabled={loading}
                    >
                      Update Status
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Dialog
            open={isOpen}
            onClose={closeModal}
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 max-w-md w-full">
                <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4">
                  Update Applicant Status
                </Dialog.Title>
                {selectedApp && (
                  <>
                    <div className="space-y-2 mb-4">
                      <p className="flex items-center gap-2 text-gray-600">
                        <User className="w-5 h-5 text-gray-400" />
                        <span>{selectedApp.applicant?.name || "Unknown Applicant"}</span>
                      </p>
                      <p className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span>{selectedApp.applicant?.email || "N/A"}</span>
                      </p>
                    </div>
                    <select
                      className={`block w-full rounded-xl px-4 py-3 text-gray-800 border ${
                        loading ? "border-gray-300 opacity-70" : "border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      } transition-all duration-300 sm:text-sm`}
                      value={selectedApp.status}
                      onChange={(e) =>
                        setSelectedApp({ ...selectedApp, status: e.target.value })
                      }
                      disabled={loading}
                    >
                      <option value="Applied">Applied</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Hired">Hired</option>
                    </select>
                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        onClick={closeModal}
                        className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          handleUpdateStatus(selectedApp._id, selectedApp.status);
                          closeModal();
                        }}
                        className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                        disabled={loading}
                      >
                        Confirm Update
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default RankedApplicants;