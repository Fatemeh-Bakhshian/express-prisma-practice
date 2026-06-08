import catchErrore from "../../utils/catchErrore.util.js";
import paginateData from "../../utils/pagination.util.js";
import { prisma } from "../../utils/prisma.util.js";

export const getAllUserByAdmin = catchErrore(async (req, res, next) => {
  const { search, limit, page } = req.query;

  const pagination = paginateData({ limit, page });
  const users = await prisma.user.findMany({
    skip: pagination.skip,
    take: pagination.limit,
    where: {
      is_active: true,
      name: { contains: search },
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,

      blogs: {
        where: { is_active: true },
        select: {
          id: true,
          content: true,
          ImageUrl: true,
          title: true,
        },
      },
    },
  });

  const total = await prisma.user.count({
    where: {
      is_active: true,
      name: { contains: search },
    },
  });

  res.status(200).json({
    status: "success",
    total,
    users,
  });
});
