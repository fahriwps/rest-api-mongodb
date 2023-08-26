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
exports.TransferService = void 0;
const transfer_model_1 = __importDefault(require("../models/transfer.model"));
exports.TransferService = {
    createTransfer(transferData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTransferRequest = yield transfer_model_1.default.create(transferData);
            return newTransferRequest._id;
        });
    },
    updateStatus(requestId, newStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            requestId.statusTransfer = newStatus;
            yield requestId.save();
        });
    },
    getTransferList() {
        return __awaiter(this, void 0, void 0, function* () {
            const findData = yield transfer_model_1.default.find();
            const transferList = findData.map((transfer) => {
                return {
                    _id: transfer._id,
                    amount: transfer.amount,
                    currency: transfer.currency,
                    sourceAccount: transfer.sourceAccount,
                    destinationAccount: transfer.destinationAccount,
                    status: transfer.statusTransfer,
                    createdAt: transfer.createdAt,
                    updatedAt: transfer.updatedAt,
                };
            });
            return transferList;
        });
    }
};
