// import React from "react";
// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div className=" min-h-screen">
//       {/* Hero Section */}
//       <section className="relative flex flex-col items-center justify-center text-center min-h-[70vh]  text-gray-800 px-4 sm:px-8">
//         <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
//           Welcome to <span className="text-blue-600">ResuMatch</span>
//         </h1>
//         <p className="text-lg sm:text-xl max-w-3xl text-gray-600 mb-8">
//           AI-powered resume screening to connect top talent with the perfect
//           jobs. Upload your resume or post a job today!
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4">
//           <Link
//             to="/job"
//             className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
//           >
//             Explore Jobs
//           </Link>
//           {/* <Link
//             to="/admin"
//             className="px-6 py-3 rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition"
//           >
//             Post a Job
//           </Link> */}
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 px-4 sm:px-8 bg-gray-50">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
//           Why ResuMatch?
//         </h2>
//         <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold text-blue-600 mb-2">
//               AI Skill Extraction
//             </h3>
//             <p className="text-gray-600">
//               Upload your resume, and our AI instantly extracts skills to match
//               you with the best jobs.
//             </p>
//           </div>
//           <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold text-blue-600 mb-2">
//               Smart Job Matching
//             </h3>
//             <p className="text-gray-600">
//               Get personalized job recommendations based on your skills and
//               preferences.
//             </p>
//           </div>
//           <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold text-blue-600 mb-2">
//               Recruiter Dashboard
//             </h3>
//             <p className="text-gray-600">
//               Post jobs, rank applicants by skill match, and streamline your
//               hiring process.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="py-16 px-4 sm:px-8 bg-white">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
//           How It Works
//         </h2>
//         <div className="shadow-md max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="p-6 bg-gray-50 rounded-lg">
//             <h3 className="text-xl font-semibold text-blue-600 mb-4">
//               For Applicants
//             </h3>
//             <ol className="list-decimal list-inside space-y-2 text-gray-600">
//               <li>Sign up and upload your resume (PDF).</li>
//               <li>Our AI extracts your skills automatically.</li>
//               <li>Browse or get recommended jobs.</li>
//               <li>Apply with one click.</li>
//             </ol>
//           </div>
//           <div className="shadow-md p-6 bg-gray-50 rounded-lg">
//             <h3 className="text-xl font-semibold text-blue-600 mb-4">
//               For Recruiters
//             </h3>
//             <ol className="list-decimal list-inside space-y-2 text-gray-600">
//               <li>Create an account and post job openings.</li>
//               <li>Receive applications with AI match scores.</li>
//               <li>Rank and review candidates.</li>
//               <li>Hire the best talent.</li>
//             </ol>
//           </div>
//         </div>
//       </section>

//       {/* Call-to-Action Section */}
//       <section className="shadow-md py-16 px-4 sm:px-8 text-black text-center h-auto">
//         <h2 className="text-3xl font-bold mb-6">
//           Start Your Journey with ResuMatch
//         </h2>
//         <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-600">
//           Applicants, find your dream job. Recruiters, discover top talent. Join
//           ResuMatch today!
//         </p>
//       </section>
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Brain,
//   Target,
//   Users,
//   Briefcase,
//   CheckCircle,
//   ArrowRight,
//   Zap,
//   Star,
//   TrendingUp,
//   Award,
//   Shield,
//   Sparkles,
//   Play,
//   Search,
//   FileText,
//   Building2,
//   Clock,
//   ChevronDown,
//   Quote
// } from "lucide-react";

// const Home = () => {
//   const [currentFeature, setCurrentFeature] = useState(0);
//   const [stats, setStats] = useState({
//     jobs: 0,
//     users: 0,
//     matches: 0,
//     companies: 0
//   });

//   // Animated counter effect
//   useEffect(() => {
//     const targetStats = { jobs: 10000, users: 5000, matches: 8500, companies: 250 };
//     const duration = 2000;
//     const steps = 50;
//     const stepTime = duration / steps;

//     let currentStep = 0;
//     const timer = setInterval(() => {
//       currentStep++;
//       const progress = currentStep / steps;
      
//       setStats({
//         jobs: Math.floor(targetStats.jobs * progress),
//         users: Math.floor(targetStats.users * progress),
//         matches: Math.floor(targetStats.matches * progress),
//         companies: Math.floor(targetStats.companies * progress)
//       });

