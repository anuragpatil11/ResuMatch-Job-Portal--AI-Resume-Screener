import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";
import Applicant from "@/Sidebar/Applicant";
import { useNavigate } from "react-router-dom";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Star, 
  Eye, 
  Send,
  Target,
  TrendingUp,
  Award,
  Briefcase,
  Building2,
  CheckCircle,
  Sparkles,
  Filter,
  Search,
  ArrowRight
} from "lucide-react";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const RecommendedJob = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByMatch, setFilterByMatch] = useState("all");

  useEffect(() => {
    const fetchJobs = async () => {
      if (!token) {
        toast.error("Please log in to view recommended jobs.");
        navigate("/login");
        return;
      }
      setLoading(true);
      try {
        const res = await axios.get(`${SERVER_URL}/job/recommendation`, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          withCredentials: true,
        });

        if (res.data.success) {
          setRecommendedJobs(res.data.jobs || []);
        } else {
          toast.error(res.data.message || "Failed to fetch recommended jobs");
        }
      } catch (err) {
        console.error("Error fetching recommended jobs:", err);
        toast.error(err.response?.data?.message || "Failed to fetch recommended jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [token, navigate]);

  const applyToJob = async (jobId) => {
    try {
      setLoading(true);
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
        setRecommendedJobs((prev) =>
          prev.map((job) =>
            job._id === jobId
              ? { ...job, appliedJobIds: [...(job.appliedJobIds || []), jobId] }
              : job
          )
        );
      }
    } catch (error) {
      console.error("Error applying to job:", error);
      toast.error(error.response?.data?.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return "from-emerald-500 to-green-500";
    if (percentage >= 60) return "from-blue-500 to-indigo-500";
    if (percentage >= 40) return "from-yellow-500 to-orange-500";
    return "from-gray-400 to-gray-500";
  };

  const getMatchBadgeColor = (percentage) => {
    if (percentage >= 80) return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (percentage >= 60) return "bg-blue-100 text-blue-700 border-blue-200";
    if (percentage >= 40) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  const filteredJobs = recommendedJobs.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter =
      filterByMatch === "all" ||
      (filterByMatch === "high" && job.matchPercent >= 70) ||
      (filterByMatch === "medium" && job.matchPercent >= 40 && job.matchPercent < 70) ||
      (filterByMatch === "low" && job.matchPercent < 40);
    
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Applicant />
        <div className="flex-1 p-6 pt-16 md:pt-20 lg:ml-72">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded-xl w-1/3 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
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

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Applicant />
      <div className="flex-1 p-6 pt-16 md:pt-20 lg:ml-72">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                AI Job <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Recommendations</span>
                <Sparkles className="inline-block w-6 h-6 text-yellow-500 ml-2" />
              </h1>
              <p className="text-gray-600 text-lg mt-1">
                Personalized matches based on your resume analysis
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 rounded-2xl p-4 text-center shadow-md border border-blue-100">
              <div className="text-2xl font-bold text-blue-600">{recommendedJobs.length}</div>
              <div className="text-sm text-blue-700 flex items-center justify-center gap-1">
                <Briefcase className="w-4 h-4" />
                Jobs Found
              </div>
            </div>
            <div className="bg-green-50 rounded-2xl p-4 text-center shadow-md border border-green-100">
              <div className="text-2xl font-bold text-green-600">
                {recommendedJobs.filter((job) => job.matchPercent >= 70).length}
              </div>
              <div className="text-sm text-green-700 flex items-center justify-center gap-1">
                <Star className="w-4 h-4" />
                High Matches
              </div>
            </div>
            <div className="bg-purple-50 rounded-2xl p-4 text-center shadow-md border border-purple-100 sm:col-span-2 sm:col-start-2 lg:col-span-1 lg:col-start-auto">
              <div className="text-2xl font-bold text-purple-600">
                {recommendedJobs.filter((job) => job.matchPercent >= 40 && job.matchPercent < 70).length}
              </div>
              <div className="text-sm text-purple-700 flex items-center justify-center gap-1">
                <TrendingUp className="w-4 h-4" />
                Medium Matches
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title, company, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-600 transition-all duration-300 text-sm"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterByMatch}
                  onChange={(e) => setFilterByMatch(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-600 transition-all duration-300 bg-white text-sm"
                >
                  <option value="all">All Matches</option>
                  <option value="high">High Match (70%+)</option>
                  <option value="medium">Medium Match (40-69%)</option>
                  <option value="low">Low Match (&lt;40%)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Jobs Grid */}
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Job Recommendations Found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria, or upload your resume to get better matches.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate("/applicant/upload-resume")}
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Upload Resume
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterByMatch("all");
                    window.location.reload();
                  }}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-200 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Reset & Refresh
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="group bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
                >
                  {/* Match Percentage Banner */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div
                      className={`absolute top-2 right-2 w-12 h-12 bg-gradient-to-br ${getMatchColor(
                        job.matchPercent
                      )} rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md`}
                    >
                      {job.matchPercent || 0}%
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Job Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                          {job.title || "Untitled Job"}
                        </h3>
                        <p className="text-gray-600 font-medium">{job.company || "N/A"}</p>
                      </div>
                    </div>

                    {/* Job Details */}
                    <div className="space-y-3 mb-4">
                      <p className="flex items-center gap-2 text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{job.location || "N/A"}</span>
                      </p>
                      <p className="flex items-center gap-2 text-gray-600 text-sm">
                        <Briefcase className="w-4 h-4 text-blue-500" />
                        <span>{job.employmentType || "N/A"}</span>
                      </p>
                      <p className="flex items-center gap-2 text-gray-600 text-sm">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span>{job.experienceLevel || "N/A"}</span>
                      </p>
                      <p className="flex items-center gap-2 text-gray-600 text-sm">
                        <DollarSign className="w-4 h-4 text-yellow-500" />
                        <span>{job.salaryRange || "N/A"}</span>
                      </p>
                    </div>

                    {/* Skills */}
                    {job.skillsRequired?.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                          <Award className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold">Required Skills</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {job.skillsRequired.slice(0, 4).map((skill, idx) => (
                            <span
                              key={idx}
                              className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium border border-blue-100 hover:bg-blue-100 transition-colors duration-300"
                            >
                              {skill}
                            </span>
                          ))}
                          {job.skillsRequired.length > 4 && (
                            <span className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-xs font-medium border border-gray-100">
                              +{job.skillsRequired.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Match Badge */}
                    <div className="mb-6">
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${getMatchBadgeColor(
                          job.matchPercent
                        )} font-medium text-sm`}
                      >
                        <Star className="w-4 h-4" />
                        Match Score: {job.matchPercent || 0}%
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate(`/applicant/view-details/${job._id}`)}
                        className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-full font-semibold text-sm hover:bg-gray-200 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2 group"
                      >
                        <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        View Details
                      </button>
                      {job.appliedJobIds?.includes(job._id) ? (
                        <button
                          disabled
                          className="flex-1 bg-green-100 text-green-700 px-4 py-3 rounded-full font-semibold text-sm cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Applied
                        </button>
                      ) : (
                        <button
                          onClick={() => applyToJob(job._id)}
                          className="flex-1 group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                          disabled={loading}
                        >
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          Apply Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {filteredJobs.length > 9 && (
            <div className="text-center mt-12">
              <button
                className="bg-white text-gray-700 border border-gray-300 px-8 py-3 rounded-full font-semibold text-sm hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                onClick={() => {
                  // Implement pagination or load more logic here
                  toast.info("Load more functionality to be implemented");
                }}
              >
                Load More Jobs
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendedJob;