"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.externalAppRouter = void 0;
const express_1 = require("express");
const enums_1 = require("../../constants/enums");
const apiResponse_1 = __importDefault(require("../../utils/apiResponse"));
const validateSchema_1 = require("../../utils/validateSchema");
const ExternalAppSchema_1 = require("../../schemas/ExternalAppSchema");
const controller_1 = require("./controller");
const externalAppMiddleware_1 = require("../../middlewares/externalAppMiddleware");
const uuid_1 = require("uuid");
exports.externalAppRouter = (0, express_1.Router)();
exports.externalAppRouter.post('/sign-request', (0, externalAppMiddleware_1.externalAppMiddleware)(), async (req, res) => {
    const body = (0, validateSchema_1.validateSchema)(req.body, ExternalAppSchema_1.SignRequestSchema);
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
    const apiId = res.locals.app.id;
    const response = await controller_1.ExternalAppController.createSignRequest(apiId, body.data);
    if (response.error) {
        res.status(enums_1.HttpStatus.BAD_REQUEST).json((0, apiResponse_1.default)(false, response));
    }
    res.status(enums_1.HttpStatus.CREATED).json((0, apiResponse_1.default)(true, response));
});
exports.externalAppRouter.get('/sign-request', async (req, res) => {
    const signId = req.headers.signid;
    if (!(0, uuid_1.validate)(signId)) {
        return res
            .status(enums_1.HttpStatus.BAD_REQUEST)
            .json((0, apiResponse_1.default)(false, { error: 'No se ha proporcionado un uuid de firma válido.' }));
    }
    const response = await controller_1.SignRequestController.getSignRequestData(signId);
    if ('error' in response) {
        return res.status(enums_1.HttpStatus.NOT_FOUND).json((0, apiResponse_1.default)(false, response));
    }
    res.status(enums_1.HttpStatus.OK).json((0, apiResponse_1.default)(true, response));
});
//# sourceMappingURL=router.js.map