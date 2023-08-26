"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./auth.route"));
const transfer_route_1 = __importDefault(require("./transfer.route"));
const response_handler_1 = require("../utils/response.handler");
const routes = express_1.default.Router();
/**
 * @swagger
 * /:
 *   get:
 *     summary: Get base endpoint info
 *     description: Get the status of the server.
 *     responses:
 *       200:
 *         description: Server status retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 */
routes.get('/', (req, res) => {
    try {
        (0, response_handler_1.sendResponse)(res, 200, { status: 'Success' });
    }
    catch (error) {
        (0, response_handler_1.sendResponse)(res, 500, { status: 'Failed' });
    }
});
routes.use('/auth', auth_route_1.default);
routes.use('/transfer', transfer_route_1.default);
exports.default = routes;