//       if (currentStep >= steps) {
//         clearInterval(timer);
//         setStats(targetStats);
//       }
//     }, stepTime);

//     return () => clearInterval(timer);
//   }, []);

//   // Rotating features
//   const features = [
//     { icon: Brain, text: "AI-Powered Skill Extraction" },
//     { icon: Target, text: "Smart Job Matching" },
//     { icon: Zap, text: "Instant Resume Analysis" },
//     { icon: Award, text: "Personalized Recommendations" }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentFeature((prev) => (prev + 1) % features.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-white overflow-hidden">
//       {/* Hero Section */}
//       <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
//         {/* Background Elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
//           <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
//           <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
//         </div>

//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 text-center">
//           <div className="mb-8">
//             <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium mb-6 animate-bounce">
//               <Sparkles className="w-4 h-4" />
//               <span>AI-Powered Job Matching Platform</span>
//             </div>
            
//             <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
//               Welcome to{" "} Resu
//               <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
//                 Match
//               </span>
//             </h1>
            
//             <p className="text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto text-gray-600 mb-8 leading-relaxed">
//               AI-powered resume screening to connect top talent with the perfect jobs. 
//               <span className="text-blue-600 font-semibold"> Upload your resume</span> or 
//               <span className="text-purple-600 font-semibold"> post a job</span> today!
//             </p>

//             {/* Rotating Feature Display */}
//             <div className="mb-8">
//               <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-6 py-4 shadow-lg border border-gray-100">
//                 <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
//                   {React.createElement(features[currentFeature].icon, { 
//                     className: "w-5 h-5 text-white" 
//                   })}
//                 </div>
//                 <span className="text-gray-800 font-medium text-lg">
//                   {features[currentFeature].text}
//                 </span>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//               <Link
//                 to="/job"
//                 className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
//               >
//                 <Search className="w-5 h-5" />
//                 Explore Jobs
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </Link>
              
//             </div>
//           </div>

//           {/* Stats Section */}
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16">
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
//               <div className="text-3xl font-bold text-blue-600 mb-2">{stats.jobs.toLocaleString()}+</div>
//               <div className="text-gray-600 font-medium">Active Jobs</div>
//             </div>
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
//               <div className="text-3xl font-bold text-green-600 mb-2">{stats.users.toLocaleString()}+</div>
//               <div className="text-gray-600 font-medium">Happy Users</div>
//             </div>
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
//               <div className="text-3xl font-bold text-purple-600 mb-2">{stats.matches.toLocaleString()}+</div>
//               <div className="text-gray-600 font-medium">Successful Matches</div>
//             </div>
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
//               <div className="text-3xl font-bold text-orange-600 mb-2">{stats.companies.toLocaleString()}+</div>
//               <div className="text-gray-600 font-medium">Partner Companies</div>
//             </div>
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//           <ChevronDown className="w-6 h-6 text-gray-400" />
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
//         <div className="absolute inset-0">
//           <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
//         </div>
        
//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium mb-6">
//               <Star className="w-4 h-4" />
//               Why Choose ResuMatch?
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               Powered by <span className="text-blue-600">Advanced AI</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Experience the future of job matching with our cutting-edge technology
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <div className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
//               <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
//                 <Brain className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
//                 AI Skill Extraction
//               </h3>
//               <p className="text-gray-600 leading-relaxed mb-6">
//                 Upload your resume, and our advanced AI instantly extracts and analyzes your skills to match you with the perfect opportunities.
//               </p>
//               <div className="flex items-center text-blue-600 font-medium group-hover:gap-3 transition-all">
//                 <span>Learn more</span>
//                 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//               </div>
//             </div>

//             <div className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 transform hover:-translate-y-2">
//               <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
//                 <Target className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
//                 Smart Job Matching
//               </h3>
//               <p className="text-gray-600 leading-relaxed mb-6">
//                 Get personalized job recommendations powered by machine learning algorithms that understand your unique profile and preferences.
//               </p>
//               <div className="flex items-center text-green-600 font-medium group-hover:gap-3 transition-all">
//                 <span>Learn more</span>
//                 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//               </div>
//             </div>

