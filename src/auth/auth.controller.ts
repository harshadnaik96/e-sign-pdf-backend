import express from 'express';
import { login } from './services/auth-login.service';
import { register } from './services/auth-register.service';

/**
 * @swagger
 * tags:
 *   name: Auth
 */

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description:
 *
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description:
 *
 */
router.post('/login', login);

export default router;
