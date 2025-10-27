"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtMiddleware = void 0;
const enums_1 = require("../constants/enums");
const jwtUtils_1 = require("../utils/jwtUtils");
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const jwtMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(enums_1.HttpStatus.BAD_REQUEST).json((0, apiResponse_1.default)(false, { error: 'Token no proporcionado' }));
        }
        const token = authorizationHeader.split(' ')[1];
        if (!process.env.JWT_SECRET) {
            return res.status(500);
        }
        const payload = (0, jwtUtils_1.verifyToken)(token);
        if (!payload)
            throw Error;
        res.locals.user = payload;
        next();
    }
    catch {
        return res.status(enums_1.HttpStatus.UNAUTHORIZED).json((0, apiResponse_1.default)(false, { error: 'Token inválido o expirado' }));
    }
};
exports.jwtMiddleware = jwtMiddleware;
//# sourceMappingURL=authMiddleware.js.map