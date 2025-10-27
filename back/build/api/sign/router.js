"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signRouter = void 0;
const express_1 = require("express");
const enums_1 = require("../../constants/enums");
const apiResponse_1 = __importDefault(require("../../utils/apiResponse"));
const controller_1 = require("./controller");
const validateSchema_1 = require("../../utils/validateSchema");
const SignSchema_1 = require("../../schemas/SignSchema");
const statusMiddleware_1 = require("../../middlewares/statusMiddleware");
exports.signRouter = (0, express_1.Router)();
exports.signRouter.post('/', (0, statusMiddleware_1.statusMiddleware)([enums_1.UserStatus.COMPLETED]), async (req, res) => {
    const body = (0, validateSchema_1.validateSchema)(req.body, SignSchema_1.signDocumentSchema);
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
    const userId = res.locals.user.id;
    const response = await controller_1.SignController.signDocument(userId, body.data?.signRequestId);
    if (response.error) {
        return res.status(enums_1.HttpStatus.BAD_REQUEST).json((0, apiResponse_1.default)(false, response));
    }
    return res.status(enums_1.HttpStatus.OK).json((0, apiResponse_1.default)(true, response));
    //   res.status(HttpStatus.OK).json(apiResponse(true, { message: 'sign router ok' }))
});
//# sourceMappingURL=router.js.map