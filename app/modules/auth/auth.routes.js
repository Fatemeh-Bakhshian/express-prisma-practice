import express from "express";
import { signIn, logIn } from "./auth.controller.js";
import {
  signInValidation,
  loginValidation,
  checkValidation,
} from "./middleware/authValidation.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/signIn:
 *   post:
 *     summary: Sign in a new user
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: success
 */
router.post("/signIn", signInValidation, checkValidation, signIn);

/**
 * @swagger
 * /api/v1/auth/logIn:
 *   post:
 *     summary: Login user
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: success
 */
router.post("/logIn", loginValidation, checkValidation, logIn);

export default router;
