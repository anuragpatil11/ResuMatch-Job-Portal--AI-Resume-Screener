// import { Link, useNavigate } from "react-router-dom";
// import {useContext } from "react";
// import AuthContext from "@/context/AuthContext";
// const Navbar = () => {
//   const { token, logout } = useContext(AuthContext);
 

//   return (
//     <div className="bg-white p-8 w-100vh flex justify-between items-center ">
//       {/* Logo */}
//       <div className="flex items-center">
//         <h1 className="text-2xl font-bold text-gray-800">
//           Resu<span className="text-blue-600">Match</span>
//         </h1>
//       </div>

//       {/* Navigation Links */}
//       <div className="flex items-center gap-8 font-medium text-gray-600">
//         <Link to="/" className="hover:text-blue-600 cursor-pointer">
//           Home
//         </Link>
//         <Link to="/job" className="hover:text-blue-600 cursor-pointer">
//           Job
//         </Link>
//       </div>

//       {/* Auth Buttons */}
//       <div className="flex gap-4">
//         {token ? (
//           <button
//             onClick={logout}
//             className="bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700 transition"
//           >
//             Logout
//           </button>
//         ) : (
//           <>
//             <Link
//               to="/login"
//               className="border border-blue-600 text-blue-600 px-5 py-2 rounded-full hover:bg-blue-50 transition"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="bg-blue-600 text-white px-5 py-2 rounded-full ml-2 hover:bg-blue-700 transition"
//             >
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// import { Link, useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import { Menu, X, ChevronDown } from "lucide-react";
// import AuthContext from "@/context/AuthContext";

// const Navbar = () => {
//   const { token, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-8">
//         <div className="flex items-center justify-between h-16 md:h-20">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center gap-2">
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
//                 <span className="text-white text-xl font-bold">R</span>
//               </div>
//               <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
//                 Resu<span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Match</span>
//               </h1>
//             </Link>
//           </div>

//           {/* Desktop Navigation Links */}
//           <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
//             <Link
//               to="/"
//               className="relative group px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
//             >
//               Home
//               <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
//             </Link>
//             <Link
//               to="/job"
//               className="relative group px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
//             >
//               Jobs
//               <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
//             </Link>
//             <div className="relative group">
//               <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-300">
//                 More
//                 <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
//               </button>
//               <div className="absolute hidden group-hover:block bg-white shadow-xl rounded-2xl mt-2 w-48 border border-gray-100">
//                 <Link
//                   to="/about"
//                   className="block px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-t-2xl transition-colors"
//                 >
//                   About Us
//                 </Link>
//                 <Link
//                   to="/features"
//                   className="block px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
//                 >
//                   Features
//                 </Link>
//                 <Link
//                   to="/contact"
//                   className="block px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-b-2xl transition-colors"
//                 >
//                   Contact
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Desktop Auth Buttons */}
//           <div className="hidden md:flex items-center gap-4">
//             {token ? (
//               <button
//                 onClick={() => {
//                   logout();
//                   navigate("/login");
//                 }}
//                 className="group bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
//               >
//                 Logout
//               </button>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="group border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 hover:border-blue-700 transition-all duration-300 flex items-center gap-2"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={toggleMobileMenu}
//               className="text-gray-600 hover:text-blue-600 focus:outline-none"
//             >
//               {isMobileMenuOpen ? (
//                 <X className="w-6 h-6" />
//               ) : (
//                 <Menu className="w-6 h-6" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden bg-white border-t border-gray-100">
//             <div className="flex flex-col gap-4 px-4 py-6">
//               <Link
//                 to="/"
//                 className="text-gray-600 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300"
//                 onClick={toggleMobileMenu}
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/job"
//                 className="text-gray-600 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300"
//                 onClick={toggleMobileMenu}
//               >
//                 Jobs
//               </Link>
//               <Link
//                 to="/about"
//                 className="text-gray-600 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300"
//                 onClick={toggleMobileMenu}
//               >
//                 About Us
//               </Link>
//               <Link
//                 to="/features"
//                 className="text-gray-600 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300"
//                 onClick={toggleMobileMenu}
//               >
//                 Features
//               </Link>
//               <Link
//                 to="/contact"
//                 className="text-gray-600 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300"
//                 onClick={toggleMobileMenu}
//               >
//                 Contact
//               </Link>
//               {token ? (
//                 <button
//                   onClick={() => {
//                     logout();
//                     navigate("/login");
//                     toggleMobileMenu();
//                   }}
//                   className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 text-left"
//                 >
//                   Logout
//                 </button>
//               ) : (
//                 <>
//                   <Link
//                     to="/login"
//                     className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 hover:border-blue-700 transition-all duration-300 text-left"
//                     onClick={toggleMobileMenu}
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/register"
//                     className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-left"
//                     onClick={toggleMobileMenu}
//                   >
//                     Register
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Menu, X, ChevronDown, LogIn, LogOut, UserPlus, Briefcase, Home, Info, Sparkles, Mail } from "lucide-react";
import AuthContext from "@/context/AuthContext";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white text-xl font-bold">R</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Resu<span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Match</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 font-semibold text-gray-600">
            <Link
              to="/"
              className="relative group px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              to="/job"
              className="relative group px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Jobs
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-300">
                <Sparkles className="w-4 h-4" />
                More
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-xl rounded-2xl mt-2 w-48 border border-gray-100 z-50">
                <Link
                  to="/about"
                  className="flex items-center gap-2 px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-t-2xl transition-colors duration-300"
                >
                  <Info className="w-4 h-4" />
                  About Us
                </Link>
                <Link
                  to="/features"
                  className="flex items-center gap-2 px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
                >
                  <Sparkles className="w-4 h-4" />
                  Features
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center gap-2 px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-b-2xl transition-colors duration-300"
                >
                  <Mail className="w-4 h-4" />
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                title="Log out of your account"
              >
                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="group inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  title="Log in to your account"
                >
                  <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  title="Create a new account"
                >
                  <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-blue-600 focus:outline-none transition-colors duration-300"
              title={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="flex flex-col gap-4 px-4 py-6">
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300"
                onClick={toggleMobileMenu}
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
              <Link
                to="/job"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300"
                onClick={toggleMobileMenu}
              >
                <Briefcase className="w-4 h-4" />
                Jobs
              </Link>
              <Link
                to="/about"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300"
                onClick={toggleMobileMenu}
              >
                <Info className="w-4 h-4" />
                About Us
              </Link>
              <Link
                to="/features"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300"
                onClick={toggleMobileMenu}
              >
                <Sparkles className="w-4 h-4" />
                Features
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300"
                onClick={toggleMobileMenu}
              >
                <Mail className="w-4 h-4" />
                Contact
              </Link>
              {token ? (
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                    toggleMobileMenu();
                  }}
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-left"
                  title="Log out of your account"
                >
                  <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="group inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-left"
                    onClick={toggleMobileMenu}
                    title="Log in to your account"
                  >
                    <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-left"
                    onClick={toggleMobileMenu}
                    title="Create a new account"
                  >
                    <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;