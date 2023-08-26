import { Response } from 'express';

export const sendResponse = (res: Response, statusCode: number, data: any): void => {
    res.status(statusCode).json(data);
};