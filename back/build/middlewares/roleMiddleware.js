"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const enums_1 = require("../constants/enums");
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const roleMiddleware = (roles) => {
    return (req, res, next) => {
        // console.log('el array roles es : ', roles)
        // console.log('El user : ', res.locals.user)
        if (!roles.find((role) => role == res.locals.user.role)) {
            return res
                .status(enums_1.HttpStatus.FORBIDDEN)
                .json((0, apiResponse_1.default)(false, { message: 'No tienes permisos de realizar esta accion' }));
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
//# sourceMappingURL=roleMiddleware.js.map