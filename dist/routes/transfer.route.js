"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transfer_controller_1 = __importDefault(require("../controllers/transfer.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const transferRoutes = express_1.default.Router();
/**
 * @swagger
 * /transfer:
 *   post:
 *     summary: Create a transfer request
 *     description: Create a transfer request with specified amount, currency, source account, and destination account.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *               sourceAccount:
 *                 type: string
 *               destinationAccount:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transfer request created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     acknowledge:
 *                       type: boolean
 *                     insertedId:
 *                       type: string
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
transferRoutes.post('/', auth_middleware_1.authenticateToken, transfer_controller_1.default.createTransfer);
/**
 * @swagger
 * /transfer/{id}:
 *   patch:
 *     summary: Update transfer request status
 *     description: Update the status of a transfer request with the specified ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the transfer request to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transfer request status updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       403:
 *         description: Access denied or unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: Transfer request ID not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
transferRoutes.patch('/:id', auth_middleware_1.authenticateToken, transfer_controller_1.default.updateTransferStatus);
/**
 * @swagger
 * /transfer:
 *   get:
 *     summary: Get list of transfer requests
 *     description: Retrieve a list of transfer requests.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transfer requests retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                      _id:
 *                          type: string
 *                      amount:
 *                          type: number
 *                      currency:
 *                          type: string
 *                      sourceAccount:
 *                          type: string
 *                      destinationAccount:
 *                          type: string
 *                      status:
 *                          type: string
 *                      createdAt:
 *                          type: string
 *                          format: date-time
 *                      updatedAt:
 *                          type: string
 *                          format: date-time
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *
 */
transferRoutes.get('/', auth_middleware_1.authenticateToken, transfer_controller_1.default.getTransferList);
exports.default = transferRoutes;
