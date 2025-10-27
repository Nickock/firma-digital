"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authExternalAppRouter = void 0;
const express_1 = require("express");
const enums_1 = require("../../constants/enums");
const apiResponse_1 = __importDefault(require("../../utils/apiResponse"));
const validateSchema_1 = require("../../utils/validateSchema");
const ExternalAppSchema_1 = require("../../schemas/ExternalAppSchema");
const controller_1 = require("./controller");
exports.authExternalAppRouter = (0, express_1.Router)();
exports.authExternalAppRouter.post('/register', async (req, res) => {
    const body = (0, validateSchema_1.validateSchema)(req.body, ExternalAppSchema_1.ExternalAppRegisterSchema);
    if (!body.success) {
        let errorMessage;
        if (body.error) {
            if (typeof body.error === 'string') {
                errorMessage = body.error;
            }
            else if (body.error instanceof Error) {
                errorMessage = body.error.message;
            }
            else {
                errorMessage = JSON.stringify(body.error);
            }
        }
        else {
            errorMessage = 'Verifica tu información';
        }
        return res.status(enums_1.HttpStatus.BAD_REQUEST).json((0, apiResponse_1.default)(false, JSON.parse(errorMessage)));
    }
    const response = await controller_1.AuthExternalAppController.registerApp(body.data);
    if (response.error) {
        return res.status(enums_1.HttpStatus.BAD_REQUEST).json((0, apiResponse_1.default)(false, response));
    }
    return res.status(enums_1.HttpStatus.CREATED).json((0, apiResponse_1.default)(true, response));
});
//# sourceMappingURL=router.js.map