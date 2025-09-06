import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import JobPage from "./pages/JobPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostJob from "./components/Recruiter/PostJob";
import PostedJobs from "./components/Recruiter/PostedJobs";
import RecruiterProfile from "./components/Recruiter/RecruiterProfile";
import RankedApplicants from "./components/Recruiter/RankedApplicants";
import ApplicantProfile from "./components/Applicant/ApplicantProfile";
import Jobs from "./components/Applicant/Jobs";
import AppliedJobs from "./components/Applicant/AppliedJobs";
import RecommendedJob from "./components/Applicant/RecommendedJob";
import Job from "./components/Applicant/Job";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const location = useLocation();

  const hideNavbarPaths = ["/login", "/register"];

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/job" element={<JobPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Applicant Protected Routes */}
        <Route
          path="/applicant/profile"
          element={
            <ProtectedRoute allowedRoles={["applicant"]}>
              <ApplicantProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applicant/jobs"
          element={
            <ProtectedRoute allowedRoles={["applicant"]}>
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applicant/applied-jobs"
          element={
            <ProtectedRoute allowedRoles={["applicant"]}>
              <AppliedJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applicant/recommended-jobs"
          element={
            <ProtectedRoute allowedRoles={["applicant"]}>
              <RecommendedJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applicant/view-details/:jobId"
          element={
            <ProtectedRoute allowedRoles={["applicant"]}>
              <Job />
            </ProtectedRoute>
          }
        />

        {/* Recruiter Protected Routes */}
        <Route
          path="/recruiter/profile"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <RecruiterProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/post-job"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <PostJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/posted-jobs"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <PostedJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/ranked-applicants/:jobId"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <RankedApplicants />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default App;
