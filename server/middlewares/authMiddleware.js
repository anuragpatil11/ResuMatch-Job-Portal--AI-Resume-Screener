import jwt from "jsonwebtoken";

export const isAuthenticate = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    const role = req.cookies.role;

    if (!token || !role) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authenticated..." });
    }

    // token verify karo (sirf token pass karna hota hai)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token..." });
    }

    // decoded ke andar role hona chahiye jab token banate ho
    if (decoded.role !== role) {
      return res
        .status(401)
        .json({ success: false, message: "Role mismatch..." });
    }

    req.user = {
      id: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Authentication error..." });
  }
};

export const ensureApplicant = (req, res, next) => {
  if (req.user?.role !== "applicant") {
    return res.status(403).json({ success: false, message: "Applicants only" });
  }
  next();
};

export const ensureRecruiter = (req, res, next) => {
  if (req.user?.role !== "recruiter") {
    return res
      .status(403)
      .json({ success: false, message: "Access denied: Recruiter only" });
  }
  next();
};
