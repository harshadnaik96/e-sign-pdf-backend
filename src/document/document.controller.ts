import express from 'express';
import { sign } from './services/document-sign.service';
import passport from 'passport';

/**
 * @swagger
 * tags:
 *   name: Document
 */

const router = express.Router();

/**
 * @swagger
 * /api/doc/sign:
 *   post:
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: email
 *                pdf:
 *                  type: string
 *                  format: binary
 *                signature:
 *                  type: string
 *     responses:
 *       200:
 *         description:
 *
 */
router.post('/sign', passport.authenticate('jwt', { session: false }), sign);

export default router;
