import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorHandler from "./customError";

const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET
  );

  return token;
};

const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return next(new ErrorHandler("No token provided", 400));
  }

  const token = bearer.split(" ")[1].trim();

  if (!token) {
    return next(new ErrorHandler("No token provided", 400));
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token", 400));
  }
};

const comparePassword = (password, passwordHash) => {
  return bcrypt.compare(password, passwordHash);
};

const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

export { comparePassword, createJWT, hashPassword, protect };
