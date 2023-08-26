import express, { Request, Response } from 'express';
import authRoutes from './auth.route';
import transferRoutes from './transfer.route';
import { sendResponse } from '../utils/response.handler';

const routes = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get base endpoint info
 *     description: Get the status of the server.
 *     responses:
 *       200:
 *         description: Server status retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 */
routes.get('/', (req: Request, res: Response): void => {
    try {
        sendResponse(res, 200, { status: 'Success' });
    } catch (error) {
        sendResponse(res, 500, { status: 'Failed' });
    }
});

routes.use('/auth', authRoutes);
routes.use('/transfer', transferRoutes);

export default routes;