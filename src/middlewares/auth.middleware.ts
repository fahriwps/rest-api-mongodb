import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { DBConfig } from '../config/db.config';
import { sendResponse } from '../utils/response.handler';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // Extract token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return sendResponse(res, 401, { error: 'Unauthorized' });
    }
    try {
        // Verify token and extract payload
        const decoded = jwt.verify(token, DBConfig.secretKey) as { userId: string; role: string };
        (req as any).user = decoded;
        next();
    } catch (error) {
        sendResponse(res, 401, { error: 'Unauthorized' });
    }
};

