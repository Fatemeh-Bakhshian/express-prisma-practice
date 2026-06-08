import express from "express";
import { getAllUserByAdmin } from "./user.controller.js";

import authenticate from "../auth/middleware/Authentication.middleware.js";
import Authorization from "../auth/middleware/Authorization.middleware.js";

const Router = express.Router();

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Get all active users
 *     description: Admin can retrieve all active users with pagination, search and their active blogs.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Search users by name
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: Number of users per page
 *
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *
 *                 total:
 *                   type: integer
 *                   example: 2
 *
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: cec3d0b0-1234-5678-9999
 *
 *                       email:
 *                         type: string
 *                         example: admin@example.com
 *
 *                       name:
 *                         type: string
 *                         example: John Doe
 *
 *                       role:
 *                         type: string
 *                         example: Admin
 *
 *                       blogs:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *
 *                             title:
 *                               type: string
 *                               example: My first blog
 *
 *                             content:
 *                               type: string
 *                               example: Blog content...
 *
 *                             ImageUrl:
 *                               type: string
 *                               nullable: true
 *                               example: uploads/1749300000.jpg
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden - Admin access required
 *
 *       500:
 *         description: Internal server error
 */
Router.route("/").get(authenticate, Authorization("Admin"), getAllUserByAdmin);

export default Router;
