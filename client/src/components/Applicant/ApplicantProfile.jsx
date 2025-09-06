// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { USER_API_URL } from "@/utils/constant";
// import Applicant from "@/Sidebar/Applicant";

// const ApplicantProfile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchApplicant = async () => {
//       try {
//         const res = await axios.get(`${USER_API_URL}/profile`, {
//           withCredentials: true, // token cookie bhejne ke liye
//         });
//         setUser(res.data.user);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplicant();
//   }, []);

//   if (loading) return <p className="text-center mt-10">Loading profile...</p>;
//   if (!user) return <p className="text-center mt-10">No user data found</p>;

//   return (
//     <div className="flex">
//       <Applicant />
//       <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
//         <h2 className="text-2xl font-bold text-center mb-6">
//           Applicant Profile
//         </h2>

//         <div className="space-y-4">
//           <p>
//             <span className="font-semibold">Name:</span> {user.fullName}
//           </p>
//           <p>
//             <span className="font-semibold">Email:</span> {user.email}
//           </p>
//           <p>
//             <span className="font-semibold">Role:</span> {user.role}
//           </p>
//           <p>
//             <span className="font-semibold">Phone:</span> {user.phone}
//           </p>
//           <p>
//             <span className="font-semibold">Date of Birth:</span>{" "}
//             {user.dateOfBirth}
//           </p>
//           <p>
//             <span className="font-semibold">Location:</span> {user.location}
//           </p>
//           <p>
//             <span className="font-semibold">Joined:</span>{" "}
//             {new Date(user.createdAt).toDateString()}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplicantProfile;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Applicant from "@/Sidebar/Applicant";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Briefcase,
  ArrowRight,
} from "lucide-react";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ApplicantProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/user/profile`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicant();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 items-center justify-center pt-16 md:pt-20 lg:ml-72">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
            <span>Loading profile...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 items-center justify-center pt-16 md:pt-20 lg:ml-72">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full font-medium">
            <span>No user data found</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Applicant />
      <div className="flex-1 lg:ml-72 p-6 pt-16 md:pt-20">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Applicant{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Profile
                </span>
              </h2>
              <p className="text-gray-600 text-lg">
                Manage your personal information
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: User, label: "Name", value: user.fullName },
              { icon: Mail, label: "Email", value: user.email },
              { icon: Phone, label: "Phone", value: user.phone },
              { icon: MapPin, label: "Location", value: user.location },
              {
                icon: Calendar,
                label: "Date of Birth",
                value: user.dateOfBirth,
              },
              {
                icon: Shield,
                label: "Joined",
                value: new Date(user.createdAt).toDateString(),
              },
              { icon: Briefcase, label: "Role", value: user.role },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-gray-50 rounded-xl p-4 flex items-center gap-4 hover:bg-blue-50 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    {item.label}
                  </p>
                  <p className="text-gray-900 font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
              Edit Profile
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfile;
