import { Request, Response } from 'express';
import { sendResponse } from '../utils/response.handler';
import { TransferService } from "../services/transfer.service";
import Transfer from '../models/transfer.model';

const createTransfer = async (req: Request, res: Response) => {
    try {
        const { amount, currency, sourceAccount, destinationAccount } = req.body;

        // Only 'maker' role can create transfer in 'pending' status
        const role = (req as any).user.role;
        const statusTransfer = role === 'maker' ? 'pending' : 'approved';

        const transferData = {
            amount,
            currency,
            sourceAccount,
            destinationAccount,
            statusTransfer,
        };

        // Create transfer request from body
        const newTransfer = await TransferService.createTransfer(transferData);
        sendResponse(res, 201, {
            message: 'Success created transfer request',
            data: {
                acknowledge: true,
                insertedId: newTransfer._id,
            },
        });
    } catch (error) {
        sendResponse(res, 500, { error: 'Error creating transfer request' });
    }
};

const updateTransferStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;

        // Check if role is authorized (approver only)
        const userRole = (req as any).user.role;
        if (userRole !== 'approver') {
            return sendResponse(res, 403, { error: 'Access denied' });
        }

        // Find ID of the transfer request
        const requestId = req.params.id;
        const foundID = await Transfer.findOne({ requestId });

        if (!foundID) {
            return sendResponse(res, 404, { error: 'Transfer request ID not found' });
        }

        // Update transfer request old status to new status
        await TransferService.updateStatus(foundID, status);

        sendResponse(res, 200, { message: 'Transfer request updated'});
    } catch (error) {
        sendResponse(res, 500, { error: 'Error updating transfer request' });
    }
};

const getTransferList = async (req: Request, res: Response) => {
    try {
        const transferList = await TransferService.getTransferList();
        sendResponse(res, 200, { data: transferList });
    } catch (error) {
        sendResponse(res, 500, { error: 'Error fetching transfer requests list' });
    }
};

const transferController = { createTransfer, updateTransferStatus, getTransferList};
export default transferController;
