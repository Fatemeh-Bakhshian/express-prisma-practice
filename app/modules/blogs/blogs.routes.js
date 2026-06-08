import express from "express";
import {
  deleteBlog,
  getAllBlogs,
  getBlogDetail,
  patchBlog,
  postNewBlog,
} from "./blogs.controller.js";

import upload from "../../utils/uploadFiles.util.js";

import authenticate from "../auth/middleware/Authentication.middleware.js";
import { postBlogValidation } from "./blogs.validation.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/blog:
 *   get:
 *     summary: Get all active blogs
 *     description: Returns all active blogs. Can be filtered using the search query parameter.
 *     tags:
 *       - Blog
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in blog title
 *     responses:
 *       200:
 *         description: Blogs fetched successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/blog:
 *   post:
 *     summary: Create a new blog
 *     description: Create a new blog with image upload
 *     tags:
 *       - Blog
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: My First Blog
 *               content:
 *                 type: string
 *                 example: This is my first blog content.
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Validation error
 */
router
  .route("/")
  .get(getAllBlogs)
  .post(authenticate, postBlogValidation, upload.single("image"), postNewBlog);

/**
 * @swagger
 * /api/v1/blog/{id}:
 *   get:
 *     summary: Get blog details
 *     description: Get a single blog by id
 *     tags:
 *       - Blog
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog fetched successfully
 *       404:
 *         description: Blog not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/blog/{id}:
 *   patch:
 *     summary: Update blog
 *     description: Update an existing blog. Only owner or admin can update.
 *     tags:
 *       - Blog
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Blog not found
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /api/v1/blog/{id}:
 *   delete:
 *     summary: Delete blog
 *     description: Soft delete a blog by setting is_active to false
 *     tags:
 *       - Blog
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Blog deleted successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Blog not found
 *       401:
 *         description: Unauthorized
 */
router
  .route("/:id")
  .get(authenticate, getBlogDetail)
  .patch(authenticate, postBlogValidation, upload.single("image"), patchBlog)
  .delete(authenticate, deleteBlog);

export default router;
