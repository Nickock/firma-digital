"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusMiddleware = void 0;
const enums_1 = require("../constants/enums");
const controller_1 = __importDefault(require("../api/user/controller"));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const statusMiddleware = (status) => {
    return async (req, res, next) => {
        const userStatus = (await controller_1.default.getUserStatus(res.locals.user.id)).status;
        // console.log(userStatus)
        if (!status.find((s) => s == userStatus)) {
            return res
                .status(enums_1.HttpStatus.FORBIDDEN)
                .json((0, apiResponse_1.default)(false, { message: 'No tienes permisos de realizar esta accion' }));
        }
        next();
    };
};
exports.statusMiddleware = statusMiddleware;
//# sourceMappingURL=statusMiddleware.js.map