//             <div className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-2 md:col-span-2 lg:col-span-1">
//               <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
//                 <Users className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
//                 Recruiter Dashboard
//               </h3>
//               <p className="text-gray-600 leading-relaxed mb-6">
//                 Post jobs, receive AI-ranked applications, and streamline your hiring process with our comprehensive recruiter tools.
//               </p>
//               <div className="flex items-center text-purple-600 font-medium group-hover:gap-3 transition-all">
//                 <span>Learn more</span>
//                 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="py-20 bg-white relative">
//         <div className="max-w-7xl mx-auto px-4 sm:px-8">
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium mb-6">
//               <Zap className="w-4 h-4" />
//               Simple Process
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               How It <span className="text-purple-600">Works</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Get started in minutes with our streamlined process
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
//             {/* For Applicants */}
//             <div className="relative">
//               <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 h-full">
//                 <div className="flex items-center gap-4 mb-8">
//                   <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
//                     <FileText className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-bold text-gray-900">For Job Seekers</h3>
//                     <p className="text-blue-600 font-medium">Find your dream job</p>
//                   </div>
//                 </div>

//                 <div className="space-y-6">
//                   {[
//                     { step: 1, text: "Sign up and create your profile", icon: Users },
//                     { step: 2, text: "Upload your resume (PDF format)", icon: FileText },
//                     { step: 3, text: "AI extracts your skills automatically", icon: Brain },
//                     { step: 4, text: "Browse jobs or get recommendations", icon: Search },
//                     { step: 5, text: "Apply with one click", icon: Zap }
//                   ].map((item, index) => (
//                     <div key={index} className="flex items-start gap-4 group">
//                       <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 group-hover:scale-110 transition-transform">
//                         {item.step}
//                       </div>
//                       <div className="flex-1 pt-2">
//                         <p className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">
//                           {item.text}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* For Recruiters */}
//             <div className="relative">
//               <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-3xl p-8 h-full">
//                 <div className="flex items-center gap-4 mb-8">
//                   <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center">
//                     <Building2 className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-bold text-gray-900">For Recruiters</h3>
//                     <p className="text-purple-600 font-medium">Discover top talent</p>
//                   </div>
//                 </div>

//                 <div className="space-y-6">
//                   {[
//                     { step: 1, text: "Create recruiter account", icon: Users },
//                     { step: 2, text: "Post detailed job openings", icon: Briefcase },
//                     { step: 3, text: "Receive AI-ranked applications", icon: TrendingUp },
//                     { step: 4, text: "Review candidate match scores", icon: Award },
//                     { step: 5, text: "Hire the perfect candidate", icon: CheckCircle }
//                   ].map((item, index) => (
//                     <div key={index} className="flex items-start gap-4 group">
//                       <div className="w-10 h-10 bg-purple-600 text-white rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 group-hover:scale-110 transition-transform">
//                         {item.step}
//                       </div>
//                       <div className="flex-1 pt-2">
//                         <p className="text-gray-700 font-medium group-hover:text-purple-600 transition-colors">
//                           {item.text}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
//               What Our Users Say
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 name: "Sarah Johnson",
//                 role: "Software Engineer",
//                 company: "Tech Corp",
//                 text: "ResuMatch helped me find my dream job in just 2 weeks! The AI matching is incredibly accurate.",
//                 rating: 5
//               },
//               {
//                 name: "Mike Chen",
//                 role: "HR Director",
//                 company: "StartupXYZ",
//                 text: "We've reduced our hiring time by 60% using ResuMatch. The candidate quality is outstanding.",
//                 rating: 5
//               },
//               {
//                 name: "Emily Davis",
//                 role: "Product Manager",
//                 company: "Innovation Inc",
//                 text: "The skill extraction feature is amazing. It picked up skills from my resume I forgot I had!",
//                 rating: 5
//               }
//             ].map((testimonial, index) => (
//               <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
//                 <div className="flex items-center gap-1 mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <div className="mb-6">
//                   <Quote className="w-8 h-8 text-blue-200 mb-3" />
//                   <p className="text-gray-700 leading-relaxed italic">
//                     "{testimonial.text}"
//                   </p>
//                 </div>
//                 <div className="border-t border-gray-100 pt-4">
//                   <p className="font-semibold text-gray-900">{testimonial.name}</p>
//                   <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Call-to-Action Section */}
//       <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
//         <div className="absolute inset-0">
//           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/80 to-purple-600/80"></div>
//           <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
//           <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
//         </div>

