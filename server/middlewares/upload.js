import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const ok = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ].includes(file.mimetype);
    if (!ok) return cb(new Error("Only PDF/DOC/DOCX allowed"));
    cb(null, true);
  },
});

export const uploadBufferToCloudinary = (buffer, folder = "resumes") =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "raw", folder, public_id: `${Date.now()}` }, // raw so it keeps original
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
    Readable.from(buffer).pipe(stream);
  });

// // import multer from "multer";
// // import { CloudinaryStorage } from "multer-storage-cloudinary";
// // import cloudinary from "../config/cloudinary.js";

// // // store resumes as raw so PDF remains
// // const storage = new CloudinaryStorage({
// //   cloudinary,
// //   params: {
// //     folder: "resumes",
// //     resource_type: "raw",
// //     format: async (req, file) => {
// //       // allow original extension
// //       return;
// //     },
// //   },
// // });

// // const upload = multer({
// //   storage,
// //   limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
// // });

// // export default upload;
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => ({
//     folder: "resumatch/resumes",
//     resource_type: "raw",
//     public_id: `resume_${req.user.id}_${Date.now()}`, // userId_timestamp
//     format: file.mimetype.split("/")[1], // Keep original extension (pdf, doc, docx)
//     access_mode: "public", // Ensure public access
//     sign_url: true,
//   }),
// });

// export const upload = multer({
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = [
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     ];
//     if (!allowedTypes.includes(file.mimetype)) {
//       return cb(new Error("Only PDF, DOC, or DOCX files are allowed"));
//     }
//     cb(null, true);
//   },
// });

// export default upload;
