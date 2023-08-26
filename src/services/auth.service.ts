import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DBConfig } from '../config/db.config';
import User from '../models/user.model';


export const AuthService = {
    async createUser(username: string, password: string, role: string) {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in DB
        const newUser = await User.create({ username, password: hashedPassword, role });
        return newUser;
    },

    async checkUser(validUserID: any, validUserRole: any) {
        // Generate JWT token
        const token = jwt.sign({ userId: validUserID._id, role: validUserRole }, DBConfig.secretKey);
        return token;
    }
};
