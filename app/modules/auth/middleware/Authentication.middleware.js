import catchErrore from "../../../utils/catchErrore.util.js";
import AppError from "../../../utils/appErrore.util.js";
import { prisma } from "../../../utils/prisma.util.js";

import { verifyToken, createToken } from "../../../utils/jwt.util.js";


const authenticate = catchErrore(async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return next(new AppError("you need to login first", 401));
  }

  const verify = verifyToken(token);
  if (verify === undefined) {
    return next(new AppError("token expired, you need to login again", 401));
  }

  //   اگر زمان انقضای توکن نزدیک بود توکن جدید میسازه

  const decoded = verifyToken(token);
  console.log("process.env.SECRET_KEY =>", decoded);

  const tokenDate = {
    id: decoded.id,
    name: decoded.name,
    role: decoded.role,
    email: decoded.email,
  };

  const now = Math.floor(Date.now() / 1000);
  const timeLeft = decoded.exp - now; //3600 s
  const ROLLING_THRESHOLD = 3600 - 25 * 60; // 25min = 1500 s  --->  3600 - 1500 = 2100

  console.log("env: ", ROLLING_THRESHOLD, "timelft: ", timeLeft);
  if (timeLeft < ROLLING_THRESHOLD) {
    console.log("first");
    const newToken = createToken(tokenDate);

    res.setHeader("Authorization", `Bearer ${newToken}`);
  }

  const checkUser =await prisma.user.findFirst({
    where: {
      id: decoded.id,
    },
  });

  if (!checkUser) {
    return next(new AppError("user is not defind", 401));
  }

  req.user = checkUser;
  next();
});

export default authenticate;
