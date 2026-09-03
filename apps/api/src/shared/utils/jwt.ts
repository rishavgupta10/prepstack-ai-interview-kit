import jwt from "jsonwebtoken";

export const generateToken = (userId: string, name: string, email: string) => {
  return jwt.sign({ userId, name, email }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
