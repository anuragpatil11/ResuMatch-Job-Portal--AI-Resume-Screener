// import React from "react";
// import { Link } from "react-router-dom";

// const Job = () => {
//   return (
//     <div className="w-100vw h-[80%] flex items-center justify-center ">
//       <div className="h-[500px] w-[2000px] flex flex-col md:flex-row items-center justify-center gap-2  ">
//         {/* Browse Jobs Card */}
//         <div className="p-6  text-center w-[500px] h-[200px]">
//           <h2 className="text-4xl font-bold text-gray-800 mb-4">
//             Find your dream job
//           </h2>
//           <p className="text-gray-600 text-lg mb-4">For Applicants</p>
//           <Link to={"/applicant/jobs"}>
//           <button className="bg-blue-500 hover:bg-blue-600 transition text-white px-8 py-2 rounded-full text-lg font-medium">
//             Browse Jobs
//           </button>
//           </Link>
//         </div>

//         {/* Post a Job Card */}
//         <div className="p-6   text-center  w-[500px] h-[200px]">
//           <h2 className="text-4xl font-bold text-gray-800 mb-4">
//             Looking to hire? Post a job
//           </h2>
//           <p className="text-gray-600 text-lg mb-4">For Recruiters</p>
//           <Link to="/recruiter">
//             <button className="bg-white hover:bg-blue-100 transition text-blue-400 px-8 py-2 rounded-full border border-blue-400 text-lg font-medium">
//               Post a Job
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Job;

import React from "react";
import { Link } from "react-router-dom";
import { Search, Briefcase, ArrowRight } from "lucide-react";

const Job = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium mb-6">
            <Briefcase className="w-4 h-4" />
            <span>Start Your Journey</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Opportunities
            </span>{" "}
            with ResuMatch
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're seeking your dream job or looking to hire top talent,
            ResuMatch connects you with the perfect opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Browse Jobs Card */}
          <div className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
              Find Your Dream Job
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Explore thousands of job listings tailored to your skills and
              preferences with our AI-powered matching.
            </p>
            <Link
              to="/applicant/jobs"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Browse Jobs
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Post a Job Card */}
          <div className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-purple-200 transition-all duration-500 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
              Hire Top Talent
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Post your job openings and let our AI connect you with the best
              candidates for your roles.
            </p>
            <Link
              to="/recruiter/post-job"
              className="group inline-flex items-center gap-2 bg-white border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-full font-semibold text-lg hover:bg-purple-50 hover:border-purple-700 transition-all duration-300"
            >
              Post a Job
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Job;
