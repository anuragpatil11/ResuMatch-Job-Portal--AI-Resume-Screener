import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./databases/db.js";
import userRoute from "./routes/user.js";
import jobRoute from "./routes/job.js";
import applicantRoute from "./routes/application.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();
// quick warn filter: suppress known harmless pdf-worker warnings
const origWarn = console.warn;
console.warn = (...args) => {
  if (
    args[0] &&
    typeof args[0] === "string" &&
    args[0].includes("Setting up fake worker")
  )
    return;
  origWarn(...args);
};

//builtin middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// const corsOptions = {
//   origin: "https://resummatch.netlify.app",
//   credentials: true,
// };
// app.use(cors(corsOptions));
// ✅ Allowed origins list
const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://resummatch.netlify.app", // deployed frontend
];

// ✅ CORS config
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // 🔑 Allow cookies
  })
);
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job/", jobRoute);
app.use("/api/v1/application/", applicantRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
