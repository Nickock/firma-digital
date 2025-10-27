"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const roleMiddleware_1 = require("../../middlewares/roleMiddleware");
const enums_1 = require("../../constants/enums");
const apiResponse_1 = __importDefault(require("../../utils/apiResponse"));
const validateSchema_1 = require("../../utils/validateSchema");
const AdminSchema_1 = require("../../schemas/AdminSchema");
const controller_1 = __importDefault(require("./controller"));
exports.adminRouter = (0, express_1.Router)();
exports.adminRouter.patch('/user', (0, roleMiddleware_1.roleMiddleware)([enums_1.UserRole.ADMIN]), async (req, res) => {
    const body = (0, validateSchema_1.validateSchema)(req.body, AdminSchema_1.autentifyUserSchema);
    if (!body.success) {
        return res.status(enums_1.HttpStatus.BAD_REQUEST).json((0, apiResponse_1.default)(false, { error: 'La id de usuario no es válida' }));
    }
    const userId = body.data?.userId;
    if (userId) {
        const response = await controller_1.default.autentifyUser(userId);
        if (!response.succes) {
            return res.status(enums_1.HttpStatus.BAD_REQUEST).json((0, apiResponse_1.default)(false, { error: response.error }));
        }
        return res.status(enums_1.HttpStatus.OK).json((0, apiResponse_1.default)(true, { message: 'Usuario actualizado' }));
    }
    res.status(200).json((0, apiResponse_1.default)(true, { message: 'role ok' }));
});
//# sourceMappingURL=routes.js.map