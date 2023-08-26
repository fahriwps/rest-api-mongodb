import Transfer from '../models/transfer.model';
import { ITransferData } from '../interfaces/data.interface';

export const TransferService = {
    async createTransfer(transferData: ITransferData) {
        const newTransferRequest = await Transfer.create(transferData);
        return newTransferRequest._id;
    },

    async updateStatus(requestId: any, newStatus: string) {
        requestId.statusTransfer = newStatus;
        await requestId.save();
    },

    async getTransferList() {
        const findData = await Transfer.find();
        const transferList = findData.map((transfer) => {
            return {
                _id: transfer._id,
                amount: transfer.amount,
                currency: transfer.currency,
                sourceAccount: transfer.sourceAccount,
                destinationAccount: transfer.destinationAccount,
                status: transfer.statusTransfer,
                createdAt: transfer.createdAt,
                updatedAt: transfer.updatedAt,
            };
        });
        return transferList;
    }
};