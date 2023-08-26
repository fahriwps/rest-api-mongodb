import mongoose, { Schema } from 'mongoose';
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['maker', 'approver'] },
});

export default mongoose.model<IUser>('User', userSchema);
