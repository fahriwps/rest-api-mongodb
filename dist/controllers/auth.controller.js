"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("../services/auth.service");
const response_handler_1 = require("../utils/response.handler");
const user_validation_1 = require("../utils/user.validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, role } = req.body;
        // Validate username
        const usernameValidationResult = yield (0, user_validation_1.validateUsername)(username);
        const passwordValidationResult = (0, user_validation_1.validatePassword)(password);
        if (usernameValidationResult) {
            return (0, response_handler_1.sendResponse)(res, 400, { error: usernameValidationResult });
        }
        // Validate password
        if (passwordValidationResult) {
            return (0, response_handler_1.sendResponse)(res, 400, { error: passwordValidationResult });
        }
        // Validate role
        if (!(0, user_validation_1.validateRole)(role)) {
            return (0, response_handler_1.sendResponse)(res, 400, { error: 'Role should be either maker or approver' });
        }
        yield auth_service_1.AuthService.createUser(username, password, role);
        (0, response_handler_1.sendResponse)(res, 201, { message: 'User registered successfully' });
    }
    catch (error) {
        (0, response_handler_1.sendResponse)(res, 400, { error: 'Failed register user' });
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Find user by username
        const isUserValid = yield user_model_1.default.findOne({ username });
        if (!isUserValid) {
            return (0, response_handler_1.sendResponse)(res, 400, { error: 'Invalid user' });
        }
        // Compare password
        const isPasswordValid = yield bcrypt_1.default.compare(password, isUserValid.password);
        if (!isPasswordValid) {
            return (0, response_handler_1.sendResponse)(res, 400, { error: 'Invalid password' });
        }
        const token = yield auth_service_1.AuthService.checkUser(isUserValid._id, isUserValid.role);
        (0, response_handler_1.sendResponse)(res, 200, { message: 'Login successful', token });
    }
    catch (error) {
        (0, response_handler_1.sendResponse)(res, 401, { error: 'Login failed' });
    }
});
const authController = { registerUser, loginUser };
exports.default = authController;
