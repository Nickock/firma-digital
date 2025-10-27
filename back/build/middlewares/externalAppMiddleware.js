"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.externalAppMiddleware = void 0;
const enums_1 = require("../constants/enums");
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const controller_1 = require("../api/externalApp/controller");
const externalAppMiddleware = () => {
    return async (req, res, next) => {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
                return res.status(enums_1.HttpStatus.BAD_REQUEST).json((0, apiResponse_1.default)(false, { error: 'Api Key no proporcionada' }));
            }
            const apiKey = authorizationHeader.split(' ')[1];
            const externalApp = await controller_1.ExternalAppController.existByKey(apiKey);
            if (!externalApp.success) {
                return res.status(enums_1.HttpStatus.UNAUTHORIZED).json((0, apiResponse_1.default)(false, { error: 'Api key inválida' }));
            }
            res.locals.app = { key: apiKey, id: externalApp.id };
            next();
        }
        catch (error) {
            console.error(error);
            return res.status(enums_1.HttpStatus.BAD_REQUEST).json((0, apiResponse_1.default)(false, { error: 'Api Key no proporcionada' }));
        }
    };
};
exports.externalAppMiddleware = externalAppMiddleware;
//# sourceMappingURL=externalAppMiddleware.js.map