"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const validateSchema_1 = require("../../utils/validateSchema");
const AuthSchemas_1 = require("../../schemas/AuthSchemas");
const apiResponse_1 = __importDefault(require("../../utils/apiResponse"));
const controller_1 = __importDefault(require("./controller"));
const enums_1 = require("../../constants/enums");
const mailService_1 = require("../../services/mailService");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.get('/register', (_, res) => {
    res.json({ email: 'ingrese email', pass: 'ingrese pass', confirmPass: 'ingrese confirmPass' });
});
exports.authRouter.post('/register', async (req, res) => {
    const body = (0, validateSchema_1.validateSchema)(req.body, AuthSchemas_1.RegisterSchema);
    if (!body.success) {
        return res
            .status(enums_1.HttpStatus.BAD_REQUEST)
            .json((0, apiResponse_1.default)(false, { message: JSON.parse(body.error?.message ?? '') }));
    }
    const { email, pass, confirmPass } = body.data;
    const response = await controller_1.default.register(email, pass, confirmPass);
    if (response.error) {
        return res.status(enums_1.HttpStatus.BAD_REQUEST).json((0, apiResponse_1.default)(false, { error: response.error }));
    }
    const verificationCode = response.code;
    if (verificationCode) {
        await (0, mailService_1.sendWelcomeEmail)(email, verificationCode);
    }
    return res.status(enums_1.HttpStatus.OK).json((0, apiResponse_1.default)(true, { token: response.token }));
});
exports.authRouter.post('/login', async (req, res) => {
    const body = (0, validateSchema_1.validateSchema)(req.body, AuthSchemas_1.LoginSchema);
    if (!body.success) {
        return res
            .status(enums_1.HttpStatus.BAD_REQUEST)
            .json((0, apiResponse_1.default)(false, { message: JSON.parse(body.error?.message ?? '') }));
    }
    const { email, pass } = body.data;
    const response = await controller_1.default.login(email, pass);
    if (response.error) {
        return res.status(enums_1.HttpStatus.BAD_REQUEST).json((0, apiResponse_1.default)(false, response));
    }
    return res.status(enums_1.HttpStatus.OK).json((0, apiResponse_1.default)(true, response));
});
//# sourceMappingURL=routes.js.map