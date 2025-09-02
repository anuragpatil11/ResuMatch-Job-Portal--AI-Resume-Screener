// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { User, Briefcase, Calendar, PlusSquare } from "lucide-react";

// const Recruiter = () => {
//   const location = useLocation();

//   const links = [
//     {
//       to: "/recruiter/profile",
//       label: "Profile Information",
//       icon: <User size={18} />,
//     },
//     {
//       to: "/recruiter/post-job",
//       label: "Post Job",
//       icon: <PlusSquare size={18} />,
//     },
//     {
//       to: "/recruiter/posted-jobs",
//       label: "Posted Jobs",
//       icon: <Briefcase size={18} />,
//     },
 
//   ];

//   return (
//     <div className="flex ">
//       {/* Sidebar */}
//       <div className="w-72 h-auto bg-white   border-gray-200  top-[64px] left-0">
//         <div className="p-6">
//           {/* Sidebar Header */}
//           <h2 className="text-xl font-bold text-gray-800 mb-8 tracking-wide">
//             Recruiter Panel
//           </h2>

//           {/* Sidebar Nav */}
//           <nav className="flex flex-col gap-2">
//             {links.map((link, idx) => {
//               const isActive = location.pathname === link.to;
//               return (
//                 <Link
//                   key={idx}
//                   to={link.to}
//                   className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
//                     isActive
//                       ? "bg-blue-600 text-white shadow-sm"
//                       : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
//                   }`}
//                 >
//                   {link.icon}
//                   {link.label}
//                 </Link>
//               );
//             })}
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Recruiter;

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Briefcase, PlusSquare, Menu, X } from "lucide-react";

const Recruiter = () => {
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const links = [
    {
      to: "/recruiter/profile",
      label: "Profile Information",
      icon: User,
    },
    {
      to: "/recruiter/post-job",
      label: "Post Job",
      icon: PlusSquare,
    },
    {
      to: "/recruiter/posted-jobs",
      label: "Posted Jobs",
      icon: Briefcase,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Sidebar (Desktop) */}
      <div className="hidden lg:block w-72 bg-white shadow-lg border-r border-gray-100 fixed top-16 bottom-0 left-0 z-40">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Recruiter <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Panel</span>
            </h2>
          </div>
          <nav className="space-y-2">
            {links.map((link, idx) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={idx}
                  to={link.to}
                  className={`flex items-center gap-3 text-gray-600 font-medium px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                    isActive
                      ? "bg-blue-50 text-blue-600 shadow-sm"
                      : "hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <link.icon
                    className={`w-5 h-5 ${
                      isActive ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600"
                    } transition-colors`}
                  />
                  <span>{link.label}</span>
                  <span
                    className={`absolute left-0 w-1 h-6 bg-blue-600 rounded-r ${
                      isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                    } transition-transform duration-300 origin-center`}
                  ></span>
                </Link>
              );
            })}
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
              <span className="text-gray-900 font-medium">Recruiter Panel</span>
            </>
          )}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed top-28 left-0 right-0 bg-white shadow-lg z-40 border-b border-gray-100">
          <div className="p-6">
            <nav className="space-y-2">
              {links.map((link, idx) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={idx}
                    to={link.to}
                    className={`flex items-center gap-3 text-gray-600 font-medium px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-blue-50 hover:text-blue-600"
                    }`}
                    onClick={toggleMobileSidebar}
                  >
                    <link.icon
                      className={`w-5 h-5 ${
                        isActive ? "text-blue-600" : "text-gray-400"
                      }`}
                    />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
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

export default Recruiter;