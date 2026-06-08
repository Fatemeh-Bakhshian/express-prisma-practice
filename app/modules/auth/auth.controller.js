import catchErrore from "../../utils/catchErrore.util.js";
import AppErrore from "../../utils/appErrore.util.js";
import { prisma } from "../../utils/prisma.util.js";
import {
  comparePassword,
  hashPassword,
} from "../../utils/hashPassword.util.js";
import { createToken } from "../../utils/jwt.util.js";

export const signIn = catchErrore(async (req, res, next) => {
  const { email, password, name } = req.body;

  const isUserExist = await prisma.user.findFirst({
    where: { email },
  });

  if (isUserExist) {
    return next(
      new AppErrore("user already exits, please choose another email!", 409),
    );
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  const token = createToken({
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    role: newUser.role,
  });

  res.status(201).json({
    status: "success",
    token: `${token}`,
  });
});

export const logIn = catchErrore(async (req, res, next) => {
  const { email, password } = req.body;

  const isUserExist = await prisma.user.findFirst({
    where: { email },
  });

  if (!isUserExist) {
    return next(new AppErrore("There is no user with this email!", 404));
  }

  const checkPassword = await comparePassword(password, isUserExist.password);

  if (!checkPassword) {
    return next(new AppErrore("password is wrong", 401));
  }

  const token = createToken({
    id: isUserExist.id,
    email: isUserExist.email,
    name: isUserExist.name,
    role: isUserExist.role,
  });

  res.status(200).json({
    status: "success",
    token: `${token}`,
  });
});
