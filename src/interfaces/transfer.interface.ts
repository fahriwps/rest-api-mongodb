import { Document } from "mongoose";

export interface ITransfer extends Document {
    amount: number;
    currency: string;
    sourceAccount: string;
    destinationAccount: string;
    statusTransfer: 'approved' | 'pending' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
}