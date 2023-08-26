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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_config_1 = require("../config/db.config");
const user_model_1 = __importDefault(require("../models/user.model"));
exports.AuthService = {
    createUser(username, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            // Hash password
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // Create user in DB
            const newUser = yield user_model_1.default.create({ username, password: hashedPassword, role });
            return newUser;
        });
    },
    checkUser(validUserID, validUserRole) {
        return __awaiter(this, void 0, void 0, function* () {
            // Generate JWT token
            const token = jsonwebtoken_1.default.sign({ userId: validUserID._id, role: validUserRole }, db_config_1.DBConfig.secretKey);
            return token;
        });
    }
};
