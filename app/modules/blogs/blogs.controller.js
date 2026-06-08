import AppErrore from "../../utils/appErrore.util.js";
import catchErrore from "../../utils/catchErrore.util.js";
import { prisma } from "../../utils/prisma.util.js";

export const getAllBlogs = catchErrore(async (req, res, next) => {
  const { search } = req.query;
  const blogs = await prisma.blog.findMany({
    where: {
      is_active: true,
      title: { contains: search },
    },
    select: {
      id: true,
      title: true,
      content: true,

      ImageUrl: true,

      writer: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  res.status(200).json({
    status: "success",
    total: blogs.length,
    blogs,
  });
});

export const getBlogDetail = catchErrore(async (req, res, next) => {
  const blogId = req.params.id;

  const blog = await prisma.blog.findFirst({
    where: { id: blogId },
    select: {
      id: true,
      title: true,
      content: true,

      ImageUrl: true,

      writer: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  if (!blog || blog.is_active === false) {
    next(new AppErrore("blog nor found", 404));
  }

  res.status(200).json({
    status: "success",
    blog,
  });
});

export const postNewBlog = catchErrore(async (req, res, next) => {
  const user = req.user;
  const { title, content } = req.body;
  const file = req.file;

  const imageUrl = file?.path;

  const newblog = await prisma.blog.create({
    data: {
      title,
      content,
      ImageUrl: imageUrl,
      writer_id: user.id,
    },
  });

  res.status(201).json({
    status: "success",
    data: newblog,
  });
});

export const patchBlog = catchErrore(async (req, res, next) => {
  const blogId = req.params.id;
  const updatedFields = req.body;
  const user = req.user;
  const file = req.file;

  const imageUrl = file?.path;

  const blog = await prisma.blog.findFirst({ where: { id: blogId } });

  if (!blog) {
    return next(new AppErrore("blog doesnt exists!", 404));
  }
  if (!(user.id === blog.writer_id) || !(user.role === "Admin")) {
    return next(new AppErrore("users can update only thier own blog!", 403));
  }

  const updatedBlog = await prisma.blog.update({
    where: { id: blogId },
    data: {
      content: updatedFields.content,
      title: updatedFields.title,
      ImageUrl: imageUrl,
    },
  });

  res.status(200).json({
    status: "success",
    updatedBlog,
  });
});

export const deleteBlog = catchErrore(async (req, res, next) => {
  const blogId = req.params.id;

  const user = req.user;

  const blog = await prisma.blog.findFirst({ where: { id: blogId } });

  if (!blog) {
    return next(new AppErrore("blog doesnt exists!", 404));
  }

  console.log("blog.writer_id", blog.writer_id);
  console.log("user.id", user.id);

  if (user.role === "Admin") {
    const update_is_active = await prisma.blog.update({
      where: { id: blogId },
      data: { is_active: false },
    });
    return res.status(204).json({
      status: "success",
      message: "blog deleted successfully",
    });
  }

  if (user.id !== blog.writer_id) {
    return next(new AppErrore("users can delete only thier own blog!", 403));
  }

  const update_is_active = await prisma.blog.update({
    where: { id: blogId },
    data: { is_active: false },
  });

  res.status(204).json({
    status: "success",
    message: "blog deleted successfully",
  });
});