//         <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-8">
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
//             Start Your Journey with{" "}
//             <span className="text-yellow-300">ResuMatch</span>
//           </h2>
//           <p className="text-xl md:text-2xl mb-12 leading-relaxed text-blue-100">
//             Join thousands of job seekers and recruiters who trust ResuMatch to make perfect connections. 
//             Your dream job or ideal candidate is just a click away!
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
//             <Link
//               to="/register"
//               className="group bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center gap-2"
//             >
//               Get Started Free
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </Link>
            
//             <div className="flex items-center gap-4 text-blue-100">
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="w-5 h-5 text-green-300" />
//                 <span>Free to join</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Shield className="w-5 h-5 text-green-300" />
//                 <span>Secure & private</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CSS for animations */}
//       <style jsx>{`
//         @keyframes blob {
//           0% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//           100% { transform: translate(0px, 0px) scale(1); }
//         }
        
//         @keyframes gradient {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }

//         .animate-blob {
//           animation: blob 7s infinite;
//         }

//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }

//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }

//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient 3s ease infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Target,
  Users,
  Briefcase,
  CheckCircle,
  ArrowRight,
  Zap,
  Star,
  TrendingUp,
  Award,
  Shield,
  Sparkles,
  Search,
  FileText,
  Building2,
  Clock,
  ChevronDown,
  Quote,
  Upload,
  UserPlus,
} from "lucide-react";

