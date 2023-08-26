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
exports.validateRole = exports.validatePassword = exports.validateUsername = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const validateUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    // Username must not be blank
    if (!username.trim()) {
        return 'Username must not be blank';
    }
    // Username must be unique by checking existing username in DB
    const existingUser = yield user_model_1.default.findOne({ username });
    if (existingUser) {
        return 'Username must be unique';
    }
    return null; // No error found
});
exports.validateUsername = validateUsername;
const validatePassword = (password) => {
    // Password min length should be 8
    if (password.length < 8) {
        return 'Password must be at least 8 characters long';
    }
    // Password should contain alphanumeric characters
    const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
    if (!alphanumericRegex.test(password)) {
        return 'Password must contain both letters and numbers';
    }
    return null;
};
exports.validatePassword = validatePassword;
const validateRole = (role) => {
    // Role should be either 'maker' or 'approver'
    return role === 'maker' || role === 'approver';
};
exports.validateRole = validateRole;
