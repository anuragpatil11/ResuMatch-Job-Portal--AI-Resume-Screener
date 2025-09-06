
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Briefcase, Calendar, Menu, X } from "lucide-react";

const Applicant = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (Desktop) */}
      <div className="hidden lg:block w-72 bg-white shadow-lg border-r border-gray-100 fixed top-16 bottom-0 left-0 z-40">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Applicant{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Panel
              </span>
            </h2>
          </div>
          <nav className="space-y-2">
            {[
              {
                to: "/applicant/profile",
                icon: User,
                text: "Profile Information",
              },
              { to: "/applicant/jobs", icon: Briefcase, text: "Jobs" },
              {
                to: "/applicant/applied-jobs",
                icon: Calendar,
                text: "Applied Jobs",
              },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="flex items-center gap-3 text-gray-600 hover:text-blue-600 font-medium px-4 py-3 rounded-xl hover:bg-blue-50 transition-all duration-300 group relative"
              >
                <item.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                <span>{item.text}</span>
                <span className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"></span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar Toggle Button */}
      <div className="lg:hidden fixed top-16 left-0 z-50 p-4 bg-white w-full border-b border-gray-100">
        <button
          onClick={toggleMobileSidebar}
          className="text-gray-600 hover:text-blue-600 focus:outline-none flex items-center gap-2"
        >
          {isMobileSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <Menu className="w-6 h-6" />
              <span className="text-gray-900 font-medium">Applicant Panel</span>
            </>
          )}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed top-28 left-0 right-0 bg-white shadow-lg z-40 border-b border-gray-100">
          <div className="p-6">
            <nav className="space-y-2">
              {[
                {
                  to: "/applicant/profile",
                  icon: User,
                  text: "Profile Information",
                },
                { to: "/applicant/jobs", icon: Briefcase, text: "Jobs" },
                {
                  to: "/applicant/applied-jobs",
                  icon: Calendar,
                  text: "Applied Jobs",
                },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className="flex items-center gap-3 text-gray-600 hover:text-blue-600 font-medium px-4 py-3 rounded-xl hover:bg-blue-50 transition-all duration-300"
                  onClick={toggleMobileSidebar}
                >
                  <item.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  <span>{item.text}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      

      {/* CSS for animations */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Applicant;