const Home = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [stats, setStats] = useState({
    jobs: 0,
    users: 0,
    matches: 0,
    companies: 0,
  });

  // Animated counter effect
  useEffect(() => {
    const targetStats = { jobs: 10000, users: 5000, matches: 8500, companies: 250 };
    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setStats({
        jobs: Math.floor(targetStats.jobs * progress),
        users: Math.floor(targetStats.users * progress),
        matches: Math.floor(targetStats.matches * progress),
        companies: Math.floor(targetStats.companies * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(targetStats);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // Rotating features
  const features = [
    { icon: Brain, text: "AI-Powered Skill Extraction" },
    { icon: Target, text: "Smart Job Matching" },
    { icon: Zap, text: "Instant Resume Analysis" },
    { icon: Award, text: "Personalized Recommendations" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen bg-white overflow-hidden pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm mb-6 animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Job Matching Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                ResuMatch
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto text-gray-600 mb-8 leading-relaxed">
              Connect with your dream job or perfect candidate using our AI-powered resume screening and job matching technology.
            </p>

            {/* Rotating Feature Display */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-6 py-4 shadow-lg border border-gray-100 transition-all duration-500">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {React.createElement(features[currentFeature].icon, {
                    className: "w-5 h-5 text-white",
                  })}
                </div>
                <span className="text-gray-800 font-semibold text-lg">
                  {features[currentFeature].text}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/job"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                title="Browse available jobs"
              >
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Explore Jobs
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 hover:text-blue-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                title="Sign up to start your journey"
              >
                <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Get Started
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mt-16">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats.jobs.toLocaleString()}+</div>
              <div className="flex items-center gap-2 text-gray-600 font-semibold text-sm">
                <Briefcase className="w-4 h-4" />
                Active Jobs
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.users.toLocaleString()}+</div>
              <div className="flex items-center gap-2 text-gray-600 font-semibold text-sm">
                <Users className="w-4 h-4" />
                Happy Users
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-3xl font-bold text-purple-600 mb-2">{stats.matches.toLocaleString()}+</div>
              <div className="flex items-center gap-2 text-gray-600 font-semibold text-sm">
                <Target className="w-4 h-4" />
                Successful Matches
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-3xl font-bold text-orange-600 mb-2">{stats.companies.toLocaleString()}+</div>
              <div className="flex items-center gap-2 text-gray-600 font-semibold text-sm">
                <Building2 className="w-4 h-4" />
                Partner Companies
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm mb-6">
              <Star className="w-4 h-4" />
              Why Choose ResuMatch?
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powered by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Advanced AI</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover a smarter way to find jobs or hire talent with our cutting-edge technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                AI Skill Extraction
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our AI instantly analyzes your resume to extract skills, matching you with opportunities that fit your expertise.
              </p>
              <Link
                to="/features"
                className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all"
                title="Learn more about AI skill extraction"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-green-200 transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                Smart Job Matching
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Machine learning algorithms deliver personalized job recommendations based on your unique profile.
              </p>
              <Link
                to="/features"
                className="flex items-center gap-2 text-green-600 font-semibold text-sm group-hover:gap-3 transition-all"
                title="Learn more about smart job matching"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-purple-200 transition-all duration-500 transform hover:-translate-y-2 md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                Recruiter Dashboard
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Streamline hiring with AI-ranked applications and powerful tools to find the perfect candidate.
              </p>
              <Link
                to="/features"
                className="flex items-center gap-2 text-purple-600 font-semibold text-sm group-hover:gap-3 transition-all"
                title="Learn more about the recruiter dashboard"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold text-sm mb-6">
              <Zap className="w-4 h-4" />
              Simple Process
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Start your journey in minutes with our streamlined process for job seekers and recruiters.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* For Applicants */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 shadow-lg border border-blue-100 h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-md">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">For Job Seekers</h3>
                    <p className="text-blue-600 font-semibold text-sm">Find Your Dream Job</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { step: 1, text: "Sign up and create your profile", icon: UserPlus },
                    { step: 2, text: "Upload your resume (PDF format)", icon: Upload },
                    { step: 3, text: "AI extracts your skills automatically", icon: Brain },
                    { step: 4, text: "Browse jobs or get recommendations", icon: Search },
                    { step: 5, text: "Apply with one click", icon: Zap },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {item.step}
                      </div>
                      <div className="flex-1 pt-2">
                        <p className="text-gray-700 font-semibold text-sm group-hover:text-blue-600 transition-colors duration-300">
                          {item.text}
                        </p>
                      </div>
                      <div className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                        {React.createElement(item.icon, { className: "w-6 h-6" })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link
                    to="/register"
                    className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    title="Sign up as a job seeker"
                  >
                    <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Join as Job Seeker
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* For Recruiters */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-3xl p-8 shadow-lg border border-purple-100 h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center shadow-md">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">For Recruiters</h3>
                    <p className="text-purple-600 font-semibold text-sm">Discover Top Talent</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { step: 1, text: "Create recruiter account", icon: UserPlus },
                    { step: 2, text: "Post detailed job openings", icon: Briefcase },
                    { step: 3, text: "Receive AI-ranked applications", icon: TrendingUp },
                    { step: 4, text: "Review candidate match scores", icon: Award },
                    { step: 5, text: "Hire the perfect candidate", icon: CheckCircle },
                  ].map((item, index) => (
                    <div key={index} step={item.step} className="flex items-start gap-4 group">
                      <div className="w-10 h-10 bg-purple-600 text-white rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {item.step}
                      </div>
                      <div className="flex-1 pt-2">
                        <p className="text-gray-700 font-semibold text-sm group-hover:text-purple-600 transition-colors duration-300">
                          {item.text}
                        </p>
                      </div>
                      <div className="w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform duration-300">
                        {React.createElement(item.icon, { className: "w-6 h-6" })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link
                    to="/register"
                    className="group inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    title="Sign up as a recruiter"
                  >
                    <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Join as Recruiter
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold text-sm mb-6">
              <Star className="w-4 h-4" />
              Trusted by Users
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Users Say</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from job seekers and recruiters who found success with ResuMatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Software Engineer",
                company: "Tech Corp",
                text: "ResuMatch helped me find my dream job in just 2 weeks! The AI matching is incredibly accurate.",
                rating: 5,
              },
              {
                name: "Mike Chen",
                role: "HR Director",
                company: "StartupXYZ",
                text: "We've reduced our hiring time by 60% using ResuMatch. The candidate quality is outstanding.",
                rating: 5,
              },
              {
                name: "Emily Davis",
                role: "Product Manager",
                company: "Innovation Inc",
                text: "The skill extraction feature is amazing. It picked up skills from my resume I forgot I had!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-blue-200 mb-3" />
                  <p className="text-gray-700 leading-relaxed italic">"{testimonial.text}"</p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-8">
          <div className="inline-flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-full font-semibold text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            Ready to Get Started?
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Join <span className="text-yellow-300">ResuMatch</span> Today
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-12 leading-relaxed text-blue-100">
            Whether you're seeking your next career move or hiring top talent, ResuMatch makes it easy and fast.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              title="Sign up as a job seeker or recruiter"
            >
              <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/job"
              className="group inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-blue-600 hover:border-blue-600 shadow-md hover:shadow-lg transform hover:scale-105"
              title="Browse available jobs"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Explore Jobs
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 text-blue-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>Free to Join</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-300" />
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      </section>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;