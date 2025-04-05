import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "none", // Thay đổi từ strict sang none để hoạt động cross-origin trong production
    secure: true, // Luôn bật secure trong production
    path: "/", // Thêm path để đảm bảo cookie được gửi cho mọi request
  });

  return token;
};
