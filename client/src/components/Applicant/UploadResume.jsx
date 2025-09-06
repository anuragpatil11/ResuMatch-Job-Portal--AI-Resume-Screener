import React, { useState } from "react";
import {
  Upload,
  FileText,
  Search,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Briefcase,
  Brain,
  Target
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ScannerUploadModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("");
  const [error, setError] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const navigate = useNavigate();

  // Scanning messages sequence
  const scanningMessages = [
    "Initializing document scanner...",
    "Analyzing resume format...",
    "Extracting personal information...",
    "Scanning work experience...",
    "Identifying technical skills...",
    "Processing education details...",
    "Analyzing project descriptions...",
    "Extracting keywords and competencies...",
    "Matching skills with job database...",
    "Generating personalized recommendations...",
    "Finalizing analysis results...",
    "Complete! Preparing your job matches...",
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (
        selectedFile.type === "application/pdf" &&
        selectedFile.size <= 10 * 1024 * 1024
      ) {
        setFile(selectedFile);
        setError("");
      } else {
        setError(
          selectedFile.type !== "application/pdf"
            ? "Please select a PDF file only"
            : "File size exceeds 10MB limit"
        );
        setFile(null);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (
        droppedFile.type === "application/pdf" &&
        droppedFile.size <= 10 * 1024 * 1024
      ) {
        setFile(droppedFile);
        setError("");
      } else {
        setError(
          droppedFile.type !== "application/pdf"
            ? "Please drop a PDF file only"
            : "File size exceeds 10MB limit"
        );
        setFile(null);
      }
    }
  };

  const startScanning = async () => {
    if (!file) {
      setError("Please select a PDF file first!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to upload your resume.");
      navigate("/login");
      return;
    }

    setIsScanning(true);
    setScanProgress(0);
    setCurrentMessage(scanningMessages[0]);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await axios.post(
        `${SERVER_URL}/job/upload/resume`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // Fake scanning animation
        let progress = 0;
        let messageIndex = 0;

        const scanningInterval = setInterval(() => {
          progress += Math.random() * 10 + 5;
          if (progress >= 100) {
            progress = 100;
            clearInterval(scanningInterval);
            setCurrentMessage("Complete! Preparing your job matches...");
            setTimeout(() => {
              navigate("/applicant/recommended-jobs");
            }, 1500);
          } else {
            const newMessageIndex = Math.floor(
              (progress / 100) * scanningMessages.length
            );
            if (
              newMessageIndex < scanningMessages.length &&
              newMessageIndex !== messageIndex
            ) {
              messageIndex = newMessageIndex;
              setCurrentMessage(scanningMessages[messageIndex]);
            }
          }
          setScanProgress(progress);
        }, 600);
      } else {
        throw new Error(response.data.message || "Failed to upload resume");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setIsScanning(false);
      setError(
        error.response?.data?.message ||
          "Error uploading resume. Please try again."
      );
    }
  };

  const closeModal = () => {
    if (!isScanning) {
      setIsModalOpen(false);
      setFile(null);
      setError("");
      setScanProgress(0);
      setCurrentMessage("");
    }
  };

  // Scanner Lines Component
  const ScannerLines = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="scanner-line scanner-line-1"></div>
        <div className="scanner-line scanner-line-2"></div>
        <div className="scanner-line scanner-line-3"></div>
        <div className="scanner-line scanner-line-4"></div>
        <div className="scanner-line scanner-line-5"></div>
      </div>
    );
  };

  // Scanning Screen Component
  // const ScanningScreen = () => (
  //   <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 z-50 flex flex-col pt-16 md:pt-20">
  //     {/* Document Preview Area */}
  //     <div className="flex-1 relative bg-gray-50 flex items-center justify-center">
  //       <div className="w-80 sm:w-96 h-[450px] sm:h-[500px] bg-white shadow-2xl rounded-lg relative overflow-hidden border-8 border-gray-200">
  //         {/* Document Content Lines (Mock Resume) */}
  //         <div className="p-6 sm:p-8 space-y-4">
  //           <div className="h-4 bg-gray-800 rounded w-3/4"></div>
  //           <div className="h-3 bg-gray-600 rounded w-1/2"></div>
  //           <div className="h-2 bg-gray-400 rounded w-2/3"></div>
  //           <div className="pt-6 space-y-2">
  //             <div className="h-3 bg-blue-600 rounded w-1/3"></div>
  //             <div className="h-2 bg-gray-700 rounded w-full"></div>
  //             <div className="h-2 bg-gray-700 rounded w-5/6"></div>
  //             <div className="h-2 bg-gray-700 rounded w-4/5"></div>
  //           </div>
  //           <div className="pt-4 space-y-2">
  //             <div className="h-3 bg-green-600 rounded w-1/4"></div>
  //             <div className="h-2 bg-gray-600 rounded w-full"></div>
  //             <div className="h-2 bg-gray-600 rounded w-3/4"></div>
  //           </div>
  //           <div className="pt-4 space-y-2">
  //             <div className="h-3 bg-purple-600 rounded w-1/3"></div>
  //             <div className="h-2 bg-gray-600 rounded w-full"></div>
  //             <div className="h-2 bg-gray-600 rounded w-4/5"></div>
  //             <div className="h-2 bg-gray-600 rounded w-2/3"></div>
  //           </div>
  //           <div className="absolute top-32 left-6 sm:left-8 right-6 sm:right-8">
  //             <div className="h-2 bg-yellow-300 rounded animate-pulse opacity-70"></div>
  //           </div>
  //           <div className="absolute top-48 left-6 sm:left-8 right-10 sm:right-16">
  //             <div className="h-2 bg-blue-300 rounded animate-pulse opacity-70 animation-delay-500"></div>
  //           </div>
  //           <div className="absolute top-64 left-6 sm:left-8 right-8 sm:right-12">
  //             <div className="h-2 bg-green-300 rounded animate-pulse opacity-70 animation-delay-1000"></div>
  //           </div>
  //         </div>

  //         {/* Scanner Lines Overlay */}
  //         <ScannerLines />

  //         {/* Scanning Progress Overlay */}
  //         <div
  //           className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-500 to-purple-600 opacity-10 transition-all duration-500"
  //           style={{ height: `${scanProgress}%` }}
  //         ></div>
  //       </div>

  //       {/* Side Scanner Light Effect */}
  //       <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-blue-500 to-transparent opacity-60 animate-pulse"></div>
  //       <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-purple-500 to-transparent opacity-60 animate-pulse"></div>
  //     </div>

  //     {/* Status Area */}
  //     <div className="bg-white border-t-4 border-blue-600 p-6 sm:p-8 shadow-lg">
  //       <div className="max-w-2xl mx-auto">
  //         {/* Progress Bar */}
  //         <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
  //           <div
  //             className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out relative"
  //             style={{ width: `${scanProgress}%` }}
  //           >
  //             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-shimmer"></div>
  //           </div>
  //         </div>

  //         {/* Status Text */}
  //         <div className="text-center">
  //           <div className="flex items-center justify-center gap-3 mb-4">
  //             <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping"></div>
  //             <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping animation-delay-200"></div>
  //             <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping animation-delay-400"></div>
  //           </div>

  //           <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
  //             Analyzing Your Resume
  //           </h2>

  //           <p className="text-base sm:text-lg text-blue-600 font-medium animate-pulse mb-4">
  //             {currentMessage}
  //           </p>

  //           <div className="text-sm text-gray-600 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2">
  //             <span className="font-semibold">
  //               {Math.round(scanProgress)}% Complete
  //             </span>
  //             {file && (
  //               <>
  //                 <span className="hidden sm:inline">•</span>
  //                 <span className="truncate max-w-[200px] sm:max-w-[300px]">
  //                   Processing {file.name}
  //                 </span>
  //               </>
  //             )}
  //           </div>
  //         </div>

  // {/* Scanning Stats */}
  // <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-200">
  //   <div className="text-center">
  //     <div
  //       className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-300 ${
  //         scanProgress >= 20
  //           ? "bg-blue-100 text-blue-600"
  //           : "bg-gray-100 text-gray-400"
  //       }`}
  //     >
  //       <FileText className="w-6 h-6" />
  //     </div>
  //     <p className="text-xs text-gray-600">Document</p>
  //     <p
  //       className={`text-sm font-semibold ${
  //         scanProgress >= 20 ? "text-blue-600" : "text-gray-400"
  //       }`}
  //     >
  //       {scanProgress >= 20 ? "Scanned" : "Pending"}
  //     </p>
  //   </div>
  //   <div className="text-center">
  //     <div
  //       className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-300 ${
  //         scanProgress >= 50
  //           ? "bg-green-100 text-green-600"
  //           : "bg-gray-100 text-gray-400"
  //       }`}
  //     >
  //       <Briefcase className="w-6 h-6" />
  //     </div>
  //     <p className="text-xs text-gray-600">Experience</p>
  //     <p
  //       className={`text-sm font-semibold ${
  //         scanProgress >= 50 ? "text-green-600" : "text-gray-400"
  //       }`}
  //     >
  //       {scanProgress >= 50 ? "Extracted" : "Processing"}
  //     </p>
  //   </div>
  //   <div className="text-center">
  //     <div
  //       className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-300 ${
  //         scanProgress >= 75
  //           ? "bg-purple-100 text-purple-600"
  //           : "bg-gray-100 text-gray-400"
  //       }`}
  //     >
  //       <Brain className="w-6 h-6" />
  //     </div>
  //     <p className="text-xs text-gray-600">Skills</p>
  //     <p
  //       className={`text-sm font-semibold ${
  //         scanProgress >= 75 ? "text-purple-600" : "text-gray-400"
  //       }`}
  //     >
  //       {scanProgress >= 75 ? "Analyzed" : "Scanning"}
  //     </p>
  //   </div>
  //   <div className="text-center">
  //     <div
  //       className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-300 ${
  //         scanProgress >= 95
  //           ? "bg-orange-100 text-orange-600"
  //           : "bg-gray-100 text-gray-400"
  //       }`}
  //     >
  //       <Target className="w-6 h-6" />
  //     </div>
  //     <p className="text-xs text-gray-600">Matching</p>
  //     <p
  //       className={`text-sm font-semibold ${
  //         scanProgress >= 95 ? "text-orange-600" : "text-gray-400"
  //       }`}
  //     >
  //       {scanProgress >= 95 ? "Complete" : "Waiting"}
  //     </p>
  //   </div>
  // </div>
  // </div>
  //     </div>
  //   </div>
  // );
  // Scanning Screen Component
  const ScanningScreen = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">
        {/* Document Preview Area */}
        <div className="relative bg-gray-50 flex items-center justify-center p-6">
          <div className="w-72 sm:w-80 md:w-96 h-95 sm:h-[450px] md:h-[500px] bg-white shadow-xl rounded-lg relative overflow-hidden border-8 border-gray-200">
            {/* Document Content Lines (Mock Resume) */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="h-4 bg-gray-800 rounded w-3/4"></div>
              <div className="h-3 bg-gray-600 rounded w-1/2"></div>
              <div className="h-2 bg-gray-400 rounded w-2/3"></div>
              <div className="pt-6 space-y-2">
                <div className="h-3 bg-blue-600 rounded w-1/3"></div>
                <div className="h-2 bg-gray-700 rounded w-full"></div>
                <div className="h-2 bg-gray-700 rounded w-5/6"></div>
                <div className="h-2 bg-gray-700 rounded w-4/5"></div>
              </div>
              <div className="pt-4 space-y-2">
                <div className="h-3 bg-green-600 rounded w-1/4"></div>
                <div className="h-2 bg-gray-600 rounded w-full"></div>
                <div className="h-2 bg-gray-600 rounded w-3/4"></div>
              </div>
              <div className="pt-4 space-y-2">
                <div className="h-3 bg-purple-600 rounded w-1/3"></div>
                <div className="h-2 bg-gray-600 rounded w-full"></div>
                <div className="h-2 bg-gray-600 rounded w-4/5"></div>
                <div className="h-2 bg-gray-600 rounded w-2/3"></div>
              </div>
              {/* Animated highlight lines */}
              <div className="absolute top-28 left-6 sm:left-8 right-6 sm:right-8">
                <div className="h-2 bg-yellow-300 rounded animate-pulse opacity-70"></div>
              </div>
              <div className="absolute top-44 left-6 sm:left-8 right-10 sm:right-16">
                <div className="h-2 bg-blue-300 rounded animate-pulse opacity-70 animation-delay-500"></div>
              </div>
              <div className="absolute top-60 left-6 sm:left-8 right-8 sm:right-12">
                <div className="h-2 bg-green-300 rounded animate-pulse opacity-70 animation-delay-1000"></div>
              </div>
            </div>

            {/* Scanner Lines Overlay */}
            <ScannerLines />

            {/* Scanning Progress Overlay */}
            <div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-500 to-purple-600 opacity-10 transition-all duration-500"
              style={{ height: `${scanProgress}%` }}
            ></div>
          </div>

          {/* Side Scanner Light Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-blue-500 to-transparent opacity-60 animate-pulse"></div>
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-purple-500 to-transparent opacity-60 animate-pulse"></div>
        </div>

        {/* Status Area */}
        <div className="bg-white border-t-4 border-blue-600 p-6 sm:p-8 shadow-inner">
          <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out relative"
                style={{ width: `${scanProgress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-shimmer"></div>
              </div>
            </div>

            {/* Status Text */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping animation-delay-200"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping animation-delay-400"></div>
              </div>

              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                Analyzing Your Resume
              </h2>

              <p className="text-base sm:text-lg text-blue-600 font-medium animate-pulse mb-4">
                {currentMessage}
              </p>

              <div className="text-sm text-gray-600 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2">
                <span className="font-semibold">
                  {Math.round(scanProgress)}% Complete
                </span>
                {file && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <span className="truncate max-w-[200px] sm:max-w-[300px]">
                      Processing {file.name}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Scanning Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-300 ${
                    scanProgress >= 20
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <FileText className="w-6 h-6" />
                </div>
                <p className="text-xs text-gray-600">Document</p>
                <p
                  className={`text-sm font-semibold ${
                    scanProgress >= 20 ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {scanProgress >= 20 ? "Scanned" : "Pending"}
                </p>
              </div>
              <div className="text-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-300 ${
                    scanProgress >= 50
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Briefcase className="w-6 h-6" />
                </div>
                <p className="text-xs text-gray-600">Experience</p>
                <p
                  className={`text-sm font-semibold ${
                    scanProgress >= 50 ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {scanProgress >= 50 ? "Extracted" : "Processing"}
                </p>
              </div>
              <div className="text-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-300 ${
                    scanProgress >= 75
                      ? "bg-purple-100 text-purple-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Brain className="w-6 h-6" />
                </div>
                <p className="text-xs text-gray-600">Skills</p>
                <p
                  className={`text-sm font-semibold ${
                    scanProgress >= 75 ? "text-purple-600" : "text-gray-400"
                  }`}
                >
                  {scanProgress >= 75 ? "Analyzed" : "Scanning"}
                </p>
              </div>
              <div className="text-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-300 ${
                    scanProgress >= 95
                      ? "bg-orange-100 text-orange-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Target className="w-6 h-6" />
                </div>
                <p className="text-xs text-gray-600">Matching</p>
                <p
                  className={`text-sm font-semibold ${
                    scanProgress >= 95 ? "text-orange-600" : "text-gray-400"
                  }`}
                >
                  {scanProgress >= 95 ? "Complete" : "Waiting"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Trigger Button */}
      <div className="p-6 sm:p-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 mx-auto"
          title="Upload your resume to get job recommendations"
        >
          <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Upload Resume for Job Matches
          <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Upload Modal */}
      {isModalOpen && !isScanning && (
        <div className="fixed inset-0 bg-opacity-60 backdrop-blur-md flex items-center justify-center z-50 p-4 pt-16 md:pt-20">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-gray-100">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Upload Your Resume
                </h2>
                <p className="text-sm text-gray-600">
                  Get personalized job recommendations in seconds
                </p>
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-300"
                title="Close upload modal"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Upload Area */}
            <div className="p-6 sm:p-8">
              <div
                className={`relative border-3 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 ${
                  isDragOver
                    ? "border-blue-500 bg-blue-50"
                    : file
                    ? "border-green-400 bg-green-50"
                    : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="application/pdf"
                  id="resumeInput"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {!file ? (
                  <>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                      Drag & Drop Your Resume
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      or click to browse from your device
                    </p>
                    <button
                      onClick={() =>
                        document.getElementById("resumeInput").click()
                      }
                      className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                      title="Select a resume file"
                    >
                      <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Choose Resume
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2">
                      Resume Uploaded!
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 truncate max-w-[300px]">
                      {file.name}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={() =>
                          document.getElementById("resumeInput").click()
                        }
                        className="group inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-md transform hover:scale-105"
                        title="Select a different resume"
                      >
                        <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Change File
                      </button>
                      <button
                        onClick={startScanning}
                        className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                        title="Start analyzing your resume"
                      >
                        {isScanning ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        )}
                        {isScanning ? "Analyzing..." : "Start Analysis"}
                      </button>
                    </div>
                  </>
                )}

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4" />
                    Supports PDF files up to 10MB
                  </p>
                </div>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Scanning Screen */}
      {isScanning && <ScanningScreen />}

      {/* CSS Animations */}
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes scanLine {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(calc(100% + 100px));
            opacity: 0;
          }
        }

        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out infinite;
        }

        .scanner-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #3b82f6, transparent);
          animation: scanLine 2.5s linear infinite;
          box-shadow: 0 0 10px #3b82f6;
        }

        .scanner-line-1 {
          animation-delay: 0s;
        }
        .scanner-line-2 {
          animation-delay: 0.4s;
          background: linear-gradient(90deg, transparent, #8b5cf6, transparent);
          box-shadow: 0 0 8px #8b5cf6;
        }
        .scanner-line-3 {
          animation-delay: 0.8s;
          background: linear-gradient(90deg, transparent, #10b981, transparent);
          box-shadow: 0 0 8px #10b981;
        }
        .scanner-line-4 {
          animation-delay: 1.2s;
          background: linear-gradient(90deg, transparent, #f59e0b, transparent);
          box-shadow: 0 0 8px #f59e0b;
        }
        .scanner-line-5 {
          animation-delay: 1.6s;
          background: linear-gradient(90deg, transparent, #ef4444, transparent);
          box-shadow: 0 0 8px #ef4444;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .animation-delay-500 {
          animation-delay: 500ms;
        }
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </>
  );
};

export default ScannerUploadModal;
