"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_config_1 = require("../config/db.config");
const response_handler_1 = require("../utils/response.handler");
const authenticateToken = (req, res, next) => {
    var _a;
    // Extract token from header
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return (0, response_handler_1.sendResponse)(res, 401, { error: 'Unauthorized' });
    }
    try {
        // Verify token and extract payload
        const decoded = jsonwebtoken_1.default.verify(token, db_config_1.DBConfig.secretKey);
        req.user = decoded;
        next();
    }
    catch (error) {
        (0, response_handler_1.sendResponse)(res, 401, { error: 'Unauthorized' });
    }
};
exports.authenticateToken = authenticateToken;
