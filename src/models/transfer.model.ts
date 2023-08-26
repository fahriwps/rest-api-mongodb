import mongoose, { Schema } from 'mongoose';
import { ITransfer } from '../interfaces/transfer.interface'

const transferSchema = new Schema<ITransfer>({
        amount: { type: Number, required: true },
        currency: { type: String, required: true },
        sourceAccount: { type: String, required: true },
        destinationAccount: { type: String, required: true },
        statusTransfer: { type: String, enum: ['approved', 'pending', 'rejected'], default: 'pending'},
    },
    { timestamps: true });

export default mongoose.model<ITransfer>('Transfer', transferSchema);
