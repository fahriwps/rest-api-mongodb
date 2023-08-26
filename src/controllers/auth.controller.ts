import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { sendResponse } from "../utils/response.handler";
import { validateUsername, validatePassword, validateRole } from "../utils/user.validation";
import bcrypt from 'bcrypt';
import User from '../models/user.model';

const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, password, role } = req.body;
        // Validate username
        const usernameValidationResult = await validateUsername(username);
        const passwordValidationResult = validatePassword(password);

        if (usernameValidationResult) {
            return sendResponse(res, 400, { error: usernameValidationResult });
        }

        // Validate password
        if (passwordValidationResult) {
            return sendResponse(res, 400, { error: passwordValidationResult });
        }

        // Validate role
        if (!validateRole(role)) {
            return sendResponse(res, 400, { error: 'Role should be either maker or approver' });
        }

        await AuthService.createUser(username, password, role);
        sendResponse(res, 201, { message: 'User registered successfully' });
    } catch (error) {
        sendResponse(res, 400, { error: 'Failed register user' });
    }
};

const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const isUserValid = await User.findOne({ username });
        if (!isUserValid) {
            return sendResponse(res, 400, { error: 'Invalid user' });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, isUserValid.password);
        if (!isPasswordValid) {
            return sendResponse(res, 400, { error: 'Invalid password' });
        }

        const token = await AuthService.checkUser(isUserValid._id, isUserValid.role);
        sendResponse(res, 200, { message: 'Login successful', token });
    } catch (error) {
        sendResponse(res, 401, { error: 'Login failed' });
    }
};

const authController = { registerUser, loginUser };
export default authController;
