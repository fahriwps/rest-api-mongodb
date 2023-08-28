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
const response_handler_1 = require("../utils/response.handler");
const transfer_service_1 = require("../services/transfer.service");
const transfer_model_1 = __importDefault(require("../models/transfer.model"));
const createTransfer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, currency, sourceAccount, destinationAccount } = req.body;
        // Only 'maker' role can create transfer in 'pending' status
        const role = req.user.role;
        const statusTransfer = role === 'maker' ? 'pending' : 'approved';
        const transferData = {
            amount,
            currency,
            sourceAccount,
            destinationAccount,
            statusTransfer,
        };
        // Create transfer request from body
        const newTransfer = yield transfer_service_1.TransferService.createTransfer(transferData);
        (0, response_handler_1.sendResponse)(res, 201, {
            message: 'Success created transfer request',
            data: {
                acknowledge: true,
                insertedId: newTransfer._id,
            },
        });
    }
    catch (error) {
        (0, response_handler_1.sendResponse)(res, 500, { error: 'Error creating transfer request' });
    }
});
const updateTransferStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        // Check if role is authorized (approver only)
        const userRole = req.user.role;
        if (userRole !== 'approver') {
            return (0, response_handler_1.sendResponse)(res, 403, { error: 'Access denied' });
        }
        // Find ID of the transfer request
        const requestId = req.params.id;
        const foundID = yield transfer_model_1.default.findOne({ _id: requestId });
        if (!foundID) {
            return (0, response_handler_1.sendResponse)(res, 404, { error: 'Transfer request ID not found' });
        }
        // Update transfer request old status to new status
        yield transfer_service_1.TransferService.updateStatus(foundID, status);
        (0, response_handler_1.sendResponse)(res, 200, { message: 'Transfer request updated' });
    }
    catch (error) {
        (0, response_handler_1.sendResponse)(res, 500, { error: 'Error updating transfer request' });
    }
});
const getTransferList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transferList = yield transfer_service_1.TransferService.getTransferList();
        (0, response_handler_1.sendResponse)(res, 200, { data: transferList });
    }
    catch (error) {
        (0, response_handler_1.sendResponse)(res, 500, { error: 'Error fetching transfer requests list' });
    }
});
const transferController = { createTransfer, updateTransferStatus, getTransferList };
exports.default = transferController;
